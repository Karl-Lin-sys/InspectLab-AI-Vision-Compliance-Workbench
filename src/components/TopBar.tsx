import React from 'react';

interface TopBarProps {
  onOpenExportModal: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onOpenExportModal }) => {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-6 py-3.5">
        <a
          href="#top"
          className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
        >
          InspectLab
        </a>

        <nav aria-label="Primary sections" className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
          <a
            href="#papers"
            className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Papers &amp; Models
          </a>
          <a
            href="#python-bigo"
            className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Python &amp; Big-O
          </a>
          <a
            href="#bias-fixes"
            className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Bias &amp; Fixes
          </a>
          <a
            href="#nist-legal"
            className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            NIST &amp; Legal
          </a>
          <a
            href="#little-helper"
            className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Little Helper
          </a>
        </nav>

        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onOpenExportModal}
            className="rounded-lg bg-teal-700 px-4 py-2 text-xs font-semibold text-white hover:bg-teal-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
          >
            Export GitHub Kit
          </button>
        </div>
      </div>
    </header>
  );
};
