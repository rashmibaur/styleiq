'use client';

import React, { useState } from 'react';
import { brandTrendData, socialTrendData, TrendPill } from '../../data/mockData';
import BrandInsightsView from './BrandInsightsView';
import SocialMediaInsightsView from './SocialMediaInsightsView';
import Chip from '../ui/Chip';
import Dropdown from '../ui/Dropdown';

const CATEGORY_OPTIONS = [
  { value: 'women', label: 'Women' },
  { value: 'men',   label: 'Men'   },
  { value: 'kids',  label: 'Kids'  },
];

// ── Attribute group grid ──────────────────────────────────────

function AttributeGroup({ title, pills }: { title: string; pills: TrendPill[] }) {
  return (
    <div className="space-y-2">
      <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">
        {title}
      </span>
      <div className="grid grid-cols-2 gap-1.5">
        {pills.map((pill, idx) => (
          <Chip
            key={idx}
            label={pill.name}
            change={pill.change}
            isPositive={pill.isPositive}
            isNeutral={pill.isNeutral}
          />
        ))}
      </div>
    </div>
  );
}

// ── Assortment pill row ───────────────────────────────────────

function AssortmentRow({ pills }: { pills: TrendPill[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {pills.map((pill, idx) => {
        // The highlighted "active-negative" pill stands out from the row
        const variant = pill.isNeutral
          ? 'neutral'
          : !pill.isPositive
          ? 'active-negative'
          : idx === 0
          ? 'default'
          : 'active-positive';

        return (
          <Chip
            key={idx}
            label={pill.name}
            change={pill.change}
            isPositive={pill.isPositive}
            isNeutral={pill.isNeutral}
            variant={variant}
          />
        );
      })}
    </div>
  );
}

// ── Trend matrix column ───────────────────────────────────────

function TrendColumn({
  title,
  subtitle,
  assortmentLabel,
  assortmentSub,
  attributeLabel,
  attributeSub,
  data,
}: {
  title: string;
  subtitle: string;
  assortmentLabel: string;
  assortmentSub: string;
  attributeLabel: string;
  attributeSub: string;
  data: typeof brandTrendData;
}) {
  return (
    <div className="space-y-5">
      {/* Assortment row */}
      <div className="space-y-2">
        <div>
          <h4 className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
            {assortmentLabel}
          </h4>
          <p className="text-[10px] text-slate-400 mt-0.5">{assortmentSub}</p>
        </div>
        <AssortmentRow pills={data.assortment} />
      </div>

      {/* Attribute insights */}
      <div className="border-t border-slate-100 pt-4 space-y-1.5">
        <div className="mb-3">
          <h4 className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
            {attributeLabel}
          </h4>
          <p className="text-[10px] text-slate-400 mt-0.5">{attributeSub}</p>
        </div>
        <div className="space-y-4">
          <AttributeGroup title="Color"         pills={data.attributes.color}         />
          <AttributeGroup title="Ornamentation" pills={data.attributes.ornamentation} />
          <AttributeGroup title="Occasion"      pills={data.attributes.occasion}      />
          <AttributeGroup title="Heel Type"     pills={data.attributes.heelType}      />
          <AttributeGroup title="Toe Type"      pills={data.attributes.toeType}       />
        </div>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────

export default function TrendIntelligence() {
  const [activeSubTab, setActiveSubTab] = useState<'brand' | 'social'>('brand');
  const [category, setCategory] = useState('women');

  return (
    <div className="space-y-5">

      {/* ── Global Page Filter Bar ── */}
      <div className="flex items-center gap-2" aria-label="Page filters">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mr-1">
          Filters:
        </span>
        <Dropdown
          id="filter-category"
          mode="single"
          label="Category"
          options={CATEGORY_OPTIONS}
          value={category}
          onChange={setCategory}
        />
      </div>

      {/* ── Executive Summary Card ── */}
      <section
        aria-label="Executive Summary"
        className="bg-white border border-brand-border rounded-xl p-5 shadow-xs relative overflow-hidden"
      >
        {/* Left accent bar */}
        <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl bg-heading-red" />

        <h2 className="text-sm font-bold text-slate-800 mb-4 pl-3">Executive Summary</h2>

        <div className="space-y-4 text-[11px] leading-relaxed text-slate-600 pl-3">
          {/* Brand Intelligence */}
          <div>
            <span className="block font-bold text-slate-800 mb-1 text-xs">
              Brand Intelligence Analysis:
            </span>
            <p>
              Our comprehensive evaluation of premium and fast-fashion brands reveals significant growth momentum in{' '}
              <strong className="text-slate-800">Flats (+3%)</strong>,{' '}
              <strong className="text-slate-800">Boots (+1%)</strong>, and{' '}
              <strong className="text-slate-800">Loafers (+5%)</strong>. The attribute landscape shows strong consumer
              preference for <strong className="text-slate-800">Block heels</strong>,{' '}
              <strong className="text-slate-800">Metallic Finishes</strong>, and{' '}
              <strong className="text-slate-800">Evening occasion wear</strong>.
            </p>
          </div>

          {/* Social Intelligence */}
          <div className="border-t border-slate-100 pt-4">
            <span className="block font-bold text-slate-800 mb-1 text-xs">
              Social Intelligence Analysis:
            </span>
            <p>
              Social media analysis indicates rising consumer momentum across key categories, with{' '}
              <strong className="text-slate-800">Flats (+2%)</strong>,{' '}
              <strong className="text-slate-800">Boots (+1%)</strong>, and{' '}
              <strong className="text-slate-800">Loafers (+5%)</strong> showing strong growth in engagement. Conversations
              highlight a clear preference for{' '}
              <strong className="text-slate-800">Block heels</strong>,{' '}
              <strong className="text-slate-800">Metallic finishes</strong>, and{' '}
              <strong className="text-slate-800">Evening occasion wear</strong>.
            </p>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 pl-3 flex items-center gap-1.5 text-[10px] text-slate-400 font-medium">
          <span className="h-1.5 w-1.5 rounded-full bg-slate-300 shrink-0" />
          Updated monthly based on total brand portfolio &amp; social media data
        </div>
      </section>

      {/* ── Changes in Trends (Brand vs Social) ── */}
      <section
        aria-label="Changes in trends from brands and social media"
        className="bg-white border border-brand-border rounded-xl p-5 shadow-xs space-y-5"
      >
        {/* Section header */}
        <div>
          <h2 className="text-sm font-bold text-slate-800">
            Changes in Trends From Brands &amp; Social Media
          </h2>
          <p className="text-[10px] text-slate-400 mt-0.5">
            Changes in all brand catalogues &amp; social media chatter compared to previous month
          </p>
        </div>

        {/* 2-column matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">

          {/* BRAND column */}
          <div className="pb-6 lg:pb-0 lg:pr-6">
            <TrendColumn
              title="Brands"
              subtitle=""
              assortmentLabel="Assortment insights by brands"
              assortmentSub="Rising assortment across all brands"
              attributeLabel="Attribute insights by brands"
              attributeSub="Rising attributes across all brands based on assortment selection"
              data={brandTrendData}
            />
          </div>

          {/* SOCIAL column */}
          <div className="pt-6 lg:pt-0 lg:pl-6">
            <TrendColumn
              title="Social Media"
              subtitle=""
              assortmentLabel="Assortment insights by social media"
              assortmentSub="Rising assortment based on social media chatter"
              attributeLabel="Attribute insights by social media"
              attributeSub="Rising attributes across social media based on assortment selection"
              data={socialTrendData}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[10px] text-slate-400 font-medium">
          <span className="h-1.5 w-1.5 rounded-full bg-slate-300 shrink-0" />
          Updated weekly based on total brand portfolio &amp; social media data
        </div>
      </section>

      {/* ── Sub-tab Navigation ── */}
      <div
        role="tablist"
        aria-label="Insights views"
        className="border-b border-slate-200 flex gap-0"
      >
        <button
          id="subtab-brand"
          role="tab"
          aria-selected={activeSubTab === 'brand'}
          aria-controls="subtab-panel-brand"
          onClick={() => setActiveSubTab('brand')}
          className={`px-4 pb-2.5 pt-1 text-[11px] font-bold uppercase tracking-widest border-b-2 cursor-pointer transition-all duration-150 ${
            activeSubTab === 'brand'
              ? 'border-brand-crimson text-brand-crimson'
              : 'border-transparent text-slate-400 hover:text-slate-600 hover:border-slate-300'
          }`}
        >
          Brand Insights
        </button>
        <button
          id="subtab-social"
          role="tab"
          aria-selected={activeSubTab === 'social'}
          aria-controls="subtab-panel-social"
          onClick={() => setActiveSubTab('social')}
          className={`px-4 pb-2.5 pt-1 text-[11px] font-bold uppercase tracking-widest border-b-2 cursor-pointer transition-all duration-150 ${
            activeSubTab === 'social'
              ? 'border-brand-crimson text-brand-crimson'
              : 'border-transparent text-slate-400 hover:text-slate-600 hover:border-slate-300'
          }`}
        >
          Social Media Insights
        </button>
      </div>

      {/* ── Sub-view panel ── */}
      <div className="animate-fadeIn">
        {activeSubTab === 'brand'
          ? <div id="subtab-panel-brand" role="tabpanel" aria-labelledby="subtab-brand"><BrandInsightsView /></div>
          : <div id="subtab-panel-social" role="tabpanel" aria-labelledby="subtab-social"><SocialMediaInsightsView /></div>
        }
      </div>
    </div>
  );
}
