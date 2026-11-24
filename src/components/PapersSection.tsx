import React, { useMemo, useState } from 'react';
import {
  PEER_REVIEWED_MODELS,
  TaskCategory,
  JdFocusArea,
} from '../data/researchData';
import { computeEvaluationBias } from '../utils/complexityMath';

interface PapersSectionProps {
  isToddlerMode: boolean;
  jdFocus: JdFocusArea;
}

export const PapersSection: React.FC<PapersSectionProps> = ({ isToddlerMode, jdFocus }) => {
  const [category, setCategory] = useState<TaskCategory>('all');
  const [defectPrevalence, setDefectPrevalence] = useState<number>(1.5);
  const [hasFrameLeakage, setHasFrameLeakage] = useState<boolean>(true);
  const [usesAccuracyOnly, setUsesAccuracyOnly] = useState<boolean>(true);

  const filteredModels = useMemo(() => {
    return PEER_REVIEWED_MODELS.filter((m) => {
      const catMatch = category === 'all' || m.category === category;
      const jdMatch = jdFocus === 'all' || m.jdAreas.includes(jdFocus);
      return catMatch && jdMatch;
    });
  }, [category, jdFocus]);

  const evalResult = useMemo(
    () =>
      computeEvaluationBias({
        defectPrevalencePct: defectPrevalence,
        hasFrameLeakage,
        usesAccuracyOnly,
      }),
    [defectPrevalence, hasFrameLeakage, usesAccuracyOnly]
  );

  return (
    <section id="papers" className="border-t border-slate-200 py-14">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-medium text-teal-700">
              01. Peer-Reviewed Selection (2023–2025)
            </p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl text-balance">
              {isToddlerMode
                ? 'Picking the Kindest, Smartest Helpers from Top School Papers'
                : 'CVPR / ECCV / NeurIPS / ICLR Technology Benchmark'}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
              {isToddlerMode
                ? 'Instead of guessing from random internet stories, we only pick helpers tested carefully by university teachers—and we double-check that they did not peek at the answers first!'
                : 'Grounded strictly in peer-reviewed top-conference publications and official reproducible GitHub implementations, evaluated without frame leakage or majority-class accuracy distortion.'}
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Filter architectures by task"
            className="inline-flex flex-wrap max-w-full items-center gap-1 rounded-lg border border-slate-200 bg-slate-100 p-1 self-start"
          >
            {(
              [
                ['all', 'All Systems'],
                ['detection', 'Defect Detection'],
                ['anomaly', 'Anomaly Inspection'],
                ['runtime', 'Runtime Stack'],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={category === key}
                onClick={() => setCategory(key)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  category === key
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Evaluation Bias & Leakage Simulator */}
        <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="min-w-0 lg:col-span-5">
              <h3 className="text-base font-semibold text-slate-900">
                {isToddlerMode
                  ? 'Fairness Test: Did Our Helper Peek at the Answers?'
                  : 'Evaluation Bias & Data-Leakage Simulator'}
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                {isToddlerMode
                  ? 'Move the slider to see how rare broken blocks are. Try turning off the sneaky peeking trick to see the honest score!'
                  : 'Toggle frame-level split leakage and majority-class accuracy to observe how industrial benchmarks overstate real production performance.'}
              </p>

              <div className="mt-5 space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs font-medium text-slate-700">
                    <label htmlFor="defect-prevalence-slider">
                      Defect Prevalence in Factory Line
                    </label>
                    <span className="font-mono tabular-nums text-slate-900">
                      {defectPrevalence.toFixed(1)}%
                    </span>
                  </div>
                  <input
                    id="defect-prevalence-slider"
                    type="range"
                    min={0.5}
                    max={20}
                    step={0.5}
                    value={defectPrevalence}
                    onChange={(e) => setDefectPrevalence(Number(e.target.value))}
                    className="mt-2 w-full accent-teal-700 cursor-pointer"
                  />
                </div>

                <div className="flex flex-col gap-2.5 pt-1">
                  <label className="flex items-start gap-2.5 text-xs text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasFrameLeakage}
                      onChange={(e) => setHasFrameLeakage(e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-slate-300 accent-teal-700"
                    />
                    <span>
                      <strong className="font-semibold text-slate-900">
                        Frame-level random split (Data Leakage)
                      </strong>
                      <span className="block text-slate-500">
                        Adjacent conveyor frames appear in both train and test sets.
                      </span>
                    </span>
                  </label>

                  <label className="flex items-start gap-2.5 text-xs text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={usesAccuracyOnly}
                      onChange={(e) => setUsesAccuracyOnly(e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-slate-300 accent-teal-700"
                    />
                    <span>
                      <strong className="font-semibold text-slate-900">
                        Report Raw Accuracy Only (Imbalance Bias)
                      </strong>
                      <span className="block text-slate-500">
                        Hides missed rare defects behind 99% normal-board predictions.
                      </span>
                    </span>
                  </label>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col justify-between border-t border-slate-200 pt-6 lg:border-t-0 lg:border-l lg:pl-8 lg:pt-0">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="text-xs font-medium text-slate-500">
                  Diagnostic Verdict
                </span>
                <span
                  data-testid="bias-verdict"
                  className={`text-sm font-semibold ${
                    evalResult.inflationGapPct > 10 ? 'text-amber-700' : 'text-teal-700'
                  }`}
                >
                  {evalResult.verdictLabel}
                </span>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="border-t border-slate-200 pt-3">
                  <div className="text-xs text-slate-500">Raw Accuracy</div>
                  <div className="mt-1 font-mono text-xl font-bold tabular-nums text-slate-900">
                    {evalResult.reportedAccuracy}%
                  </div>
                </div>
                <div className="border-t border-slate-200 pt-3">
                  <div className="text-xs text-slate-500">Macro-F1</div>
                  <div className="mt-1 font-mono text-xl font-bold tabular-nums text-slate-900">
                    {evalResult.macroF1}%
                  </div>
                </div>
                <div className="border-t border-slate-200 pt-3">
                  <div className="text-xs text-slate-500">PR-AUC</div>
                  <div className="mt-1 font-mono text-xl font-bold tabular-nums text-teal-700">
                    {evalResult.prAuc}%
                  </div>
                </div>
                <div className="border-t border-slate-200 pt-3">
                  <div className="text-xs text-slate-500">Inflation Gap</div>
                  <div
                    className={`mt-1 font-mono text-xl font-bold tabular-nums ${
                      evalResult.inflationGapPct > 10 ? 'text-amber-700' : 'text-slate-900'
                    }`}
                  >
                    +{evalResult.inflationGapPct}%
                  </div>
                </div>
              </div>

              {/* Clean horizontal metric bars */}
              <div className="mt-6 space-y-3" aria-label="Metric comparison bars">
                <div>
                  <div className="flex justify-between text-xs text-slate-600">
                    <span>Reported Raw Accuracy</span>
                    <span className="font-mono tabular-nums">{evalResult.reportedAccuracy}%</span>
                  </div>
                  <div className="mt-1 h-2 w-full overflow-hidden rounded-sm bg-slate-100">
                    <div
                      className="h-full bg-slate-400 transition-all duration-200"
                      style={{ width: `${evalResult.reportedAccuracy}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-600">
                    <span>Unbiased Lot-Level PR-AUC</span>
                    <span className="font-mono tabular-nums">{evalResult.prAuc}%</span>
                  </div>
                  <div className="mt-1 h-2 w-full overflow-hidden rounded-sm bg-slate-100">
                    <div
                      className="h-full bg-teal-700 transition-all duration-200"
                      style={{ width: `${evalResult.prAuc}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-600">
                    <span>Worst-Production-Lot Recall</span>
                    <span className="font-mono tabular-nums">{evalResult.worstLotRecall}%</span>
                  </div>
                  <div className="mt-1 h-2 w-full overflow-hidden rounded-sm bg-slate-100">
                    <div
                      className={`h-full transition-all duration-200 ${
                        evalResult.worstLotRecall < 65 ? 'bg-amber-600' : 'bg-teal-600'
                      }`}
                      style={{ width: `${evalResult.worstLotRecall}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Peer-Reviewed Model Cards (clean 1-elevation grid, zero pills) */}
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {filteredModels.length === 0 ? (
            <div className="col-span-full rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-600">
              No models match the active job requirement and task filter. Reset the filter to view all 6 peer-reviewed benchmarks.
            </div>
          ) : (
            filteredModels.map((model) => (
              <article
                key={model.id}
                className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span className="font-semibold text-teal-700">{model.venue} {model.year}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono">{model.githubRepo}</span>
                  </div>
                  <h3 className="mt-2 text-lg font-semibold text-slate-900">
                    {model.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">
                    {isToddlerMode ? model.toddlerCanadianExplanation : model.benchmarkSummary}
                  </p>
                </div>

                <dl className="mt-5 space-y-2.5 border-t border-slate-100 pt-4 text-xs">
                  <div>
                    <dt className="font-semibold text-slate-900">Inductive Bias &amp; Mechanism</dt>
                    <dd className="mt-0.5 text-slate-600">{model.inductiveBias}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-slate-900">Leakage &amp; Imbalance Guard</dt>
                    <dd className="mt-0.5 text-slate-600">{model.leakageAndImbalanceGuard}</dd>
                  </div>
                  <div className="flex items-center justify-between pt-1 text-slate-500">
                    <span>Target Runtime</span>
                    <span className="font-medium text-slate-800">{model.deploymentTarget}</span>
                  </div>
                </dl>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
};
