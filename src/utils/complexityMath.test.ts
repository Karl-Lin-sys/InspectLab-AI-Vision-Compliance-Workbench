import test from 'node:test';
import assert from 'node:assert/strict';
import {
  computeEvaluationBias,
  computePipelineFootprint,
  computeSolutionImpact,
  computeComplianceReadiness,
} from './complexityMath';

test('computeEvaluationBias exposes majority-class accuracy illusion and leakage inflation', () => {
  const biased = computeEvaluationBias({
    defectPrevalencePct: 1.0,
    hasFrameLeakage: true,
    usesAccuracyOnly: true,
  });
  const honest = computeEvaluationBias({
    defectPrevalencePct: 1.0,
    hasFrameLeakage: false,
    usesAccuracyOnly: false,
  });

  assert.ok(biased.reportedAccuracy > 98, 'Accuracy remains artificially >98% on 1% defect prevalence');
  assert.ok(biased.inflationGapPct > honest.inflationGapPct, 'Biased mode has higher inflation gap');
  assert.equal(biased.verdictLabel, 'Severe Leakage + Imbalance Illusion');
  assert.equal(honest.verdictLabel, 'Unbiased Lot-Level Evaluation');
  assert.ok(honest.prAuc < biased.prAuc, 'Removing leakage reveals lower realistic PR-AUC');
});

test('computePipelineFootprint shows AMP memory reduction and autograd leak penalty', () => {
  const safeFp32 = computePipelineFootprint({
    width: 640,
    height: 640,
    channels: 3,
    batchSize: 8,
    paramsMillions: 25,
    epochsOrSteps: 50,
    useAmpFp16: false,
    hasGraphLeak: false,
  });

  const safeAmp = computePipelineFootprint({
    width: 640,
    height: 640,
    channels: 3,
    batchSize: 8,
    paramsMillions: 25,
    epochsOrSteps: 50,
    useAmpFp16: true,
    hasGraphLeak: false,
  });

  const leaked = computePipelineFootprint({
    width: 640,
    height: 640,
    channels: 3,
    batchSize: 8,
    paramsMillions: 25,
    epochsOrSteps: 50,
    useAmpFp16: false,
    hasGraphLeak: true,
  });

  assert.ok(safeAmp.totalMemoryMb < safeFp32.totalMemoryMb, 'AMP FP16 uses less memory than FP32');
  assert.equal(safeFp32.leakedGraphMb, 0);
  assert.ok(leaked.leakedGraphMb > 1000, 'Graph leak across 50 steps accumulates massive memory');
  assert.ok(leaked.totalMemoryMb > safeFp32.totalMemoryMb * 5);
});

test('computeSolutionImpact improves worst-lot recall and reduces false alarms monotonically', () => {
  const baseline = computeSolutionImpact({
    enableLogitAdjustment: false,
    enableGroupDroSplit: false,
    enableMemoryBankAnomaly: false,
  });
  const allFixes = computeSolutionImpact({
    enableLogitAdjustment: true,
    enableGroupDroSplit: true,
    enableMemoryBankAnomaly: true,
  });

  assert.equal(baseline.activeCount, 0);
  assert.equal(allFixes.activeCount, 3);
  assert.ok(allFixes.worstLotRecallPct > baseline.worstLotRecallPct + 30);
  assert.ok(allFixes.falseAlarmRatePct < baseline.falseAlarmRatePct);
  assert.ok(allFixes.zeroShotNewDefectF1Pct > baseline.zeroShotNewDefectF1Pct + 40);
});

test('computeComplianceReadiness requires all controls checked for public repo readiness', () => {
  const partial = computeComplianceReadiness(['a', 'b'], 4);
  assert.equal(partial.percentage, 50);
  assert.equal(partial.isReadyForPublicRepo, false);

  const complete = computeComplianceReadiness(['a', 'b', 'c', 'd'], 4);
  assert.equal(complete.percentage, 100);
  assert.equal(complete.isReadyForPublicRepo, true);
});
