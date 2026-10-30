import React, { useState } from 'react';
import { ArrowLeft, Check, Sparkles, AlertCircle } from 'lucide-react';
import { ShoeSvg } from './CollectionListTable';

interface ProductAttributeSelectionProps {
  productId: string;
  onBack: () => void;
  onConfirmSelection: () => void;
}

export default function ProductAttributeSelection({ productId, onBack, onConfirmSelection }: ProductAttributeSelectionProps) {
  // Dropdown states for attributes configuration
  const [color, setColor] = useState('Black');
  const [occasion, setOccasion] = useState('Party wear');
  const [ornamentation, setOrnamentation] = useState('Shimmer');
  const [toeType, setToeType] = useState('Round toe');
  const [heelType, setHeelType] = useState('Stiletto heel');
  const [closureType, setClosureType] = useState('Slip on');
  const [printPattern, setPrintPattern] = useState('Solid');
  const [tech, setTech] = useState('Arch support');

  // Interactive submit feedback
  const [isSaved, setIsSaved] = useState(false);

  const handleConfirm = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const renderGrowthPills = (pills: string[], activePill: string) => {
    return (
      <div className="flex flex-wrap gap-1.5 pt-1">
        {pills.map((pill, idx) => (
          <span
            key={idx}
            className={`px-2 py-0.5 rounded text-[10px] font-medium border ${
              pill.toLowerCase() === activePill.toLowerCase()
                ? 'bg-brand-crimson/10 border-brand-crimson text-brand-crimson font-bold'
                : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
            }`}
          >
            {pill}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Back button and title */}
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
        {/* LEFT COLUMN: Image and Core Attributes */}
        <div className="lg:col-span-1 space-y-6">
          {/* Performance Indicator Card */}
          <div className="bg-white border border-brand-border rounded-xl p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Performance Indicator</span>
              <span className="text-xs font-bold text-emerald-600">HIGH PERFORMANCE</span>
            </div>
            
            {/* Horizontal Gauge Bar */}
            <div className="relative pt-2">
              <div className="h-2 w-full bg-slate-100 rounded-full flex overflow-hidden">
                <div className="w-1/3 bg-red-200"></div>
                <div className="w-1/3 bg-yellow-200"></div>
                <div className="w-1/3 bg-emerald-200"></div>
              </div>
              {/* Slider thumb position indicator */}
              <div className="absolute top-1 right-[15%] h-4 w-1 bg-slate-800 rounded-xs"></div>
            </div>
            <div className="flex justify-between text-[9px] text-slate-400 font-bold uppercase mt-2">
              <span>Low</span>
              <span>Medium</span>
              <span>High</span>
            </div>
          </div>

          {/* Large Image Box */}
          <div className="bg-white border border-brand-border rounded-xl p-6 shadow-xs flex flex-col items-center justify-center relative min-h-72">
            <ShoeSvg color={color} className="w-48 h-48 drop-shadow-md text-slate-800" />
            
            {/* Category / Assortment pill cards */}
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

          {/* Product Attributes list */}
          <div className="bg-white border border-brand-border rounded-xl p-5 shadow-xs space-y-4">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wide border-b border-slate-100 pb-2">Product attributes</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="block text-[9px] text-slate-400 font-bold uppercase">Color</span>
                <span className="text-xs font-semibold text-slate-700">{color}</span>
              </div>
              <div>
                <span className="block text-[9px] text-slate-400 font-bold uppercase">Occasion</span>
                <span className="text-xs font-semibold text-slate-700">{occasion}</span>
              </div>
              <div>
                <span className="block text-[9px] text-slate-400 font-bold uppercase">Ornamentation</span>
                <span className="text-xs font-semibold text-slate-700">{ornamentation}</span>
              </div>
              <div>
                <span className="block text-[9px] text-slate-400 font-bold uppercase">Toe Type</span>
                <span className="text-xs font-semibold text-slate-700">{toeType}</span>
              </div>
              <div>
                <span className="block text-[9px] text-slate-400 font-bold uppercase">Heel Type</span>
                <span className="text-xs font-semibold text-slate-700">{heelType}</span>
              </div>
              <div>
                <span className="block text-[9px] text-slate-400 font-bold uppercase">Closure Type</span>
                <span className="text-xs font-semibold text-slate-700">{closureType}</span>
              </div>
              <div>
                <span className="block text-[9px] text-slate-400 font-bold uppercase">Print/ Pattern</span>
                <span className="text-xs font-semibold text-slate-700">{printPattern}</span>
              </div>
              <div>
                <span className="block text-[9px] text-slate-400 font-bold uppercase">Tech</span>
                <span className="text-xs font-semibold text-slate-700">{tech}</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Growing Attributes & Forms */}
        <div className="lg:col-span-2 space-y-6">
          {/* Growing Attributes Comparisons */}
          <div className="bg-white border border-brand-border rounded-xl p-5 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-800">Growing Attributes</h3>
                <p className="text-[10px] text-slate-400">Growing attributes based on the category & assortment</p>
              </div>
              <select className="border border-slate-200 rounded px-2 py-1 text-[11px] bg-slate-50 font-semibold text-slate-700 focus:outline-hidden cursor-pointer">
                <option>Time: 1 Month</option>
                <option>Time: 3 Month</option>
              </select>
            </div>

            {/* Social Media Attributes list */}
            <div className="space-y-3.5">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-crimson"></span>
                Growing attributes from social media
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Color</span>
                  {renderGrowthPills(['Jet Black', 'Grey', 'Plum', 'Blush', 'Navy'], color)}
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Ornamentation</span>
                  {renderGrowthPills(['Rhinestone', 'Shimmer', 'Pearl', 'Metallic charms', 'Sparkle charms'], ornamentation)}
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Occasion</span>
                  {renderGrowthPills(['Formal', 'Festive', 'Party', 'Cocktail', 'Evening'], occasion)}
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Toe type</span>
                  {renderGrowthPills(['Pointed toe', 'Open toe', 'Tapered toe'], 'Pointed toe')}
                </div>
                <div className="space-y-1 md:col-span-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Heel type</span>
                  {renderGrowthPills(['Kitten heel', 'Slim stiletto', 'High block', 'Flared heel'], heelType)}
                </div>
              </div>
            </div>

            {/* Brands Attributes list */}
            <div className="border-t border-slate-100 pt-4 space-y-3.5">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-400"></span>
                  Growing attributes from BRANDS
                </h4>
                <select className="border border-slate-200 rounded px-1.5 py-0.5 text-[10px] bg-slate-50 font-semibold text-slate-500 focus:outline-hidden cursor-pointer">
                  <option>Brands: 5 brands</option>
                  <option>Brands: All brands</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Color</span>
                  {renderGrowthPills(['Jet Black', 'Grey', 'Plum', 'Blush', 'Navy'], color)}
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Ornamentation</span>
                  {renderGrowthPills(['Rhinestone', 'Shimmer', 'Pearl', 'Metallic charms', 'Sparkle charms'], ornamentation)}
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Occasion</span>
                  {renderGrowthPills(['Formal', 'Festive', 'Party', 'Cocktail', 'Evening'], occasion)}
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Toe type</span>
                  {renderGrowthPills(['Pointed toe', 'Open toe', 'Tapered toe'], 'Pointed toe')}
                </div>
                <div className="space-y-1 md:col-span-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Heel type</span>
                  {renderGrowthPills(['Kitten heel', 'Slim stiletto', 'High block', 'Flared heel'], heelType)}
                </div>
              </div>
            </div>
          </div>

          {/* Configure Attributes Card */}
          <div className="bg-white border border-brand-border rounded-xl p-5 shadow-xs space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-800">Configure Product Attributes</h3>
              <p className="text-[10px] text-slate-400 mt-1">Select attributes from dropdown to view changes in sales intelligence, estimated market performance & social media trend score</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-400 uppercase">Color</label>
                <select value={color} onChange={e => setColor(e.target.value)} className="w-full border border-slate-200 rounded px-2 py-1.5 text-xs bg-slate-50 font-medium text-slate-700 cursor-pointer">
                  <option value="Black">Black</option>
                  <option value="Jet Black">Jet Black</option>
                  <option value="Ivory White">Ivory White</option>
                  <option value="Rose Gold">Rose Gold</option>
                  <option value="Emerald Green">Emerald Green</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-400 uppercase">Occasion</label>
                <select value={occasion} onChange={e => setOccasion(e.target.value)} className="w-full border border-slate-200 rounded px-2 py-1.5 text-xs bg-slate-50 font-medium text-slate-700 cursor-pointer">
                  <option value="Party wear">Party wear</option>
                  <option value="Wedding">Wedding</option>
                  <option value="Formal">Formal</option>
                  <option value="Festive">Festive</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-400 uppercase">Ornamentation</label>
                <select value={ornamentation} onChange={e => setOrnamentation(e.target.value)} className="w-full border border-slate-200 rounded px-2 py-1.5 text-xs bg-slate-50 font-medium text-slate-700 cursor-pointer">
                  <option value="Shimmer">Shimmer</option>
                  <option value="Pearl Embellishment">Pearl Embellishment</option>
                  <option value="Minimal Stitch">Minimal Stitch</option>
                  <option value="Metallic Finish">Metallic Finish</option>
                  <option value="Gold Charms">Gold Charms</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-400 uppercase">Toe Type</label>
                <select value={toeType} onChange={e => setToeType(e.target.value)} className="w-full border border-slate-200 rounded px-2 py-1.5 text-xs bg-slate-50 font-medium text-slate-700 cursor-pointer">
                  <option value="Round toe">Round toe</option>
                  <option value="Pointed toe">Pointed toe</option>
                  <option value="Open toe">Open toe</option>
                  <option value="Square toe">Square toe</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-400 uppercase">Heel Type</label>
                <select value={heelType} onChange={e => setHeelType(e.target.value)} className="w-full border border-slate-200 rounded px-2 py-1.5 text-xs bg-slate-50 font-medium text-slate-700 cursor-pointer">
                  <option value="Stiletto heel">Stiletto heel</option>
                  <option value="Slim stiletto">Slim stiletto</option>
                  <option value="Block heel">Block heel</option>
                  <option value="Kitten heel">Kitten heel</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-400 uppercase">Closure Type</label>
                <select value={closureType} onChange={e => setClosureType(e.target.value)} className="w-full border border-slate-200 rounded px-2 py-1.5 text-xs bg-slate-50 font-medium text-slate-700 cursor-pointer">
                  <option value="Slip on">Slip on</option>
                  <option value="Buckle">Buckle</option>
                  <option value="Lace up">Lace up</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-400 uppercase">Print/ Pattern</label>
                <select value={printPattern} onChange={e => setPrintPattern(e.target.value)} className="w-full border border-slate-200 rounded px-2 py-1.5 text-xs bg-slate-50 font-medium text-slate-700 cursor-pointer">
                  <option value="Solid">Solid</option>
                  <option value="Print">Print</option>
                  <option value="Pattern">Pattern</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-400 uppercase">Tech</label>
                <select value={tech} onChange={e => setTech(e.target.value)} className="w-full border border-slate-200 rounded px-2 py-1.5 text-xs bg-slate-50 font-medium text-slate-700 cursor-pointer">
                  <option value="Arch support">Arch support</option>
                  <option value="Cushioned">Cushioned</option>
                  <option value="Anti-slip">Anti-slip</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              {isSaved ? (
                <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-bold">
                  <Check size={14} />
                  <span>Attributes Selected Successfully!</span>
                </div>
              ) : (
                <div></div>
              )}
              <button
                onClick={handleConfirm}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-md shadow-xs transition duration-200 cursor-pointer"
              >
                Confirm attribute selection
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SALES INTELLIGENCE & SIMILAR PRODUCTS SECTION */}
      <div className="bg-emerald-50/40 border border-emerald-100 rounded-xl p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-emerald-800 flex items-center gap-1.5">
              <Sparkles size={16} className="text-emerald-600" />
              Sales Intelligence & Similar Products
            </h3>
            <p className="text-[10px] text-emerald-700 mt-1">Similar products based on the chosen attributes</p>
          </div>
          <span className="text-[10px] bg-emerald-100 border border-emerald-200 text-emerald-800 font-bold px-2 py-0.5 rounded-sm">
            Results based on attributes selected
          </span>
        </div>

        {/* Similar items grids */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs flex flex-col space-y-3">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">Midnight Spark Stiletto</span>
                <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-sm bg-emerald-50 text-emerald-600 border border-emerald-100">
                  HIGH PERFORMING
                </span>
              </div>
              <span className="text-[9px] text-slate-400 font-bold uppercase">GLM-ST-1021</span>
            </div>

            <div className="flex items-center gap-2 border-y border-slate-100 py-2">
              <span className="text-[9px] font-bold text-blue-700 uppercase bg-blue-50 px-1.5 py-0.5 rounded-sm">METRO</span>
            </div>

            <div className="flex flex-wrap gap-1 text-[9px] text-slate-500 font-semibold uppercase">
              <span className="bg-slate-50 border border-slate-100 rounded-xs px-1.5 py-0.5">Color: Jet Black</span>
              <span className="bg-slate-50 border border-slate-100 rounded-xs px-1.5 py-0.5">Ornamentation: Micro glitter</span>
              <span className="bg-slate-50 border border-slate-100 rounded-xs px-1.5 py-0.5">Toe type: Pointy Toe</span>
              <span className="bg-slate-50 border border-slate-100 rounded-xs px-1.5 py-0.5">Heel type: Stiletto Heel</span>
              <span className="bg-slate-50 border border-slate-100 rounded-xs px-1.5 py-0.5">Occasion: Formal</span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1 border-t border-slate-100 text-left">
              <div>
                <span className="block text-[9px] text-slate-400 uppercase">Rate of Sales</span>
                <span className="text-[11px] font-bold text-slate-700">4.8 units/day</span>
              </div>
              <div>
                <span className="block text-[9px] text-slate-400 uppercase">Sales Volume</span>
                <span className="text-[11px] font-bold text-slate-700">1,440 units/mo</span>
              </div>
              <div>
                <span className="block text-[9px] text-slate-400 uppercase">Last Launch</span>
                <span className="text-[11px] font-bold text-slate-700">15 Oct 2025</span>
              </div>
              <div>
                <span className="block text-[9px] text-slate-400 uppercase">Price Point</span>
                <span className="text-[11px] font-bold text-slate-700">Rs. 2300</span>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs flex flex-col space-y-3">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">Noir Shimmer Pump</span>
                <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-sm bg-emerald-50 text-emerald-600 border border-emerald-100">
                  HIGH PERFORMING
                </span>
              </div>
              <span className="text-[9px] text-slate-400 font-bold uppercase">GLM-PM-7844</span>
            </div>

            <div className="flex items-center gap-2 border-y border-slate-100 py-2">
              <span className="text-[9px] font-bold text-emerald-700 uppercase bg-emerald-50 px-1.5 py-0.5 rounded-sm">MOCHI</span>
            </div>

            <div className="flex flex-wrap gap-1 text-[9px] text-slate-500 font-semibold uppercase">
              <span className="bg-slate-50 border border-slate-100 rounded-xs px-1.5 py-0.5">Color: Charcoal Black</span>
              <span className="bg-slate-50 border border-slate-100 rounded-xs px-1.5 py-0.5">Ornamentation: Shimmer</span>
              <span className="bg-slate-50 border border-slate-100 rounded-xs px-1.5 py-0.5">Toe type: Pointy Toe</span>
              <span className="bg-slate-50 border border-slate-100 rounded-xs px-1.5 py-0.5">Heel type: Stiletto Heel</span>
              <span className="bg-slate-50 border border-slate-100 rounded-xs px-1.5 py-0.5">Occasion: Party</span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1 border-t border-slate-100 text-left">
              <div>
                <span className="block text-[9px] text-slate-400 uppercase">Rate of Sales</span>
                <span className="text-[11px] font-bold text-slate-700">3.5 units/day</span>
              </div>
              <div>
                <span className="block text-[9px] text-slate-400 uppercase">Sales Volume</span>
                <span className="text-[11px] font-bold text-slate-700">1,050 /mo</span>
              </div>
              <div>
                <span className="block text-[9px] text-slate-400 uppercase">Last Launch</span>
                <span className="text-[11px] font-bold text-slate-700">23 Nov 2025</span>
              </div>
              <div>
                <span className="block text-[9px] text-slate-400 uppercase">Price Point</span>
                <span className="text-[11px] font-bold text-slate-700">Rs. 1800</span>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs flex flex-col space-y-3">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">Emerald Sky Loafer</span>
                <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-sm bg-blue-50 text-blue-600 border border-blue-100">
                  MID PERFORMING
                </span>
              </div>
              <span className="text-[9px] text-slate-400 font-bold uppercase">GLM-LI-7889</span>
            </div>

            <div className="flex items-center gap-2 border-y border-slate-100 py-2">
              <span className="text-[9px] font-bold text-blue-700 uppercase bg-blue-50 px-1.5 py-0.5 rounded-sm">METRO</span>
            </div>

            <div className="flex flex-wrap gap-1 text-[9px] text-slate-500 font-semibold uppercase">
              <span className="bg-slate-50 border border-slate-100 rounded-xs px-1.5 py-0.5">Color: Emerald Green</span>
              <span className="bg-slate-50 border border-slate-100 rounded-xs px-1.5 py-0.5">Ornamentation: Gold buckle</span>
              <span className="bg-slate-50 border border-slate-100 rounded-xs px-1.5 py-0.5">Toe type: Square Toe</span>
              <span className="bg-slate-50 border border-slate-100 rounded-xs px-1.5 py-0.5">Heel type: Flat Heel</span>
              <span className="bg-slate-50 border border-slate-100 rounded-xs px-1.5 py-0.5">Occasion: Casual</span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1 border-t border-slate-100 text-left">
              <div>
                <span className="block text-[9px] text-slate-400 uppercase">Rate of Sales</span>
                <span className="text-[11px] font-bold text-slate-700">5.2 units/day</span>
              </div>
              <div>
                <span className="block text-[9px] text-slate-400 uppercase">Sales Volume</span>
                <span className="text-[11px] font-bold text-slate-700">1,560 /mo</span>
              </div>
              <div>
                <span className="block text-[9px] text-slate-400 uppercase">Last Launch</span>
                <span className="text-[11px] font-bold text-slate-700">05 Sep 2025</span>
              </div>
              <div>
                <span className="block text-[9px] text-slate-400 uppercase">Price Point</span>
                <span className="text-[11px] font-bold text-slate-700">Rs. 2500</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Performance block inside sales intelligence */}
        <div className="bg-white border border-slate-100 p-4 rounded-xl flex items-center justify-between shadow-2xs">
          <div className="flex-1 max-w-md">
            <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Product Performance</span>
            <span className="text-[11px] text-slate-500">Estimated performance of configured item based on attributes selected</span>
            <div className="relative pt-3">
              <div className="h-1.5 w-full bg-slate-100 rounded-full flex overflow-hidden">
                <div className="w-1/3 bg-red-200"></div>
                <div className="w-1/3 bg-yellow-200"></div>
                <div className="w-1/3 bg-emerald-200"></div>
              </div>
              {/* Slider thumb */}
              <div className="absolute top-2 right-[20%] h-3.5 w-1 bg-slate-800"></div>
            </div>
            <div className="flex justify-between text-[8px] text-slate-400 font-bold uppercase mt-1">
              <span>Low</span>
              <span>Medium</span>
              <span>High</span>
            </div>
          </div>
          <div className="text-right">
            <span className="block text-[9px] text-slate-400 font-bold uppercase">Estimated Performance</span>
            <span className="text-sm font-bold text-emerald-600">HIGH PERFORMANCE</span>
          </div>
        </div>
      </div>

      {/* Footer view actions */}
      <div className="flex items-center justify-end gap-3 pt-4">
        <button className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 font-semibold text-xs rounded-md shadow-xs transition-all duration-200 cursor-pointer">
          Download Report
        </button>
        <button
          onClick={onConfirmSelection}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-md shadow-xs transition-all duration-200 cursor-pointer"
        >
          Confirm SKU Selection
        </button>
      </div>
    </div>
  );
}
