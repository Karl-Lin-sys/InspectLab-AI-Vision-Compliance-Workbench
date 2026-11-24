import React, { useMemo, useState } from 'react';
import { Check, Copy, Download, X } from 'lucide-react';
import {
  generateGitHubBundleFiles,
  generateRepoSetupScript,
} from '../data/complianceData';

interface ExportKitModalProps {
  isOpen: boolean;
  onClose: () => void;
  nistCompleted: number;
  nistTotal: number;
}

const PRE_UPLOAD_GATES = [
  { id: 'gate-no-pii', label: 'Zero worker faces, EXIF/GPS tags, or personal data (TW PDPA / CA PIPEDA / DE GDPR / JP APPI)' },
  { id: 'gate-no-trade-secrets', label: 'Zero Ezekiel Automation proprietary datasets, PCB photos, or CAD specs (TW Trade Secrets Act / JP UCPA)' },
  { id: 'gate-oss-license', label: 'Apache-2.0 LICENSE & third-party OSS attributions verified (DE UrhG / JP Copyright Act)' },
  { id: 'gate-no-secrets', label: 'No API keys, credentials, or internal server URLs in git history (NIST CSF 2.0 PR.DS)' },
];

export const ExportKitModal: React.FC<ExportKitModalProps> = ({
  isOpen,
  onClose,
  nistCompleted,
  nistTotal,
}) => {
  const [gatesChecked, setGatesChecked] = useState<string[]>([
    'gate-no-pii',
    'gate-no-trade-secrets',
    'gate-oss-license',
    'gate-no-secrets',
  ]);
  const [selectedFileIdx, setSelectedFileIdx] = useState<number>(0);
  const [copiedScript, setCopiedScript] = useState<boolean>(false);

  const files = useMemo(() => generateGitHubBundleFiles(), []);
  const setupScript = useMemo(() => generateRepoSetupScript(files), [files]);

  if (!isOpen) return null;

  const allGatesPassed = gatesChecked.length === PRE_UPLOAD_GATES.length;
  const activeFile = files[selectedFileIdx] ?? files[0];

  const toggleGate = (id: string) => {
    setGatesChecked((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const downloadTextFile = (filename: string, content: string) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopyCommands = async () => {
    try {
      await navigator.clipboard.writeText(setupScript);
      setCopiedScript(true);
      setTimeout(() => setCopiedScript(false), 1800);
    } catch {
      setCopiedScript(true);
      setTimeout(() => setCopiedScript(false), 1800);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="export-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs"
    >
      <div className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <h2 id="export-modal-title" className="text-lg font-bold text-slate-900">
              4-Jurisdiction Legal GitHub Export Kit
            </h2>
            <p className="text-xs text-slate-600">
              NIST CSF 2.0 Verified: <span className="font-mono tabular-nums">{nistCompleted}/{nistTotal}</span> · Direct GitHub push requires your local git authentication &amp; employer/legal sign-off.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close export modal"
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="min-w-0 overflow-y-auto p-6 space-y-6">
          {/* Pre-Upload Legal Safety Gates */}
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <div className="text-xs font-semibold text-slate-900">
              Mandatory Pre-Upload Legal Clearance (Taiwan · Canada · Germany · Japan)
            </div>
            <div className="mt-3 space-y-2">
              {PRE_UPLOAD_GATES.map((gate) => (
                <label key={gate.id} className="flex items-start gap-2.5 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={gatesChecked.includes(gate.id)}
                    onChange={() => toggleGate(gate.id)}
                    className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 accent-teal-700"
                  />
                  <span>{gate.label}</span>
                </label>
              ))}
            </div>
            {!allGatesPassed && (
              <p className="mt-3 text-xs font-medium text-amber-700">
                Complete all 4 legal safety gates before downloading the GitHub setup bundle.
              </p>
            )}
          </div>

          {/* Generated File Previewer */}
          <div>
            <div className="flex flex-wrap gap-1.5 border-b border-slate-200 pb-3">
              {files.map((f, idx) => (
                <button
                  key={f.filename}
                  type="button"
                  onClick={() => setSelectedFileIdx(idx)}
                  className={`rounded-md px-3 py-1.5 font-mono text-xs font-medium transition-colors cursor-pointer ${
                    selectedFileIdx === idx
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {f.filename}
                </button>
              ))}
            </div>

            <div className="mt-3 flex items-center justify-between gap-4">
              <p className="text-xs text-slate-600">{activeFile.description}</p>
              <button
                type="button"
                disabled={!allGatesPassed}
                onClick={() => downloadTextFile(activeFile.filename, activeFile.content)}
                className="inline-flex items-center gap-1.5 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-800 hover:bg-slate-50 disabled:opacity-40 cursor-pointer shrink-0"
              >
                <Download className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Download {activeFile.filename}</span>
              </button>
            </div>

            <pre className="mt-3 max-h-56 overflow-auto rounded-lg bg-slate-900 p-4 font-mono text-xs leading-relaxed text-slate-100">
              <code>{activeFile.content}</code>
            </pre>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4">
          <button
            type="button"
            disabled={!allGatesPassed}
            onClick={handleCopyCommands}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-100 disabled:opacity-40 transition-colors cursor-pointer"
          >
            {copiedScript ? (
              <>
                <Check className="h-4 w-4 text-teal-700" aria-hidden="true" />
                <span>Copied Repo Script</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" aria-hidden="true" />
                <span>Copy Bash Setup Script</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              disabled={!allGatesPassed}
              onClick={() => downloadTextFile('setup_legal_repo.sh', setupScript)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-teal-700 px-4 py-2 text-xs font-semibold text-white hover:bg-teal-800 disabled:opacity-40 transition-colors cursor-pointer"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              <span>Download setup_legal_repo.sh</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
