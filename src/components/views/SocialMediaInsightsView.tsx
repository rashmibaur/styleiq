'use client';

import React, { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ScatterChart,
  Scatter,
  Cell,
  CartesianGrid,
} from 'recharts';
import {
  brandVsUserActivityData,
  sentimentByAssortmentData,
  sentimentByAssortmentBrandData,
  attributeSentimentMatrixData,
  trendingThemesData,
  AttributeSentimentPoint,
} from '../../data/mockData';
import Dropdown from '../ui/Dropdown';

// ── Design token colors ───────────────────────────────────────
const COLORS = {
  crimson:       '#e11d48',
  chartSlate:    '#94a3b8',
  positiveGreen: '#16a34a',
  negativeRed:   '#dc2626',
  neutralBlue:   '#2563eb',
  primaryChart:  '#4d6c7a',
  gridLine:      '#f1f5f9',
  axisText:      '#94a3b8',
};

const AXIS_STYLE = { stroke: COLORS.axisText, fontSize: 10, tickLine: false as const };
const GRID_STYLE = { strokeDasharray: '3 3', stroke: COLORS.gridLine };

const fmtK = (v: number) =>
  v >= 1000 ? `${(v / 1000).toFixed(v % 1000 === 0 ? 0 : 1)}k` : String(v);

const getSentimentColor = (s: string) =>
  s === 'Positive' ? COLORS.positiveGreen :
  s === 'Negative' ? COLORS.negativeRed :
  COLORS.neutralBlue;

// ─────────────────────────────────────────────────────────────
// CHART 1: Grouped Bar — Brand vs User Activity
// ─────────────────────────────────────────────────────────────

// Custom tooltip using the render-prop pattern (no TooltipProps import needed)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function BrandVsUserTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const brand = payload.find((p: any) => p.dataKey === 'brand')?.value ?? 0;
  const user  = payload.find((p: any) => p.dataKey === 'user')?.value ?? 0;
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-3 text-[11px] space-y-1.5 min-w-[170px]">
      <p className="font-bold text-slate-800 pb-1 border-b border-slate-100">{label}</p>
      <div className="flex items-center justify-between gap-4">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-sm inline-block" style={{ background: COLORS.crimson }} />
          <span className="text-slate-600">Brand mentions</span>
        </span>
        <span className="font-bold text-slate-800">{fmtK(brand)}</span>
      </div>
      <div className="flex items-center justify-between gap-4">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-sm inline-block" style={{ background: COLORS.chartSlate }} />
          <span className="text-slate-600">User mentions</span>
        </span>
        <span className="font-bold text-slate-800">{fmtK(user)}</span>
      </div>
      {user > brand && (
        <p className="text-[10px] font-semibold pt-1 border-t border-slate-100" style={{ color: COLORS.positiveGreen }}>
          ↑ User demand exceeds brand supply
        </p>
      )}
    </div>
  );
}

function GroupedBarChart() {
  const [activeBarIndex, setActiveBarIndex] = useState<number | null>(null);

  return (
    <div className="bg-white border border-brand-border rounded-xl p-5 shadow-xs flex flex-col">
      <h3 className="text-[12px] font-bold text-slate-800">Brand vs User activity across assortments</h3>
      <p className="text-[10px] text-slate-400 mt-1 mb-4">Comparative social activity by assortment</p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={brandVsUserActivityData}
            margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
            onMouseLeave={() => setActiveBarIndex(null)}
          >
            <CartesianGrid {...GRID_STYLE} vertical={false} />
            <XAxis dataKey="name" {...AXIS_STYLE} axisLine={false} />
            <YAxis {...AXIS_STYLE} axisLine={false} tickFormatter={fmtK} />
            <Tooltip content={<BrandVsUserTooltip />} cursor={{ fill: '#f8fafc' }} />
            <Legend iconSize={8} iconType="square" wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
            <Bar
              dataKey="brand"
              name="Brand mentions"
              fill={COLORS.crimson}
              radius={[3, 3, 0, 0]}
              maxBarSize={14}
            >
              {brandVsUserActivityData.map((_, i) => (
                <Cell
                  key={i}
                  fill={COLORS.crimson}
                  fillOpacity={activeBarIndex === null || activeBarIndex === i ? 1 : 0.4}
                />
              ))}
            </Bar>
            <Bar
              dataKey="user"
              name="User mentions"
              fill={COLORS.chartSlate}
              radius={[3, 3, 0, 0]}
              maxBarSize={14}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onMouseEnter={(_: any, index: number) => setActiveBarIndex(index)}
            >
              {brandVsUserActivityData.map((_, i) => (
                <Cell
                  key={i}
                  fill={COLORS.chartSlate}
                  fillOpacity={activeBarIndex === null || activeBarIndex === i ? 1 : 0.4}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// CHART 2: Scatter — Attribute Sentiment Matrix
// ─────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ScatterTooltipContent({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload as AttributeSentimentPoint;
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-3 text-[11px] space-y-1 min-w-[160px]">
      <p className="font-bold text-slate-800">{d.name}</p>
      <p className="text-slate-500">Category: <span className="font-semibold text-slate-700">{d.category}</span></p>
      <p className="text-slate-500">Posts: <span className="font-semibold text-slate-700">{d.x.toLocaleString()}</span></p>
      <p className="text-slate-500">Engagement: <span className="font-semibold text-slate-700">{d.y}%</span></p>
      <p className="font-bold pt-1 border-t border-slate-100" style={{ color: getSentimentColor(d.sentiment) }}>
        {d.sentiment}
      </p>
    </div>
  );
}

function ScatterMatrixChart() {
  const [activeIndex,   setActiveIndex]   = useState<number | null>(null);
  const [selectedPoint, setSelectedPoint] = useState<AttributeSentimentPoint | null>(null);
  const [assortmentVal, setAssortmentVal] = useState('boots');
  const [attributeVal,  setAttributeVal]  = useState('color');

  return (
    <div className="bg-white border border-brand-border rounded-xl p-5 shadow-xs flex flex-col">
      <div className="flex items-start justify-between gap-3 mb-4 flex-wrap">
        <div>
          <h3 className="text-[12px] font-bold text-slate-800">Attribute sentiment matrix</h3>
          <p className="text-[10px] text-slate-400 mt-1">Growth of attributes in terms of posts and engagement</p>
        </div>
        <div className="flex gap-2 shrink-0">
          <Dropdown mode="single" label="Assortment"
            options={[{ value: 'boots', label: 'Boots' }, { value: 'heels', label: 'Heels' }, { value: 'sandals', label: 'Sandals' }]}
            value={assortmentVal} onChange={setAssortmentVal} />
          <Dropdown mode="single" label="Attribute"
            options={[{ value: 'color', label: 'Color' }, { value: 'occasion', label: 'Occasion' }, { value: 'heel', label: 'Heel Type' }]}
            value={attributeVal} onChange={setAttributeVal} />
        </div>
      </div>

      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 10, right: 20, left: -15, bottom: 20 }}>
            <CartesianGrid {...GRID_STYLE} />
            <XAxis
              type="number" dataKey="x" name="Number of Posts"
              {...AXIS_STYLE} axisLine={false}
              label={{ value: 'Number of Posts', position: 'insideBottom', offset: -12, fontSize: 9, fill: COLORS.axisText }}
            />
            <YAxis
              type="number" dataKey="y" name="Engagement" unit="%"
              {...AXIS_STYLE} axisLine={false}
              label={{ value: 'Engagement (%)', angle: -90, position: 'insideLeft', offset: 12, fontSize: 9, fill: COLORS.axisText }}
            />
            <Tooltip cursor={{ strokeDasharray: '4 4', stroke: '#cbd5e1' }} content={<ScatterTooltipContent />} />
            <Scatter
              data={attributeSentimentMatrixData}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onClick={(data: any) =>
                setSelectedPoint(prev => prev?.name === data.name ? null : (data as AttributeSentimentPoint))
              }
            >
              {attributeSentimentMatrixData.map((entry, i) => (
                <Cell
                  key={i}
                  fill={getSentimentColor(entry.sentiment)}
                  fillOpacity={activeIndex === null || activeIndex === i ? 0.9 : 0.25}
                  stroke={getSentimentColor(entry.sentiment)}
                  strokeWidth={activeIndex === i ? 2 : 0}
                  r={entry.z / 3}
                  onMouseEnter={() => setActiveIndex(i)}
                  onMouseLeave={() => setActiveIndex(null)}
                  style={{ cursor: 'pointer', transition: 'fill-opacity 150ms ease' }}
                />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {/* Scatter legend */}
      <div className="flex items-center gap-4 mt-2 text-[10px] text-slate-500 font-medium">
        {(['Positive', 'Neutral', 'Negative'] as const).map(s => (
          <span key={s} className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full inline-block" style={{ background: getSentimentColor(s) }} />
            {s}
          </span>
        ))}
      </div>

      {/* Drill-down card */}
      {selectedPoint && (
        <div className="mt-3 border-t border-slate-100 pt-3 animate-fadeIn">
          <div className="bg-section-background border border-outline rounded-lg p-3 text-[11px] space-y-1.5">
            <div className="flex items-center justify-between">
              <p className="font-bold text-slate-800">
                Drill-Down:{' '}
                <span style={{ color: getSentimentColor(selectedPoint.sentiment) }}>
                  {selectedPoint.name}
                </span>
              </p>
              <button
                onClick={() => setSelectedPoint(null)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer text-lg leading-none"
                aria-label="Close drill-down"
              >
                ×
              </button>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
              <span className="text-slate-500">Category</span>
              <span className="font-semibold text-slate-700">{selectedPoint.category}</span>
              <span className="text-slate-500">Post Volume</span>
              <span className="font-semibold text-slate-700">{selectedPoint.x.toLocaleString()} posts</span>
              <span className="text-slate-500">Engagement</span>
              <span className="font-semibold text-slate-700">{selectedPoint.y}%</span>
              <span className="text-slate-500">Sentiment</span>
              <span className="font-bold" style={{ color: getSentimentColor(selectedPoint.sentiment) }}>
                {selectedPoint.sentiment}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// CHART 3: Stacked Bar — Sentiment Analysis
// ─────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function SentimentTooltipContent({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const pos   = payload.find((p: any) => p.dataKey === 'positive')?.value ?? 0;
  const neu   = payload.find((p: any) => p.dataKey === 'neutral')?.value  ?? 0;
  const neg   = payload.find((p: any) => p.dataKey === 'negative')?.value ?? 0;
  const total = pos + neu + neg;
  const pct   = (v: number) => total > 0 ? `${Math.round((v / total) * 100)}%` : '—';

  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-3 text-[11px] space-y-1.5 min-w-[165px]">
      <p className="font-bold text-slate-800 pb-1 border-b border-slate-100">{label}</p>
      {[
        { key: 'Positive', val: pos, color: COLORS.positiveGreen },
        { key: 'Neutral',  val: neu, color: COLORS.neutralBlue   },
        { key: 'Negative', val: neg, color: COLORS.negativeRed   },
      ].map(({ key, val, color }) => (
        <div key={key} className="flex justify-between items-center gap-3">
          <span className="flex items-center gap-1.5" style={{ color }}>
            <span className="h-2 w-2 rounded-sm inline-block" style={{ background: color }} />
            {key}
          </span>
          <span className="font-bold text-slate-700">
            {val.toLocaleString()}{' '}
            <span className="font-normal text-slate-400">({pct(val)})</span>
          </span>
        </div>
      ))}
    </div>
  );
}

function SentimentStackedChart() {
  const [mentionBy, setMentionBy] = useState('user');
  const data = mentionBy === 'user' ? sentimentByAssortmentData : sentimentByAssortmentBrandData;

  return (
    <div className="bg-white border border-brand-border rounded-xl p-5 shadow-xs flex flex-col">
      <div className="flex items-start justify-between gap-3 mb-4 flex-wrap">
        <div>
          <h3 className="text-[12px] font-bold text-slate-800">Sentiment analysis by assortment</h3>
          <p className="text-[10px] text-slate-400 mt-1">Comparative social activity by assortment</p>
        </div>
        <Dropdown
          mode="single" label="Mentions by"
          options={[{ value: 'user', label: 'User' }, { value: 'brand', label: 'Brand' }]}
          value={mentionBy} onChange={setMentionBy}
        />
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
            <CartesianGrid {...GRID_STYLE} vertical={false} />
            <XAxis dataKey="name" {...AXIS_STYLE} axisLine={false} />
            <YAxis {...AXIS_STYLE} axisLine={false} />
            <Tooltip content={<SentimentTooltipContent />} cursor={{ fill: '#f8fafc' }} />
            <Legend iconSize={8} iconType="square" wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
            <Bar dataKey="positive" name="Positive" stackId="a" fill={COLORS.positiveGreen} maxBarSize={22} />
            <Bar dataKey="neutral"  name="Neutral"  stackId="a" fill={COLORS.neutralBlue}   maxBarSize={22} />
            <Bar dataKey="negative" name="Negative" stackId="a" fill={COLORS.negativeRed}   maxBarSize={22} radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// CHART 4: Horizontal Bar — Trending Themes
// ─────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function TrendingThemesTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-3 text-[11px] space-y-1 min-w-[180px]">
      <p className="font-bold text-slate-800">{d.name}</p>
      <p className="text-slate-500">Category: <span className="font-semibold text-slate-700">{d.category}</span></p>
      <p className="text-slate-500">
        Volume: <span className="font-bold text-slate-800">{(d.value as number).toLocaleString()} mentions</span>
      </p>
      <p className="text-slate-400 text-[10px]">Rank #{d.rank} trending theme</p>
    </div>
  );
}

function HorizontalThemesChart() {
  const [activeThemeIndex, setActiveThemeIndex] = useState<number | null>(null);

  return (
    <div className="bg-white border border-brand-border rounded-xl p-5 shadow-xs flex flex-col">
      <h3 className="text-[12px] font-bold text-slate-800">Trending themes based on attributes</h3>
      <p className="text-[10px] text-slate-400 mt-1 mb-4">Growth of attributes in terms of posts and engagement</p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={trendingThemesData}
            margin={{ top: 4, right: 16, left: 4, bottom: 4 }}
            onMouseLeave={() => setActiveThemeIndex(null)}
          >
            <CartesianGrid {...GRID_STYLE} horizontal={false} />
            <XAxis type="number" {...AXIS_STYLE} axisLine={false} tickFormatter={fmtK} />
            <YAxis
              dataKey="name" type="category"
              {...AXIS_STYLE} stroke="#64748b" width={90}
              tick={{ fontSize: 10, fill: '#475569' }}
            />
            <Tooltip content={<TrendingThemesTooltip />} cursor={{ fill: '#f8fafc' }} />
            <Bar
              dataKey="value" name="Chatter volume"
              radius={[0, 3, 3, 0]} maxBarSize={14}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onMouseEnter={(_: any, index: number) => setActiveThemeIndex(index)}
            >
              {trendingThemesData.map((_, i) => (
                <Cell
                  key={i}
                  fill={COLORS.primaryChart}
                  fillOpacity={activeThemeIndex === null || activeThemeIndex === i ? 1 : 0.35}
                  style={{ transition: 'fill-opacity 120ms ease' }}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Main export
// ─────────────────────────────────────────────────────────────

const TIME_OPTIONS = [
  { value: '1m',  label: '1 Month'   },
  { value: '3m',  label: '3 Months'  },
  { value: '6m',  label: '6 Months'  },
  { value: '12m', label: '12 Months' },
];

const BRAND_OPTIONS = [
  { value: 'gucci',     label: 'Gucci'     },
  { value: 'prada',     label: 'Prada'     },
  { value: 'dior',      label: 'Dior'      },
  { value: 'valentino', label: 'Valentino' },
  { value: 'versace',   label: 'Versace'   },
];

export default function SocialMediaInsightsView() {
  const [mounted,     setMounted]     = useState(false);
  const [timeFilter,  setTimeFilter]  = useState('1m');
  const [brandFilter, setBrandFilter] = useState<string[]>(['gucci', 'prada', 'dior', 'valentino', 'versace']);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) {
    return (
      <div className="space-y-6">
        <div className="h-96 w-full bg-section-background border border-brand-border rounded-xl animate-pulse" />
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* ── Filter Sub-Bar ── */}
      <div
        id="social-filter-bar"
        aria-label="Social media filters"
        className="flex items-center gap-3 bg-white border border-brand-border px-5 py-3 rounded-xl shadow-xs flex-wrap"
      >
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Filters:</span>
        <Dropdown
          id="social-time-filter"
          mode="single"
          label="Time"
          options={TIME_OPTIONS}
          value={timeFilter}
          onChange={setTimeFilter}
        />
        <Dropdown
          id="social-brands-filter"
          mode="multi"
          label="Brands"
          options={BRAND_OPTIONS}
          value={brandFilter}
          onChange={setBrandFilter}
        />
      </div>

      {/* ── Row 1: Grouped Bar + Stacked Bar ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <GroupedBarChart />
        <SentimentStackedChart />
      </div>

      {/* ── Row 2: Scatter Plot + Horizontal Bar ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <ScatterMatrixChart />
        <HorizontalThemesChart />
      </div>

      {/* ── Footer Actions ── */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          id="btn-download-report"
          className="px-4 py-2 border border-button-outline text-slate-600 hover:bg-chip-fill hover:border-outline font-bold text-[11px] rounded-md shadow-xs transition-all duration-200 cursor-pointer uppercase tracking-wider"
        >
          Download Report
        </button>
        <button
          id="btn-create-products"
          className="px-4 py-2 bg-brand-crimson text-white font-bold text-[11px] rounded-md shadow-xs hover:bg-brand-crimson-dark active:scale-[0.97] transition-all duration-200 cursor-pointer uppercase tracking-wider"
        >
          Create New Products
        </button>
      </div>
    </div>
  );
}
