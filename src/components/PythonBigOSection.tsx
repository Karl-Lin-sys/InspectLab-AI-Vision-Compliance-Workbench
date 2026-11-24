import React, { useMemo, useState } from 'react';
import { Check, Copy, Download } from 'lucide-react';
import { CodeTabId, PYTHON_CODE_SAMPLES } from '../data/pythonCodeSamples';
import { computePipelineFootprint } from '../utils/complexityMath';

interface PythonBigOSectionProps {
  isToddlerMode: boolean;
}

export const PythonBigOSection: React.FC<PythonBigOSectionProps> = ({ isToddlerMode }) => {
  const [activeTab, setActiveTab] = useState<CodeTabId>('opencv');
  const [copiedId, setCopiedId] = useState<CodeTabId | null>(null);

  // Big-O & Memory Footprint interactive parameters
  const [imgDim, setImgDim] = useState<number>(640);
  const [batchSize, setBatchSize] = useState<number>(8);
  const [paramsMillions, setParamsMillions] = useState<number>(25);
  const [useAmpFp16, setUseAmpFp16] = useState<boolean>(true);
  const [simulateLeak, setSimulateLeak] = useState<boolean>(false);

  const sample = PYTHON_CODE_SAMPLES[activeTab];

  const footprint = useMemo(
    () =>
      computePipelineFootprint({
        width: imgDim,
        height: imgDim,
        channels: 3,
        batchSize,
        paramsMillions,
        epochsOrSteps: 50,
        useAmpFp16,
        hasGraphLeak: simulateLeak,
      }),
    [imgDim, batchSize, paramsMillions, useAmpFp16, simulateLeak]
  );

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(sample.code);
      setCopiedId(activeTab);
      setTimeout(() => setCopiedId(null), 1800);
    } catch {
      setCopiedId(activeTab);
      setTimeout(() => setCopiedId(null), 1800);
    }
  };

  const handleDownloadPy = () => {
    const blob = new Blob([sample.code], { type: 'text/x-python;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = sample.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="python-bigo" className="border-t border-slate-200 bg-white py-14">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-medium text-teal-700">
              02. Official Documentation Code &amp; Asymptotic Complexity
            </p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl text-balance">
              {isToddlerMode
                ? 'Clean Toy-Sorting Recipes with Zero Backpack Mess'
                : 'PyTorch, TensorFlow & OpenCV Reference Code with Big-O Analysis'}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
              {isToddlerMode
                ? 'Every recipe here comes straight from the official rulebooks so our computer never runs out of desk space or forgets to close the camera.'
                : 'Generated strictly from official PyTorch 2.x, TensorFlow 2.x, and OpenCV 4.x documentation—eliminating autograd graph leaks, DataLoader COW refcount leaks, and @tf.function retracing.'}
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Select Python reference module"
            className="inline-flex flex-wrap max-w-full items-center gap-1 rounded-lg border border-slate-200 bg-slate-100 p-1 self-start"
          >
            {(
              [
                ['opencv', 'OpenCV 4.x'],
                ['pytorch', 'PyTorch 2.x'],
                ['tensorflow', 'TensorFlow 2.x'],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={activeTab === key}
                onClick={() => setActiveTab(key)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  activeTab === key
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Code Viewer + Complexity Breakdown */}
        <div className="mt-8 grid gap-8 lg:grid-cols-12 items-start">
          <div className="min-w-0 lg:col-span-7 overflow-hidden rounded-xl border border-slate-200 bg-slate-900 text-slate-100">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 px-4 py-3">
              <div className="min-w-0">
                <div className="font-mono text-xs font-semibold text-white">
                  {sample.filename}
                </div>
                <div className="text-xs text-slate-400">
                  {sample.officialDocSource}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 rounded-md border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-100 hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  {copiedId === activeTab ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-teal-400" aria-hidden="true" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleDownloadPy}
                  className="inline-flex items-center gap-1.5 rounded-md border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-100 hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  <Download className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Download .py</span>
                </button>
              </div>
            </div>

            <pre className="max-h-[640px] overflow-auto p-4 text-xs leading-relaxed text-slate-200 font-mono">
              <code>{sample.code}</code>
            </pre>
          </div>

          <div className="min-w-0 lg:col-span-5 space-y-6">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <div className="text-xs font-semibold text-slate-900">
                {isToddlerMode ? 'Little Helper Explanation' : 'Per-Function Big-O & Leak Prevention'}
              </div>
              {isToddlerMode && (
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  {sample.toddlerExplanation}
                </p>
              )}

              <div className="mt-4 divide-y divide-slate-200">
                {sample.complexities.map((fn) => (
                  <div key={fn.fnName} className="py-3 first:pt-0 last:pb-0">
                    <div className="font-mono text-xs font-semibold text-teal-800">
                      {fn.fnName}
                    </div>
                    <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs tabular-nums text-slate-800">
                      <span>Time: {fn.timeComplexity}</span>
                      <span>Space: {fn.spaceComplexity}</span>
                    </div>
                    <p className="mt-1.5 text-xs text-slate-600">
                      <strong className="font-medium text-slate-800">Doc Basis:</strong> {fn.officialDocBasis}
                    </p>
                    <p className="mt-1 text-xs text-amber-800">
                      <strong className="font-medium">Bad Practice Eliminated:</strong> {fn.badPracticeEliminated}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-4 border-t border-slate-200 pt-3 text-xs text-slate-600">
                <span className="font-semibold text-slate-800">NIST CSF 2.0 Controls:</span>{' '}
                {sample.nistControls.join(' · ')}
              </div>
            </div>

            {/* Interactive Big-O & Memory Footprint Simulator */}
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="text-sm font-semibold text-slate-900">
                Interactive Batch Memory &amp; Leak Calculator
              </h3>
              <p className="mt-1 text-xs text-slate-600">
                Test how resolution, batch size, AMP FP16, and forgotten graph leaks affect VRAM over 50 steps.
              </p>

              <div className="mt-4 space-y-3">
                <div>
                  <div className="flex justify-between text-xs text-slate-700">
                    <label htmlFor="img-dim-slider">Input Image Size (H × W)</label>
                    <span className="font-mono tabular-nums font-medium">
                      {imgDim} × {imgDim}
                    </span>
                  </div>
                  <input
                    id="img-dim-slider"
                    type="range"
                    min={320}
                    max={1280}
                    step={160}
                    value={imgDim}
                    onChange={(e) => setImgDim(Number(e.target.value))}
                    className="mt-1 w-full accent-teal-700 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-700">
                    <label htmlFor="batch-size-slider">Batch Size (B)</label>
                    <span className="font-mono tabular-nums font-medium">{batchSize}</span>
                  </div>
                  <input
                    id="batch-size-slider"
                    type="range"
                    min={1}
                    max={32}
                    step={1}
                    value={batchSize}
                    onChange={(e) => setBatchSize(Number(e.target.value))}
                    className="mt-1 w-full accent-teal-700 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-700">
                    <label htmlFor="params-slider">Model Parameters (P)</label>
                    <span className="font-mono tabular-nums font-medium">{paramsMillions}M</span>
                  </div>
                  <input
                    id="params-slider"
                    type="range"
                    min={5}
                    max={80}
                    step={5}
                    value={paramsMillions}
                    onChange={(e) => setParamsMillions(Number(e.target.value))}
                    className="mt-1 w-full accent-teal-700 cursor-pointer"
                  />
                </div>

                <div className="flex flex-wrap gap-4 pt-1 text-xs text-slate-700">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={useAmpFp16}
                      onChange={(e) => setUseAmpFp16(e.target.checked)}
                      className="h-4 w-4 rounded border-slate-300 accent-teal-700"
                    />
                    <span>AMP FP16 Precision</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={simulateLeak}
                      onChange={(e) => setSimulateLeak(e.target.checked)}
                      className="h-4 w-4 rounded border-slate-300 accent-amber-700"
                    />
                    <span className="text-amber-800 font-medium">Simulate Autograd Leak (No .item())</span>
                  </label>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-200 pt-4 text-xs">
                <div>
                  <div className="text-slate-500">Tensor Ops / Batch</div>
                  <div className="mt-0.5 font-mono font-medium tabular-nums text-slate-900">
                    {footprint.opsNotation}
                  </div>
                </div>
                <div>
                  <div className="text-slate-500">Peak Estimated Memory</div>
                  <div
                    data-testid="total-memory-mb"
                    className={`mt-0.5 font-mono text-base font-bold tabular-nums ${
                      simulateLeak ? 'text-amber-700' : 'text-teal-700'
                    }`}
                  >
                    {footprint.totalMemoryMb.toLocaleString()} MB
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
