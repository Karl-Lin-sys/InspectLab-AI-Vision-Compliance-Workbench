import React, { useMemo, useState } from 'react';
import { ROOT_CAUSE_DIAGNOSTICS, THREE_SOLUTIONS } from '../data/researchData';
import { computeSolutionImpact } from '../utils/complexityMath';

interface BiasSolutionsSectionProps {
  isToddlerMode: boolean;
}

export const BiasSolutionsSection: React.FC<BiasSolutionsSectionProps> = ({ isToddlerMode }) => {
  const [enableLogit, setEnableLogit] = useState<boolean>(true);
  const [enableGroupDro, setEnableGroupDro] = useState<boolean>(true);
  const [enableMemoryBank, setEnableMemoryBank] = useState<boolean>(false);

  const impact = useMemo(
    () =>
      computeSolutionImpact({
        enableLogitAdjustment: enableLogit,
        enableGroupDroSplit: enableGroupDro,
        enableMemoryBankAnomaly: enableMemoryBank,
      }),
    [enableLogit, enableGroupDro, enableMemoryBank]
  );

  return (
    <section id="bias-fixes" className="border-t border-slate-200 py-14">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-xs font-medium text-teal-700">
          03. Root-Cause Diagnosis &amp; Theoretical Solutions
        </p>
        <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl text-balance">
          {isToddlerMode
            ? 'Why Helpers Get Tricked—and Three Smart Ways to Fix It'
            : 'Structural Defects, Selection Bias & 3 Peer-Reviewed Solutions'}
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
          {isToddlerMode
            ? 'Sometimes a helper looks at the wrong clue, like the colour of the plate instead of the cookie. Here is why that happens and how three kind rules keep things fair.'
            : 'Root causes verified against peer-reviewed ML literature (last 5 years) and resolved official PyTorch/TensorFlow issue trackers—excluding speculation or informal blog advice.'}
        </p>

        {/* Root Causes Grid */}
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {ROOT_CAUSE_DIAGNOSTICS.map((rc) => (
            <article key={rc.id} className="rounded-xl border border-slate-200 bg-white p-6">
              <div className="text-xs font-medium text-amber-800">{rc.category}</div>
              <h3 className="mt-1.5 text-base font-semibold text-slate-900">{rc.title}</h3>
              <p className="mt-2 text-xs text-slate-500">{rc.primarySource}</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                {isToddlerMode ? rc.toddlerCanadianSummary : rc.mechanism}
              </p>
              {!isToddlerMode && (
                <p className="mt-3 border-t border-slate-100 pt-3 text-xs text-slate-600">
                  <strong className="font-semibold text-slate-900">Production Impact:</strong>{' '}
                  {rc.impactOnVisualInspection}
                </p>
              )}
            </article>
          ))}
        </div>

        {/* 3 Concrete Solutions + Interactive Impact Calculator */}
        <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between border-b border-slate-200 pb-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                {isToddlerMode
                  ? 'Turn On the Three Helper Rules'
                  : 'Theoretical Solutions Simulator (Worst-Lot OOD Impact)'}
              </h3>
              <p className="mt-1 text-xs text-slate-600">
                Toggle each theoretically grounded fix below to inspect cumulative gains on unseen factory lots and rare defects.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6 shrink-0">
              <div>
                <div className="text-xs text-slate-500">Worst-Lot Recall</div>
                <div
                  data-testid="worst-lot-recall"
                  className="mt-0.5 font-mono text-xl font-bold tabular-nums text-teal-700"
                >
                  {impact.worstLotRecallPct}%
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-500">False Alarm Rate</div>
                <div className="mt-0.5 font-mono text-xl font-bold tabular-nums text-slate-900">
                  {impact.falseAlarmRatePct}%
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-500">Unseen Defect F1</div>
                <div className="mt-0.5 font-mono text-xl font-bold tabular-nums text-slate-900">
                  {impact.zeroShotNewDefectF1Pct}%
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            {THREE_SOLUTIONS.map((sol) => {
              const isChecked =
                sol.id === 'logit_pgi'
                  ? enableLogit
                  : sol.id === 'group_dro'
                  ? enableGroupDro
                  : enableMemoryBank;
              const onToggle = () => {
                if (sol.id === 'logit_pgi') setEnableLogit((v) => !v);
                else if (sol.id === 'group_dro') setEnableGroupDro((v) => !v);
                else setEnableMemoryBank((v) => !v);
              };

              return (
                <div
                  key={sol.id}
                  className={`flex flex-col justify-between rounded-lg border p-5 transition-colors ${
                    isChecked
                      ? 'border-teal-700 bg-teal-50/40'
                      : 'border-slate-200 bg-slate-50/60'
                  }`}
                >
                  <div>
                    <label className="flex items-start justify-between gap-3 cursor-pointer">
                      <span className="text-sm font-semibold text-slate-900">
                        {isToddlerMode ? sol.toddlerCanadianTitle : sol.title}
                      </span>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={onToggle}
                        aria-label={`Enable ${sol.title}`}
                        className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 accent-teal-700 cursor-pointer"
                      />
                    </label>
                    <div className="mt-1.5 text-xs font-medium text-teal-800">{sol.citation}</div>
                    <p className="mt-3 text-xs leading-relaxed text-slate-700">
                      {isToddlerMode ? sol.toddlerCanadianAnalogy : sol.mathematicalBasis}
                    </p>
                  </div>

                  {!isToddlerMode && (
                    <ul className="mt-4 space-y-1.5 border-t border-slate-200/80 pt-3 text-xs text-slate-600">
                      {sol.implementationSteps.map((step) => (
                        <li key={step} className="leading-relaxed">
                          · {step}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
