import React, { useMemo, useState } from 'react';
import {
  JURISDICTIONS,
  JurisdictionId,
  NIST_CSF_CONTROLS,
  NistFunctionCode,
} from '../data/complianceData';
import { computeComplianceReadiness } from '../utils/complexityMath';

interface NistLegalSectionProps {
  isToddlerMode: boolean;
  checkedControls: string[];
  onToggleControl: (id: string) => void;
  onOpenExportModal: () => void;
}

export const NistLegalSection: React.FC<NistLegalSectionProps> = ({
  isToddlerMode,
  checkedControls,
  onToggleControl,
  onOpenExportModal,
}) => {
  const [nistFilter, setNistFilter] = useState<'ALL' | NistFunctionCode>('ALL');
  const [activeCountry, setActiveCountry] = useState<JurisdictionId>('tw');

  const readiness = useMemo(
    () => computeComplianceReadiness(checkedControls, NIST_CSF_CONTROLS.length),
    [checkedControls]
  );

  const visibleControls = useMemo(
    () =>
      nistFilter === 'ALL'
        ? NIST_CSF_CONTROLS
        : NIST_CSF_CONTROLS.filter((c) => c.fnCode === nistFilter),
    [nistFilter]
  );

  const jurisdiction = JURISDICTIONS[activeCountry];

  return (
    <section id="nist-legal" className="border-t border-slate-200 bg-white py-14">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-8 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7">
            <p className="text-xs font-medium text-teal-700">
              04. NIST Cybersecurity Framework 2.0 &amp; 4-Country Legal Gate
            </p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl text-balance">
              {isToddlerMode
                ? 'Six Safety Locks & Sharing Rules for Four Friendly Neighbours'
                : 'NIST CSF 2.0 Architecture & TW / CA / DE / JP GitHub Compliance'}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {isToddlerMode
                ? 'Before we share our toy-sorting book with friends in Taiwan, Canada, Germany, and Japan, we check all six safety locks so nobody’s secrets or photos slip out.'
                : 'Every Python pipeline and repository template enforces NIST CSF 2.0 controls (Govern through Recover) and statutory privacy, copyright, AI governance, and trade-secret boundaries across Taiwan, Canada, Germany, and Japan.'}
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-100 aspect-4/3">
              <img
                src="/src/assets/images/compliance_shield_diagram_1795530033391.jpg"
                alt="Four interlocking brushed aluminum and frosted glass plates representing international security and legal compliance"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* NIST CSF 2.0 Interactive Controls */}
        <div className="mt-10 rounded-xl border border-slate-200 bg-slate-50 p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-base font-semibold text-slate-900">
                NIST CSF 2.0 Implementation Checklist
              </h3>
              <p className="mt-0.5 text-xs text-slate-600">
                Verified controls implemented in code:{' '}
                <span data-testid="nist-progress" className="font-mono font-semibold tabular-nums text-teal-700">
                  {readiness.completed}/{readiness.total} ({readiness.percentage}%)
                </span>
              </p>
            </div>

            <div className="flex flex-wrap gap-1 rounded-lg border border-slate-200 bg-white p-1">
              {(['ALL', 'GV', 'ID', 'PR', 'DE', 'RS', 'RC'] as const).map((fn) => (
                <button
                  key={fn}
                  type="button"
                  onClick={() => setNistFilter(fn)}
                  className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    nistFilter === fn
                      ? 'bg-teal-700 text-white'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {fn}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5 divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white">
            {visibleControls.map((ctrl) => {
              const checked = checkedControls.includes(ctrl.id);
              return (
                <label
                  key={ctrl.id}
                  className="flex items-start gap-3.5 p-4 hover:bg-slate-50/70 transition-colors cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => onToggleControl(ctrl.id)}
                    className="mt-1 h-4 w-4 shrink-0 rounded border-slate-300 accent-teal-700 cursor-pointer"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                      <span className="font-mono font-semibold text-teal-800">{ctrl.controlId}</span>
                      <span aria-hidden="true">·</span>
                      <span>{ctrl.fnName}</span>
                    </div>
                    <div className="mt-0.5 text-sm font-semibold text-slate-900">{ctrl.title}</div>
                    <p className="mt-1 text-xs leading-relaxed text-slate-600">
                      {isToddlerMode ? ctrl.toddlerCanadianSummary : ctrl.implementationInCode}
                    </p>
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        {/* 4-Jurisdiction Legal Matrix */}
        <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-slate-200 pb-5">
            <div>
              <h3 className="text-base font-semibold text-slate-900">
                4-Jurisdiction Legal Pre-Upload Gate (GitHub Publication)
              </h3>
              <p className="mt-1 text-xs text-slate-600">
                Engineering compliance review—verify with qualified legal counsel and employer before pushing corporate work.
              </p>
            </div>

            <div
              role="tablist"
              aria-label="Select legal jurisdiction"
              className="inline-flex flex-wrap items-center gap-1 rounded-lg border border-slate-200 bg-slate-100 p-1 self-start"
            >
              {(
                [
                  ['tw', 'Taiwan (台灣)'],
                  ['ca', 'Canada'],
                  ['de', 'Germany (EU)'],
                  ['jp', 'Japan (日本)'],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={activeCountry === id}
                  onClick={() => setActiveCountry(id)}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    activeCountry === id
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-7 space-y-4">
              <div>
                <div className="text-xs font-semibold text-teal-800">
                  Applicable Statutes — {jurisdiction.country}
                </div>
                <ul className="mt-1.5 space-y-1 text-xs text-slate-700">
                  {jurisdiction.primaryStatutes.map((s) => (
                    <li key={s}>· {s}</li>
                  ))}
                </ul>
              </div>

              {isToddlerMode ? (
                <p className="rounded-lg bg-slate-50 p-4 text-sm leading-relaxed text-slate-800 border border-slate-200">
                  {jurisdiction.toddlerCanadianSummary}
                </p>
              ) : (
                <div className="space-y-3 text-xs leading-relaxed text-slate-700">
                  <div>
                    <strong className="font-semibold text-slate-900">Privacy &amp; Cross-Border Data: </strong>
                    {jurisdiction.dataAndPrivacyRule}
                  </div>
                  <div>
                    <strong className="font-semibold text-slate-900">Copyright &amp; Employment IP: </strong>
                    {jurisdiction.ipAndCopyrightRule}
                  </div>
                  <div>
                    <strong className="font-semibold text-slate-900">AI Governance &amp; Trade Secrets: </strong>
                    {jurisdiction.aiAndSecurityRule}
                  </div>
                </div>
              )}
            </div>

            <div className="lg:col-span-5 rounded-lg border border-slate-200 bg-slate-50 p-5 flex flex-col justify-between">
              <div>
                <div className="text-xs font-semibold text-slate-900">
                  Mandatory Pre-Push Checklist ({jurisdiction.country})
                </div>
                <ul className="mt-3 space-y-2 text-xs text-slate-700">
                  {jurisdiction.mandatoryGithubChecklist.map((item) => (
                    <li key={item} className="leading-relaxed">
                      ✓ {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 border-t border-slate-200 pt-4">
                <button
                  type="button"
                  onClick={onOpenExportModal}
                  className="w-full rounded-lg bg-teal-700 px-4 py-2 text-xs font-semibold text-white hover:bg-teal-800 transition-colors cursor-pointer"
                >
                  Open Legal GitHub Export Kit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
