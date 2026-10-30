import React, { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  CartesianGrid
} from 'recharts';
import { ArrowLeft, Check, Download, Calendar } from 'lucide-react';
import { ShoeSvg } from './CollectionListTable';
import { demandForecastSummaryData, launchPlanMatrixData } from '../../data/mockData';

interface LaunchIntelligenceProps {
  productId: string;
  onBack: () => void;
}

export default function LaunchIntelligence({ productId, onBack }: LaunchIntelligenceProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const [timeRange, setTimeRange] = useState('3 Month');
  const [isSaved, setIsSaved] = useState(false);

  const handleAddToList = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  // Helper to determine heat matrix styling based on store count
  const getHeatCellClass = (count: number) => {
    if (count >= 8) return 'bg-heat-4 text-white font-bold border border-rose-600';
    if (count >= 5) return 'bg-heat-3 text-white font-semibold border border-rose-400';
    if (count >= 3) return 'bg-heat-2 text-rose-900 font-medium border border-rose-200';
    return 'bg-heat-1 text-rose-800 border border-rose-100';
  };

  return (
    <div className="space-y-6">
      {/* Header and Back Button */}
      <div className="flex items-center gap-2">
        <button
          onClick={onBack}
          className="p-1 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-md cursor-pointer transition"
        >
          <ArrowLeft size={16} />
        </button>
        <h1 className="text-base font-bold text-slate-800">
          {productId} • Women Heel
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN: Product Overview & Attributes */}
        <div className="lg:col-span-1 space-y-6">
          {/* Performance Indicator */}
          <div className="bg-white border border-brand-border rounded-xl p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Performance Indicator</span>
              <span className="text-xs font-bold text-emerald-600">HIGH PERFORMANCE</span>
            </div>
            <div className="relative pt-2">
              <div className="h-2 w-full bg-slate-100 rounded-full flex overflow-hidden">
                <div className="w-1/3 bg-red-200"></div>
                <div className="w-1/3 bg-yellow-200"></div>
                <div className="w-1/3 bg-emerald-200"></div>
              </div>
              <div className="absolute top-1 right-[15%] h-4 w-1 bg-slate-800 rounded-xs"></div>
            </div>
            <div className="flex justify-between text-[9px] text-slate-400 font-bold uppercase mt-2">
              <span>Low</span>
              <span>Medium</span>
              <span>High</span>
            </div>
          </div>

          {/* Large Image Container */}
          <div className="bg-white border border-brand-border rounded-xl p-6 shadow-xs flex flex-col items-center justify-center min-h-72">
            <ShoeSvg color="Jet Black" className="w-48 h-48 drop-shadow-md text-slate-800" />
            
            <div className="grid grid-cols-2 gap-3 w-full mt-4">
              <div className="bg-slate-50 border border-slate-100 rounded-lg p-2.5 text-left">
                <span className="block text-[9px] text-slate-400 font-medium uppercase">Category</span>
                <span className="text-xs font-bold text-slate-700">Women</span>
              </div>
              <div className="bg-slate-50 border border-slate-100 rounded-lg p-2.5 text-left">
                <span className="block text-[9px] text-slate-400 font-medium uppercase">Assortment</span>
                <span className="text-xs font-bold text-slate-700">Heels</span>
              </div>
            </div>
          </div>

          {/* Product Attributes Summary */}
          <div className="bg-white border border-brand-border rounded-xl p-5 shadow-xs space-y-4">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wide border-b border-slate-100 pb-2">Product attributes</h3>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="block text-[9px] text-slate-400 font-bold uppercase">Color</span>
                <span className="font-semibold text-slate-700">Black</span>
              </div>
              <div>
                <span className="block text-[9px] text-slate-400 font-bold uppercase">Occasion</span>
                <span className="font-semibold text-slate-700">Party wear</span>
              </div>
              <div>
                <span className="block text-[9px] text-slate-400 font-bold uppercase">Ornamentation</span>
                <span className="font-semibold text-slate-700">Shimmer</span>
              </div>
              <div>
                <span className="block text-[9px] text-slate-400 font-bold uppercase">Toe Type</span>
                <span className="font-semibold text-slate-700">Round toe</span>
              </div>
              <div>
                <span className="block text-[9px] text-slate-400 font-bold uppercase">Heel Type</span>
                <span className="font-semibold text-slate-700">Stiletto heel</span>
              </div>
              <div>
                <span className="block text-[9px] text-slate-400 font-bold uppercase">Closure Type</span>
                <span className="font-semibold text-slate-700">Slip on</span>
              </div>
              <div>
                <span className="block text-[9px] text-slate-400 font-bold uppercase">Print/ Pattern</span>
                <span className="font-semibold text-slate-700">Solid</span>
              </div>
              <div>
                <span className="block text-[9px] text-slate-400 font-bold uppercase">Tech</span>
                <span className="font-semibold text-slate-700">Arch support</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Demand Forecast & Launch Plan */}
        <div className="lg:col-span-2 space-y-6">
          {/* Demand Forecast Summary */}
          <div className="bg-white border border-brand-border rounded-xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-800">Demand Forecast Summary</h3>
                <p className="text-[10px] text-slate-400 mt-1">Expected sales volume and demand prediction envelope</p>
              </div>
              <select
                value={timeRange}
                onChange={e => setTimeRange(e.target.value)}
                className="border border-slate-200 rounded px-2.5 py-1 text-xs bg-slate-50 font-semibold text-slate-700 focus:outline-hidden cursor-pointer"
              >
                <option value="3 Month">Time: 3 Month</option>
                <option value="6 Month">Time: 6 Month</option>
              </select>
            </div>

            {/* Bullet notes box */}
            <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 text-left">
              <ul className="text-[11px] text-slate-500 space-y-1.5 list-disc pl-4">
                <li>Forecast is driven mainly by recent sales trends (last 3 months).</li>
                <li>Product category & previous similar product performance influence the expected demand.</li>
                <li>Seasonality and recency are considered with different importance where relevant.</li>
                <li>A forecast range is shown to reflect normal demand variation.</li>
              </ul>
            </div>

            {/* Bounding Envelope Chart */}
            <div className="h-64 w-full">
              {mounted ? (
                <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={demandForecastSummaryData}
                  margin={{ top: 20, right: 10, left: -20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '11px' }}
                  />
                  {/* Bounding envelope area */}
                  <Area
                    dataKey="range"
                    stroke="none"
                    fill="#10B981"
                    fillOpacity={0.08}
                    name="Forecast Range"
                  />
                  {/* Dashed lines representing upper and lower bounds */}
                  <Line
                    type="monotone"
                    dataKey="upper"
                    stroke="#10B981"
                    strokeWidth={1.5}
                    strokeDasharray="4 4"
                    dot={false}
                    name="Upper Bound"
                  />
                  <Line
                    type="monotone"
                    dataKey="lower"
                    stroke="#F59E0B"
                    strokeWidth={1.5}
                    strokeDasharray="4 4"
                    dot={false}
                    name="Lower Bound"
                  />
                  {/* Actual data nodes */}
                  <Line
                    type="monotone"
                    dataKey="actual"
                    stroke="none"
                    dot={{ r: 4.5, fill: '#EF4444', strokeWidth: 0 }}
                    name="Actuals"
                  />
                </AreaChart>
              </ResponsiveContainer>
              ) : (
                <div className="h-full w-full bg-slate-50 border border-slate-100 rounded-lg animate-pulse flex items-center justify-center text-slate-400 text-xs">
                  Loading Forecast Data...
                </div>
              )}
            </div>

            {/* Custom Legend */}
            <div className="flex items-center justify-start gap-5 text-[10px] text-slate-500 font-semibold pl-6 mt-1">
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-emerald-500"></span> Upper Bound</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-amber-500"></span> Lower Bound</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-red-500"></span> Actuals</span>
            </div>
          </div>

          {/* Launch Plan Heat Matrix */}
          <div className="bg-white border border-brand-border rounded-xl p-5 shadow-xs space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-800">LAUNCH PLAN</h3>
              <p className="text-[10px] text-slate-400 mt-1">Store allocation matrix details across clusters and store formats</p>
            </div>

            {/* Bullets box */}
            <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 text-left">
              <ul className="text-[11px] text-slate-500 space-y-1.5 list-disc pl-4">
                <li>Store allocation is based on predicted demand strength across clusters.</li>
                <li>High-potential clusters receive wider store coverage to maximize early performance.</li>
                <li>Store types are selected based on historical success for similar products.</li>
                <li>Plan balances reach and risk, not just average demand.</li>
              </ul>
            </div>

            {/* Heat Matrix Grid */}
            <div className="overflow-x-auto pt-2">
              <table className="min-w-full border-collapse text-xs">
                <thead>
                  <tr className="text-slate-500 uppercase tracking-wider font-bold">
                    <th className="p-3 text-left w-1/4"></th>
                    <th className="p-3 text-center w-1/5">
                      <span className="block text-[9px] text-slate-400">A</span>
                      <span className="block text-[10px] text-slate-600 font-bold">Store Type</span>
                    </th>
                    <th className="p-3 text-center w-1/5">
                      <span className="block text-[9px] text-slate-400">B</span>
                      <span className="block text-[10px] text-slate-600 font-bold">Store Type</span>
                    </th>
                    <th className="p-3 text-center w-1/5">
                      <span className="block text-[9px] text-slate-400">C</span>
                      <span className="block text-[10px] text-slate-600 font-bold">Store Type</span>
                    </th>
                    <th className="p-3 text-center w-1/5 border-l border-slate-150">
                      <span className="block text-[9px] text-slate-400">Totals</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {launchPlanMatrixData.rows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3 font-bold text-slate-600 text-left uppercase text-[10px]">
                        {row.cluster}
                      </td>
                      <td className="p-2 text-center">
                        <div className={`mx-auto max-w-[80px] py-2.5 rounded-lg flex flex-col items-center justify-center ${getHeatCellClass(row.A)}`}>
                          <span className="text-xs font-extrabold">{row.A}</span>
                          <span className="text-[8px] uppercase tracking-wider font-bold opacity-80">Stores</span>
                        </div>
                      </td>
                      <td className="p-2 text-center">
                        <div className={`mx-auto max-w-[80px] py-2.5 rounded-lg flex flex-col items-center justify-center ${getHeatCellClass(row.B)}`}>
                          <span className="text-xs font-extrabold">{row.B}</span>
                          <span className="text-[8px] uppercase tracking-wider font-bold opacity-80">Stores</span>
                        </div>
                      </td>
                      <td className="p-2 text-center">
                        <div className={`mx-auto max-w-[80px] py-2.5 rounded-lg flex flex-col items-center justify-center ${getHeatCellClass(row.C)}`}>
                          <span className="text-xs font-extrabold">{row.C}</span>
                          <span className="text-[8px] uppercase tracking-wider font-bold opacity-80">Stores</span>
                        </div>
                      </td>
                      <td className="p-2 text-center border-l border-slate-150">
                        <div className="mx-auto max-w-[80px] py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 font-bold flex flex-col items-center justify-center">
                          <span className="text-xs font-extrabold">{row.total}</span>
                          <span className="text-[8px] uppercase tracking-wider font-bold text-slate-400">Stores</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {/* Totals Row */}
                  <tr className="bg-slate-50 font-bold border-t border-slate-200">
                    <td className="p-3 text-left uppercase text-[10px] text-slate-700">
                      TOTALS
                    </td>
                    <td className="p-3 text-center">
                      <span className="block text-xs font-extrabold text-slate-800">{launchPlanMatrixData.totals.A}</span>
                      <span className="block text-[8px] uppercase text-slate-400">Stores</span>
                    </td>
                    <td className="p-3 text-center">
                      <span className="block text-xs font-extrabold text-slate-800">{launchPlanMatrixData.totals.B}</span>
                      <span className="block text-[8px] uppercase text-slate-400">Stores</span>
                    </td>
                    <td className="p-3 text-center">
                      <span className="block text-xs font-extrabold text-slate-800">{launchPlanMatrixData.totals.C}</span>
                      <span className="block text-[8px] uppercase text-slate-400">Stores</span>
                    </td>
                    <td className="p-3 text-center border-l border-slate-200 bg-slate-100">
                      <span className="block text-xs font-extrabold text-brand-crimson">{launchPlanMatrixData.totals.overall}</span>
                      <span className="block text-[8px] uppercase text-brand-crimson/70">Stores</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Footer operations */}
      <div className="flex items-center justify-end gap-3 pt-4">
        {isSaved ? (
          <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-bold mr-4">
            <Check size={14} />
            <span>Added to Launch Plan!</span>
          </div>
        ) : null}
        <button className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 font-semibold text-xs rounded-md shadow-xs transition-all duration-200 cursor-pointer">
          Download Report
        </button>
        <button
          onClick={handleAddToList}
          className="px-4 py-2 bg-brand-crimson hover:bg-brand-crimson-dark text-white font-bold text-xs rounded-md shadow-xs transition-all duration-200 cursor-pointer"
        >
          Add to final list
        </button>
      </div>
    </div>
  );
}
