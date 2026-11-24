import React, { useState } from 'react';
import { TopBar } from './components/TopBar';
import { PapersSection } from './components/PapersSection';
import { PythonBigOSection } from './components/PythonBigOSection';
import { BiasSolutionsSection } from './components/BiasSolutionsSection';
import { NistLegalSection } from './components/NistLegalSection';
import { StorybookSection } from './components/StorybookSection';
import { ExportKitModal } from './components/ExportKitModal';
import { NIST_CSF_CONTROLS } from './data/complianceData';
import { JdFocusArea } from './data/researchData';

export default function App() {
  const [isToddlerMode, setIsToddlerMode] = useState<boolean>(false);
  const [jdFocus, setJdFocus] = useState<JdFocusArea>('all');
  const [checkedNistIds, setCheckedNistIds] = useState<string[]>(
    NIST_CSF_CONTROLS.map((c) => c.id)
  );
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);

  const handleToggleNistControl = (id: string) => {
    setCheckedNistIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div id="top" className="min-h-screen bg-slate-50 text-slate-900">
      <TopBar onOpenExportModal={() => setIsExportOpen(true)} />

      <main>
        {/* Hero Split Section */}
        <section className="mx-auto max-w-6xl px-6 py-12 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-12 items-stretch">
            <div className="lg:col-span-7 flex flex-col justify-center">
              <p className="text-xs font-medium text-teal-700">
                Ezekiel Automation Co., Ltd. · AI Software Engineer Architecture Brief
              </p>
              <h1 className="mt-2.5 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl text-balance">
                {isToddlerMode
                  ? 'Helping Factory Cameras Spot Tiny Scratches Fairly and Safely'
                  : 'Bias-Free Industrial Vision Systems & Compliant AI Deployment'}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
                {isToddlerMode
                  ? 'A gentle Canadian English guide to picking smart helpers from school papers, keeping our computer backpack neat, and sharing code safely across Taiwan, Canada, Germany, and Japan.'
                  : 'An objective engineering workbench built from peer-reviewed CVPR, ECCV, NeurIPS, and ICLR research, official PyTorch, TensorFlow, and OpenCV documentation, NIST CSF 2.0 controls, and 4-country GitHub publication law.'}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  href="#papers"
                  className="rounded-lg bg-slate-900 px-5 py-2.5 text-xs font-semibold text-white hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0"
                >
                  Inspect Benchmarks
                </a>
                <button
                  type="button"
                  onClick={() => setIsToddlerMode((v) => !v)}
                  aria-pressed={isToddlerMode}
                  className={`rounded-lg border px-5 py-2.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isToddlerMode
                      ? 'border-teal-700 bg-teal-50 text-teal-900 hover:bg-teal-100'
                      : 'border-slate-300 bg-white text-slate-800 hover:bg-slate-100'
                  }`}
                >
                  {isToddlerMode
                    ? 'Switch to Engineering Mode'
                    : 'Explain Like I’m 4 (Canadian English)'}
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="h-full min-h-64 overflow-hidden rounded-xl border border-slate-200 bg-slate-200">
                <img
                  src="/src/assets/images/hero_vision_inspection_1795530034692.jpg"
                  alt="Precision industrial machine vision camera lens positioned above a circuit board inspection stage"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Full-width 4-column summary strip below Hero split */}
          <div className="mt-10 grid grid-cols-2 gap-4 border-t border-slate-200 pt-6 lg:grid-cols-4">
            <div>
              <div className="text-xs text-slate-500">Conference Horizon</div>
              <div className="mt-1 font-mono text-lg font-bold tabular-nums text-slate-900">
                2023–2025
              </div>
              <div className="text-xs text-slate-600">CVPR · ECCV · NeurIPS · ICLR</div>
            </div>
            <div>
              <div className="text-xs text-slate-500">Target Stack</div>
              <div className="mt-1 font-mono text-lg font-bold tabular-nums text-slate-900">
                PyTorch · TF · CV2
              </div>
              <div className="text-xs text-slate-600">Official docs &amp; Big-O verified</div>
            </div>
            <div>
              <div className="text-xs text-slate-500">Security Baseline</div>
              <div className="mt-1 font-mono text-lg font-bold tabular-nums text-slate-900">
                NIST CSF 2.0
              </div>
              <div className="text-xs text-slate-600">
                {checkedNistIds.length}/{NIST_CSF_CONTROLS.length} controls active
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-500">Legal Jurisdictions</div>
              <div className="mt-1 font-mono text-lg font-bold tabular-nums text-slate-900">
                TW · CA · DE · JP
              </div>
              <div className="text-xs text-slate-600">Pre-upload privacy &amp; IP gates</div>
            </div>
          </div>

          {/* Workspace Toolbar: Reading Mode & 104 JD Scope Filter */}
          <div className="mt-8 flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-slate-700 mr-1">
                104 JD Duty Filter:
              </span>
              {(
                [
                  ['all', 'All Duties'],
                  ['vision', 'Visual Inspection'],
                  ['training', 'Model Training'],
                  ['data', 'Data Pipeline'],
                  ['deploy', 'API & Deployment'],
                ] as const
              ).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setJdFocus(key)}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    jdFocus === key
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">Language Lens:</span>
              <div className="inline-flex rounded-lg border border-slate-200 bg-slate-100 p-0.5">
                <button
                  type="button"
                  onClick={() => setIsToddlerMode(false)}
                  className={`rounded-md px-3 py-1 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    !isToddlerMode ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                  }`}
                >
                  Technical
                </button>
                <button
                  type="button"
                  onClick={() => setIsToddlerMode(true)}
                  className={`rounded-md px-3 py-1 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isToddlerMode ? 'bg-white text-teal-800 shadow-xs' : 'text-slate-600'
                  }`}
                >
                  Little Helper (CA)
                </button>
              </div>
            </div>
          </div>
        </section>

        <PapersSection isToddlerMode={isToddlerMode} jdFocus={jdFocus} />
        <PythonBigOSection isToddlerMode={isToddlerMode} />
        <BiasSolutionsSection isToddlerMode={isToddlerMode} />
        <NistLegalSection
          isToddlerMode={isToddlerMode}
          checkedControls={checkedNistIds}
          onToggleControl={handleToggleNistControl}
          onOpenExportModal={() => setIsExportOpen(true)}
        />
        <StorybookSection />
      </main>

      <footer className="border-t border-slate-200 bg-white py-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            InspectLab Architecture Reference · Technical compliance guidance only; consult qualified counsel in Taiwan, Canada, Germany, and Japan before public repository publication.
          </p>
          <div className="flex items-center gap-5 shrink-0">
            <a href="#papers" className="hover:text-slate-900">
              Benchmarks
            </a>
            <a href="#python-bigo" className="hover:text-slate-900">
              Python &amp; Big-O
            </a>
            <a href="#nist-legal" className="hover:text-slate-900">
              NIST &amp; Legal
            </a>
          </div>
        </div>
      </footer>

      <ExportKitModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        nistCompleted={checkedNistIds.length}
        nistTotal={NIST_CSF_CONTROLS.length}
      />
    </div>
  );
}
