'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ResponsiveContainer, Treemap } from 'recharts';
import { Calendar, X } from 'lucide-react';
import {
  brandCatalogSpreadData,
  newProductLaunchData,
  brandAttributesMatrix,
  TreemapItem,
} from '../../data/mockData';
import SecondaryButton from '../ui/SecondaryButton';

// Recharts v3 Treemap requires index-signature-compatible data type
type TreemapDataItem = TreemapItem & { [key: string]: unknown };

// ── Color palette for treemap tiles ─────────────────────────
// Uses shades and tints of the Primary Chart Color (#4D6C7A) keeping Hue = 199 and Saturation = 23%
const TREEMAP_COLORS = [
  '#1f2c32', // L = 16% (Very dark slate/blue-gray)
  '#27373f', // L = 20%
  '#2f424b', // L = 24%
  '#374d58', // L = 28%
  '#3f5864', // L = 32%
  '#476471', // L = 36%
  '#4d6c7a', // The core #4D6C7A color (L = 39%)
  '#547787', // L = 43%
  '#5e8597', // L = 48%
];

// ── Custom SVG Treemap renderer ──────────────────────────────

interface ContentProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  name?: string;
  count?: string;
  percentage?: string;
  index?: number;
  onTileClick?: (name: string) => void;
  activeTile?: string | null;
}

const CustomTreemapContent = (props: ContentProps) => {
  const { x = 0, y = 0, width = 0, height = 0, name, count, percentage, index = 0, onTileClick, activeTile } = props;

  const [hovered, setHovered] = useState(false);

  if (width < 24 || height < 24) return null;

  const isActive = activeTile != null && activeTile === name;
  const baseFill = TREEMAP_COLORS[index % TREEMAP_COLORS.length];
  const fill = isActive ? '#e11d48' : baseFill;

  return (
    <g
      onClick={() => onTileClick && name && onTileClick(name)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={onTileClick ? 'cursor-pointer' : ''}
      role={onTileClick ? 'button' : undefined}
      aria-label={name}
    >
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={fill}
        stroke="#fff"
        strokeWidth={1.5}
        style={{
          transition: 'all 180ms cubic-bezier(0.4, 0, 0.2, 1)',
          filter: hovered ? 'brightness(1.18) saturate(1.05)' : 'none',
        }}
      />
      {/* Brand / category name */}
      {width > 50 && height > 24 && (
        <text
          x={x + 8}
          y={y + 16}
          fill="#FFFFFF"
          fontSize={10}
          fontWeight="bold"
          fontFamily="Roboto, sans-serif"
          pointerEvents="none"
        >
          {name}
        </text>
      )}
      {/* Count */}
      {width > 70 && height > 40 && (
        <text
          x={x + 8}
          y={y + 29}
          fill="#CBD5E1"
          fontSize={9}
          fontFamily="Roboto, sans-serif"
          pointerEvents="none"
        >
          {count}
        </text>
      )}
      {/* Percentage */}
      {width > 70 && height > 52 && (
        <text
          x={x + 8}
          y={y + 41}
          fill="#FFFFFF"
          fontSize={9}
          fontWeight="bold"
          fontFamily="Roboto, sans-serif"
          pointerEvents="none"
        >
          {percentage}
        </text>
      )}
    </g>
  );
};

// ── Active filter badge chip ─────────────────────────────────

function FilterBadge({ label, onClear }: { label: string; onClear: () => void }) {
  return (
    <div className="flex items-center gap-1.5 bg-red-fill border border-red-stroke text-negative-red font-bold text-[10px] uppercase px-2.5 py-1 rounded-full animate-fadeIn">
      <span>{label}</span>
      <button
        onClick={onClear}
        aria-label={`Clear ${label} filter`}
        className="p-0.5 hover:bg-red-stroke/20 rounded-full transition cursor-pointer"
      >
        <X size={10} />
      </button>
    </div>
  );
}

// ── Main component ───────────────────────────────────────────

export default function BrandInsightsView() {
  const [mounted, setMounted] = useState(false);

  const [dateRange, setDateRange]   = useState({ from: '2026-04-08', to: '2026-04-18' });
  const [showCalendar, setShowCalendar] = useState(false);

  const [selectedCatalogAssortment, setSelectedCatalogAssortment] = useState<string | null>(null);
  const [selectedLaunchAssortment,  setSelectedLaunchAssortment]  = useState<string | null>(null);
  const [selectedLaunchBrand,       setSelectedLaunchBrand]       = useState<string | null>(null);

  useEffect(() => { setMounted(true); }, []);

  // ── Filtered catalog by brands ─────────────────────────────
  const getFilteredCatalogByBrands = useCallback((): TreemapDataItem[] => {
    if (!selectedCatalogAssortment) return brandCatalogSpreadData.catalogByBrands;

    const assortmentMap: Record<string, TreemapDataItem[]> = {
      Heels: [
        { name: 'Gucci', size: 90, count: '90 Heels SKUs', percentage: '32%' },
        { name: 'Prada', size: 70, count: '70 Heels SKUs', percentage: '25%' },
        { name: 'Valentino', size: 60, count: '60 Heels SKUs', percentage: '21%' },
        { name: 'Dior', size: 30, count: '30 Heels SKUs', percentage: '11%' },
        { name: 'Chanel', size: 20, count: '20 Heels SKUs', percentage: '7%' },
        { name: 'Versace', size: 10, count: '10 Heels SKUs', percentage: '4%' },
      ],
      Sneakers: [
        { name: 'Dior', size: 120, count: '120 Sneakers SKUs', percentage: '32%' },
        { name: 'Gucci', size: 100, count: '100 Sneakers SKUs', percentage: '26%' },
        { name: 'Prada', size: 80, count: '80 Sneakers SKUs', percentage: '21%' },
        { name: 'Versace', size: 50, count: '50 Sneakers SKUs', percentage: '13%' },
        { name: 'Chanel', size: 30, count: '30 Sneakers SKUs', percentage: '8%' },
      ],
      Boots: [
        { name: 'Prada', size: 95, count: '95 Boots SKUs', percentage: '38%' },
        { name: 'Gucci', size: 75, count: '75 Boots SKUs', percentage: '30%' },
        { name: 'Dior', size: 50, count: '50 Boots SKUs', percentage: '20%' },
        { name: 'Chanel', size: 30, count: '30 Boots SKUs', percentage: '12%' },
      ],
    };

    return assortmentMap[selectedCatalogAssortment] ?? brandCatalogSpreadData.catalogByBrands.map(item => ({
      ...item,
      size: Math.max(15, Math.round(item.size * 0.45)),
      count: `${Math.round(item.size * 0.45)} ${selectedCatalogAssortment} SKUs`,
    }));
  }, [selectedCatalogAssortment]);

  // ── Filtered launch brands ─────────────────────────────────
  const getFilteredLaunchByBrands = useCallback((): TreemapDataItem[] => {
    if (!selectedLaunchAssortment) return newProductLaunchData.catalogByBrands;

    const launchMap: Record<string, TreemapDataItem[]> = {
      Heels: [
        { name: 'Gucci',     size: 12, count: '12 Heels SKUs', percentage: '38%' },
        { name: 'Dior',      size:  9, count:  '9 Heels SKUs', percentage: '28%' },
        { name: 'Prada',     size:  6, count:  '6 Heels SKUs', percentage: '19%' },
        { name: 'Valentino', size:  5, count:  '5 Heels SKUs', percentage: '15%' },
      ],
      Sneakers: [
        { name: 'Gucci',   size: 18, count: '18 Sneakers SKUs', percentage: '33%' },
        { name: 'Dior',    size: 15, count: '15 Sneakers SKUs', percentage: '27%' },
        { name: 'Prada',   size: 12, count: '12 Sneakers SKUs', percentage: '22%' },
        { name: 'Versace', size: 10, count: '10 Sneakers SKUs', percentage: '18%' },
      ],
    };

    return launchMap[selectedLaunchAssortment] ?? newProductLaunchData.catalogByBrands.map(item => ({
      ...item,
      size: Math.max(2, Math.round(item.size * 0.5)),
      count: `${Math.round(item.size * 0.5)} ${selectedLaunchAssortment} SKUs`,
    }));
  }, [selectedLaunchAssortment]);

  // ── Filtered attribute matrix ──────────────────────────────
  const getFilteredAttributesMatrix = useCallback(() => {
    if (!selectedLaunchAssortment && !selectedLaunchBrand) return brandAttributesMatrix;

    const mod =
      (selectedLaunchBrand    ? selectedLaunchBrand.charCodeAt(0)    : 0) +
      (selectedLaunchAssortment ? selectedLaunchAssortment.charCodeAt(0) : 0);

    const heelNames: Record<string, string[]> = {
      Heels:   ['Stiletto Heel', 'Block Heel', 'Kitten Heel', 'Slim Stiletto', 'Wedge Heel', 'Platform Heel'],
      Boots:   ['Chunky Sole',   'Flat Sole',  'Block Heel',  'Cuban Heel',    'Lug Sole',   'Low Heel'],
    };

    return brandAttributesMatrix.map((row, idx) => ({
      color:         { name: row.color.name,         pct: `${((28 - idx * 3 + mod) % 20) + 10}%` },
      occasion:      { name: row.occasion.name,      pct: `${((30 - idx * 2 + mod) % 25) + 12}%` },
      ornamentation: { name: row.ornamentation.name, pct: `${((20 - idx     + mod) % 18) +  8}%` },
      toe:           { name: row.toe.name,            pct: `${((30 - idx * 4 + mod) % 25) +  8}%` },
      heel: {
        name:          selectedLaunchAssortment && heelNames[selectedLaunchAssortment]
                         ? heelNames[selectedLaunchAssortment][idx % heelNames[selectedLaunchAssortment].length]
                         : row.heel.name,
        pct:           `${((30 - idx * 3 + mod) % 20) + 12}%`,
        isHighlighted: row.heel.isHighlighted,
      },
    }));
  }, [selectedLaunchAssortment, selectedLaunchBrand]);

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

  if (!mounted) {
    return (
      <div className="space-y-8">
        <div className="h-96 w-full bg-section-background border border-brand-border rounded-xl animate-pulse" />
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* ── Date Range Filter Bar ── */}
      <div className="relative flex items-center gap-3 bg-white border border-brand-border px-5 py-3.5 rounded-xl shadow-xs">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Filters:</span>

        <button
          id="brand-date-filter"
          onClick={() => setShowCalendar(v => !v)}
          aria-expanded={showCalendar}
          aria-haspopup="dialog"
          className="flex items-center gap-2 border border-button-outline bg-chip-fill rounded-md px-3 py-1.5 text-[11px] font-semibold text-slate-700 hover:bg-slate-100 transition cursor-pointer"
        >
          <Calendar size={13} className="text-slate-500" />
          <span>From: {formatDate(dateRange.from)}</span>
          <span className="text-slate-400 mx-0.5">—</span>
          <span>To: {formatDate(dateRange.to)}</span>
        </button>

        {/* Calendar popover */}
        {showCalendar && (
          <div
            role="dialog"
            aria-label="Select date range"
            className="absolute top-14 left-24 bg-white border border-outline rounded-xl p-4 shadow-lg z-50 flex gap-4 text-xs animate-slideDown"
          >
            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-400 uppercase text-[9px]">From</label>
              <input
                type="date"
                value={dateRange.from}
                onChange={e => setDateRange(p => ({ ...p, from: e.target.value }))}
                className="border border-outline rounded-md px-2 py-1 text-slate-700 focus:outline-none focus:border-brand-crimson"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-400 uppercase text-[9px]">To</label>
              <input
                type="date"
                value={dateRange.to}
                onChange={e => setDateRange(p => ({ ...p, to: e.target.value }))}
                className="border border-outline rounded-md px-2 py-1 text-slate-700 focus:outline-none focus:border-brand-crimson"
              />
            </div>
            <button
              onClick={() => setShowCalendar(false)}
              className="mt-auto bg-brand-crimson text-white px-3 py-1.5 rounded-md font-bold hover:bg-brand-crimson-dark transition cursor-pointer text-[11px]"
            >
              Apply
            </button>
          </div>
        )}
      </div>

      {/* ──────────────────────────────────────────────────────── */}
      {/* SECTION 1: Brand Catalogue Spread                        */}
      {/* ──────────────────────────────────────────────────────── */}
      <section aria-label="Brand Catalogue Spread" className="space-y-4">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <h2 className="text-sm font-bold text-slate-800">Brand Catalogue Spread</h2>
            <p className="text-[11px] text-slate-400 mt-0.5">Overall catalogue distribution by assortment and brands</p>
          </div>
          {selectedCatalogAssortment && (
            <FilterBadge
              label={`Filtered: ${selectedCatalogAssortment}`}
              onClear={() => setSelectedCatalogAssortment(null)}
            />
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Left: Assortment Spread */}
          <div className="bg-white border border-brand-border rounded-xl p-5 shadow-xs">
            <h3 className="text-[12px] font-bold text-slate-800">Assortment spread across catalogues</h3>
            <p className="text-[10px] text-slate-400 mt-1 mb-4">
              Click a category rectangle below to filter leading brands
            </p>
            <div className="h-60 w-full rounded-lg overflow-hidden bg-section-background border border-outline">
              <ResponsiveContainer width="100%" height="100%">
                <Treemap
                  data={brandCatalogSpreadData.assortmentSpread}
                  dataKey="size"
                  stroke="#fff"
                  content={
                    <CustomTreemapContent
                      onTileClick={setSelectedCatalogAssortment}
                      activeTile={selectedCatalogAssortment}
                    />
                  }
                />
              </ResponsiveContainer>
            </div>
            <p className="text-[9px] text-slate-400 mt-2 flex items-center gap-1">
              <span className="h-1 w-1 rounded-full bg-slate-300" />
              Click on an assortment to view brand portfolio expansion relative to portfolio size
            </p>
          </div>

          {/* Right: Catalogue by Brands */}
          <div className="bg-white border border-brand-border rounded-xl p-5 shadow-xs">
            <h3 className="text-[12px] font-bold text-slate-800">
              Catalogue by Brands{selectedCatalogAssortment && ` (${selectedCatalogAssortment})`}
            </h3>
            <p className="text-[10px] text-slate-400 mt-1 mb-4">Catalogue comparison of leading brands</p>
            <div className="h-60 w-full rounded-lg overflow-hidden bg-section-background border border-outline">
              <ResponsiveContainer width="100%" height="100%">
                <Treemap
                  data={getFilteredCatalogByBrands()}
                  dataKey="size"
                  stroke="#fff"
                  content={<CustomTreemapContent />}
                />
              </ResponsiveContainer>
            </div>
            <p className="text-[9px] text-slate-400 mt-2 flex items-center gap-1">
              <span className="h-1 w-1 rounded-full bg-slate-300" />
              Catalogue comparisons of new brand portfolio, expressed relative to portfolio size
            </p>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────── */}
      {/* SECTION 2: New Product Launch                           */}
      {/* ──────────────────────────────────────────────────────── */}
      <section aria-label="New Product Launch" className="space-y-4">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <h2 className="text-sm font-bold text-slate-800">New Product Launch</h2>
            <p className="text-[11px] text-slate-400 mt-0.5">Distribution of new products by assortment and brands</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            {selectedLaunchAssortment && (
              <FilterBadge
                label={`Assortment: ${selectedLaunchAssortment}`}
                onClear={() => { setSelectedLaunchAssortment(null); setSelectedLaunchBrand(null); }}
              />
            )}
            {selectedLaunchBrand && (
              <div className="flex items-center gap-1.5 bg-chip-fill border border-outline text-slate-700 font-bold text-[10px] uppercase px-2.5 py-1 rounded-full animate-fadeIn">
                <span>Brand: {selectedLaunchBrand}</span>
                <button
                  onClick={() => setSelectedLaunchBrand(null)}
                  className="p-0.5 hover:bg-slate-200 rounded-full transition cursor-pointer"
                >
                  <X size={10} />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Left: by Assortment */}
          <div className="bg-white border border-brand-border rounded-xl p-5 shadow-xs">
            <h3 className="text-[12px] font-bold text-slate-800">Catalogue by Assortment</h3>
            <p className="text-[10px] text-slate-400 mt-1 mb-4">
              Click a category below to filter brand new launches
            </p>
            <div className="h-60 w-full rounded-lg overflow-hidden bg-section-background border border-outline">
              <ResponsiveContainer width="100%" height="100%">
                <Treemap
                  data={newProductLaunchData.catalogByAssortment}
                  dataKey="size"
                  stroke="#fff"
                  content={
                    <CustomTreemapContent
                      onTileClick={(name) => {
                        setSelectedLaunchAssortment(name);
                        setSelectedLaunchBrand(null);
                      }}
                      activeTile={selectedLaunchAssortment}
                    />
                  }
                />
              </ResponsiveContainer>
            </div>
            <p className="text-[9px] text-slate-400 mt-2 flex items-center gap-1">
              <span className="h-1 w-1 rounded-full bg-slate-300" />
              Click on an assortment to view or compare brands in the detail below
            </p>
          </div>

          {/* Right: by Brands */}
          <div className="bg-white border border-brand-border rounded-xl p-5 shadow-xs">
            <h3 className="text-[12px] font-bold text-slate-800">
              Catalogue by Brands{selectedLaunchAssortment && ` (${selectedLaunchAssortment})`}
            </h3>
            <p className="text-[10px] text-slate-400 mt-1 mb-4">
              Click a brand below to update the attribute share matrix below
            </p>
            <div className="h-60 w-full rounded-lg overflow-hidden bg-section-background border border-outline">
              <ResponsiveContainer width="100%" height="100%">
                <Treemap
                  data={getFilteredLaunchByBrands()}
                  dataKey="size"
                  stroke="#fff"
                  content={
                    <CustomTreemapContent
                      onTileClick={setSelectedLaunchBrand}
                      activeTile={selectedLaunchBrand}
                    />
                  }
                />
              </ResponsiveContainer>
            </div>
            <p className="text-[9px] text-slate-400 mt-2 flex items-center gap-1">
              <span className="h-1 w-1 rounded-full bg-slate-300" />
              Click on a brand to see individual brand data in the detail below
            </p>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────── */}
      {/* SECTION 3: Attribute by assortment & brand matrix        */}
      {/* ──────────────────────────────────────────────────────── */}
      <section
        aria-label="Attribute by assortment and brand"
        className="bg-white border border-brand-border rounded-xl p-5 shadow-xs"
      >
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-bold text-slate-800 flex items-center flex-wrap gap-2">
              Attribute by assortment and brand
              {(selectedLaunchAssortment || selectedLaunchBrand) && (
                <span className="text-xs font-semibold text-brand-crimson">
                  (filtered by {selectedLaunchAssortment ?? 'All'}
                  {selectedLaunchBrand ? ` + ${selectedLaunchBrand}` : ''})
                </span>
              )}
            </h2>
            <p className="text-[10px] text-slate-400 mt-0.5">
              Top attributes based on percentage share of total SKUs by selected assortment &amp; brand
            </p>
          </div>
          {(selectedLaunchAssortment || selectedLaunchBrand) && (
            <button
              onClick={() => { setSelectedLaunchAssortment(null); setSelectedLaunchBrand(null); }}
              className="text-[11px] font-bold text-slate-400 hover:text-slate-700 underline transition cursor-pointer"
            >
              Reset Filter
            </button>
          )}
        </div>

        {/* Column headers */}
        <div className="mb-2 px-2">
          <div className="grid grid-cols-10 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
            <div className="col-span-2 text-center border-b border-slate-100 pb-1.5">Color</div>
            <div className="col-span-2 text-center border-b border-slate-100 pb-1.5">Occasion</div>
            <div className="col-span-2 text-center border-b border-slate-100 pb-1.5">Ornamentation</div>
            <div className="col-span-2 text-center border-b border-slate-100 pb-1.5">Toe</div>
            <div className="col-span-2 text-center border-b border-slate-100 pb-1.5">Heel</div>
          </div>
        </div>

        <div className="overflow-x-auto custom-scroll">
          <table className="min-w-full text-xs">
            <thead className="sr-only">
              <tr>
                <th>Color Name</th><th>Color %</th>
                <th>Occasion Name</th><th>Occasion %</th>
                <th>Ornamentation Name</th><th>Ornamentation %</th>
                <th>Toe Name</th><th>Toe %</th>
                <th>Heel Name</th><th>Heel %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {getFilteredAttributesMatrix().map((row, idx) => (
                <tr key={idx} className="hover:bg-section-background transition-colors group">
                  {/* Color */}
                  <td className="px-3 py-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-medium text-slate-700 text-[11px]">{row.color.name}</span>
                      <span className="text-[10px] bg-chip-fill text-slate-600 font-bold px-1.5 py-0.5 rounded shrink-0">{row.color.pct}</span>
                    </div>
                  </td>
                  {/* Occasion */}
                  <td className="px-3 py-3 border-l border-slate-50">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-medium text-slate-700 text-[11px]">{row.occasion.name}</span>
                      <span className="text-[10px] bg-chip-fill text-slate-600 font-bold px-1.5 py-0.5 rounded shrink-0">{row.occasion.pct}</span>
                    </div>
                  </td>
                  {/* Ornamentation */}
                  <td className="px-3 py-3 border-l border-slate-50">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-medium text-slate-700 text-[11px]">{row.ornamentation.name}</span>
                      <span className="text-[10px] bg-chip-fill text-slate-600 font-bold px-1.5 py-0.5 rounded shrink-0">{row.ornamentation.pct}</span>
                    </div>
                  </td>
                  {/* Toe */}
                  <td className="px-3 py-3 border-l border-slate-50">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-medium text-slate-700 text-[11px]">{row.toe.name}</span>
                      <span className="text-[10px] bg-chip-fill text-slate-600 font-bold px-1.5 py-0.5 rounded shrink-0">{row.toe.pct}</span>
                    </div>
                  </td>
                  {/* Heel — conditionally highlighted */}
                  <td className="px-3 py-3 border-l border-slate-50">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-medium text-slate-700 text-[11px]">{row.heel.name}</span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0 ${
                        row.heel.isHighlighted
                          ? 'bg-red-fill text-negative-red border border-red-stroke'
                          : 'bg-chip-fill text-slate-600'
                      }`}>
                        {row.heel.pct}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer CTA */}
        <div className="flex items-center justify-end mt-4 pt-3 border-t border-slate-100">
          <SecondaryButton
            id="btn-view-new-products"
            label="View Details of New Products"
            state="active"
          />
        </div>
      </section>
    </div>
  );
}
