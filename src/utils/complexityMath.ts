/**
 * Pure deterministic calculations for:
 * 1. Evaluation bias under class imbalance & frame-level data leakage
 * 2. Big-O pixel operations & GPU/RAM memory footprints (FP32 vs AMP FP16 + leak simulation)
 * 3. Worst-group recall improvement under GroupDRO / Logit Adjustment
 * 4. NIST CSF 2.0 & 4-jurisdiction GitHub pre-upload readiness
 */

export interface EvaluationScenario {
  defectPrevalencePct: number; // e.g. 1.5% defects, 98.5% normal
  hasFrameLeakage: boolean;    // frame-level random split vs lot-level split
  usesAccuracyOnly: boolean;   // majority-class accuracy vs balanced PR-AUC / Macro-F1
}

export interface EvaluationMetricsResult {
  reportedAccuracy: number;
  macroF1: number;
  prAuc: number;
  worstLotRecall: number;
  inflationGapPct: number;
  verdictLabel: string;
}

export function computeEvaluationBias(scenario: EvaluationScenario): EvaluationMetricsResult {
  const prevalence = Math.max(0.2, Math.min(50, scenario.defectPrevalencePct)) / 100;
  // Base true defect detector performance on unseen production lot (realistic industrial inspection)
  const baseDefectPrecision = 0.84 - (0.5 - prevalence) * 0.18;
  const baseDefectRecall = 0.78 - (0.5 - prevalence) * 0.22;

  // Majority class (normal) accuracy is trivially high when prevalence is tiny
  const normalRecall = 0.994;
  const trueAccuracy = (1 - prevalence) * normalRecall + prevalence * baseDefectRecall;

  // Frame-level leakage falsely inflates test scores by memorizing conveyor/background frames
  const leakageBoost = scenario.hasFrameLeakage ? 0.145 : 0;

  const reportedAccuracy = Math.min(0.999, trueAccuracy + (scenario.hasFrameLeakage ? 0.008 : 0)) * 100;

  // Macro-F1 weights minority defect class equally with majority normal class
  const defectF1 = (2 * baseDefectPrecision * baseDefectRecall) / Math.max(1e-6, baseDefectPrecision + baseDefectRecall);
  const normalF1 = 0.992;
  const rawMacroF1 = ((defectF1 + normalF1) / 2 + leakageBoost * 0.85) * 100;
  const macroF1 = Math.min(99.2, rawMacroF1);

  // PR-AUC is highly sensitive to false positives under low prevalence
  const rawPrAuc = (defectF1 * 0.94 + leakageBoost) * 100;
  const prAuc = Math.min(98.8, Math.max(25, rawPrAuc));

  // Worst production lot recall drops sharply when leakage hides domain shift
  const worstLotRecall = scenario.hasFrameLeakage ? 91.4 : Math.max(42, (baseDefectRecall - 0.14) * 100);

  const primaryReported = scenario.usesAccuracyOnly ? reportedAccuracy : prAuc;
  const trueUnleakedPrAuc = Math.min(98.8, Math.max(25, defectF1 * 0.94 * 100));
  const inflationGapPct = Math.max(0, Number((primaryReported - trueUnleakedPrAuc).toFixed(1)));

  let verdictLabel = 'Unbiased Lot-Level Evaluation';
  if (scenario.hasFrameLeakage && scenario.usesAccuracyOnly) {
    verdictLabel = 'Severe Leakage + Imbalance Illusion';
  } else if (scenario.hasFrameLeakage) {
    verdictLabel = 'Frame-Level Data Leakage Detected';
  } else if (scenario.usesAccuracyOnly) {
    verdictLabel = 'Majority-Class Accuracy Bias';
  }

  return {
    reportedAccuracy: Number(reportedAccuracy.toFixed(1)),
    macroF1: Number(macroF1.toFixed(1)),
    prAuc: Number(prAuc.toFixed(1)),
    worstLotRecall: Number(worstLotRecall.toFixed(1)),
    inflationGapPct,
    verdictLabel,
  };
}

export interface MemoryCalcInput {
  width: number;
  height: number;
  channels: number;
  batchSize: number;
  paramsMillions: number;
  epochsOrSteps: number;
  useAmpFp16: boolean;
  hasGraphLeak: boolean;
}

export interface MemoryCalcOutput {
  pixelsPerBatch: number;
  inputTensorMb: number;
  weightsMb: number;
  activationEstimateMb: number;
  leakedGraphMb: number;
  totalMemoryMb: number;
  opsNotation: string;
}

export function computePipelineFootprint(input: MemoryCalcInput): MemoryCalcOutput {
  const w = Math.max(64, Math.round(input.width));
  const h = Math.max(64, Math.round(input.height));
  const c = Math.max(1, Math.round(input.channels));
  const b = Math.max(1, Math.round(input.batchSize));
  const pM = Math.max(0.5, input.paramsMillions);
  const steps = Math.max(1, Math.round(input.epochsOrSteps));

  const bytesPerElem = input.useAmpFp16 ? 2 : 4;
  const pixelsPerBatch = b * h * w * c;
  const inputTensorMb = (pixelsPerBatch * bytesPerElem) / (1024 * 1024);

  // Model parameters in memory (FP32 master weights + gradients during training or weights in inference)
  const weightsMb = (pM * 1_000_000 * bytesPerElem) / (1024 * 1024);

  // Typical CNN/Transformer feature pyramid activation multiplier (~18x input spatial tensor)
  const activationEstimateMb = inputTensorMb * 18;

  // If developer forgot torch.inference_mode() or appended raw loss tensor across N steps,
  // computation graph retains activations per step
  const leakedGraphMb = input.hasGraphLeak ? activationEstimateMb * Math.min(steps, 120) * 0.45 : 0;

  const totalMemoryMb = inputTensorMb + weightsMb + activationEstimateMb + leakedGraphMb;

  return {
    pixelsPerBatch,
    inputTensorMb: Number(inputTensorMb.toFixed(2)),
    weightsMb: Number(weightsMb.toFixed(2)),
    activationEstimateMb: Number(activationEstimateMb.toFixed(2)),
    leakedGraphMb: Number(leakedGraphMb.toFixed(2)),
    totalMemoryMb: Number(totalMemoryMb.toFixed(2)),
    opsNotation: `O(${b} · ${h} · ${w} · ${c}) = ${(pixelsPerBatch / 1e6).toFixed(2)}M elems/batch`,
  };
}

export interface SolutionImpactInput {
  enableLogitAdjustment: boolean;
  enableGroupDroSplit: boolean;
  enableMemoryBankAnomaly: boolean;
}

export interface SolutionImpactOutput {
  worstLotRecallPct: number;
  falseAlarmRatePct: number;
  zeroShotNewDefectF1Pct: number;
  activeCount: number;
}

export function computeSolutionImpact(input: SolutionImpactInput): SolutionImpactOutput {
  let worstLotRecall = 56.0;
  let falseAlarmRate = 9.4;
  let zeroShotF1 = 41.0;
  let activeCount = 0;

  if (input.enableLogitAdjustment) {
    worstLotRecall += 14.5;
    falseAlarmRate -= 2.1;
    activeCount += 1;
  }
  if (input.enableGroupDroSplit) {
    worstLotRecall += 15.2;
    falseAlarmRate -= 3.2;
    zeroShotF1 += 11.5;
    activeCount += 1;
  }
  if (input.enableMemoryBankAnomaly) {
    worstLotRecall += 6.8;
    falseAlarmRate -= 2.4;
    zeroShotF1 += 34.0;
    activeCount += 1;
  }

  return {
    worstLotRecallPct: Number(Math.min(96.5, worstLotRecall).toFixed(1)),
    falseAlarmRatePct: Number(Math.max(1.2, falseAlarmRate).toFixed(1)),
    zeroShotNewDefectF1Pct: Number(Math.min(93.0, zeroShotF1).toFixed(1)),
    activeCount,
  };
}

export function computeComplianceReadiness(checkedIds: string[], totalCount: number): {
  completed: number;
  total: number;
  percentage: number;
  isReadyForPublicRepo: boolean;
} {
  const safeTotal = Math.max(1, totalCount);
  const completed = Math.min(safeTotal, Math.max(0, checkedIds.length));
  const percentage = Math.round((completed / safeTotal) * 100);
  return {
    completed,
    total: safeTotal,
    percentage,
    isReadyForPublicRepo: completed === safeTotal,
  };
}
