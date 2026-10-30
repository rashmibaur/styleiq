'use client';

import React from 'react';
import { TrendingUp, Sparkles, Rocket, User } from 'lucide-react';

interface ShellProps {
  activeTab: 'trend' | 'new-product' | 'launch';
  setActiveTab: (tab: 'trend' | 'new-product' | 'launch') => void;
  children: React.ReactNode;
}

export default function Shell({ activeTab, setActiveTab, children }: ShellProps) {
  return (
    <div className="min-h-screen bg-brand-gray-bg flex flex-col text-slate-800">
      {/* ── Top Global Navigation Bar ── */}
      <header className="bg-white border-b border-brand-border px-6 py-0 flex items-center justify-between sticky top-0 z-50 shadow-xs h-14">
        {/* Brand Logotype */}
        <div className="flex items-center gap-3 min-w-[130px]">
          <div className="h-6 w-10 bg-gradient-to-br from-heading-red to-accent-red rounded-sm flex items-center justify-center">
            <span className="text-white text-[9px] font-black tracking-widest">IQ</span>
          </div>
          <span className="font-sans font-black text-lg tracking-tight text-slate-900">
            Style<span className="text-heading-red">IQ</span>
          </span>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1" aria-label="Main navigation">
          <button
            id="nav-tab-trend"
            onClick={() => setActiveTab('trend')}
            aria-current={activeTab === 'trend' ? 'page' : undefined}
            className={`flex items-center gap-1.5 px-4 py-2 text-[11px] font-bold uppercase tracking-wider rounded-md transition-all duration-200 cursor-pointer ${
              activeTab === 'trend'
                ? 'bg-brand-crimson text-white shadow-sm'
                : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
            }`}
          >
            <TrendingUp size={13} />
            <span>Trend Intelligence</span>
          </button>

          <button
            id="nav-tab-new-product"
            onClick={() => setActiveTab('new-product')}
            aria-current={activeTab === 'new-product' ? 'page' : undefined}
            className={`flex items-center gap-1.5 px-4 py-2 text-[11px] font-bold uppercase tracking-wider rounded-md transition-all duration-200 cursor-pointer ${
              activeTab === 'new-product'
                ? 'bg-brand-crimson text-white shadow-sm'
                : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
            }`}
          >
            <Sparkles size={13} />
            <span>New Product Intelligence</span>
          </button>

          <button
            id="nav-tab-launch"
            onClick={() => setActiveTab('launch')}
            aria-current={activeTab === 'launch' ? 'page' : undefined}
            className={`flex items-center gap-1.5 px-4 py-2 text-[11px] font-bold uppercase tracking-wider rounded-md transition-all duration-200 cursor-pointer ${
              activeTab === 'launch'
                ? 'bg-brand-crimson text-white shadow-sm'
                : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
            }`}
          >
            <Rocket size={13} />
            <span>Launch Intelligence</span>
          </button>
        </nav>

        {/* Right: Sync + User */}
        <div className="flex items-center gap-5 min-w-[130px] justify-end">
          <div className="text-right border-r border-slate-200 pr-5 hidden sm:block">
            <span className="block text-[9px] text-slate-400 font-semibold uppercase tracking-wider">Last Data Sync</span>
            <span className="block text-[11px] text-slate-700 font-bold">OCT 24, 2023 | 09:42 AM</span>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="text-right hidden md:block">
              <span className="block text-xs font-bold text-slate-700">Arjun Mehta</span>
              <span className="block text-[10px] text-slate-400 font-medium">Category Lead</span>
            </div>
            <div className="h-8 w-8 rounded-full border border-slate-200 bg-slate-100 flex items-center justify-center text-slate-500 shadow-xs shrink-0">
              <User size={15} />
            </div>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main className="flex-1 px-6 py-5 max-w-[1400px] mx-auto w-full">
        {children}
      </main>
    </div>
  );
}
