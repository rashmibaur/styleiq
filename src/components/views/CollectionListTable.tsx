import React, { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  createColumnHelper
} from '@tanstack/react-table';
import { ChevronLeft, ChevronRight, RefreshCw, Upload, Eye } from 'lucide-react';
import { collectionProducts, ProductItem } from '../../data/mockData';

// Reusable premium SVG Shoe representation
export function ShoeSvg({ color = 'currentColor', className = 'w-10 h-10' }: { color?: string; className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* High-heeled shoe sole outline */}
      <path
        d="M20,68 C22,68 35,72 48,65 C61,58 72,36 78,25 C80,21 82,18 83,18 L80,18 C78,19 72,27 61,44 C50,58 40,62 30,62 L30,76 Z"
        fill={color === '-' ? '#CBD5E1' : color === 'Jet Black' || color === 'Black' ? '#1E293B' : color === 'Ivory White' ? '#F1F5F9' : color === 'Rose Gold' ? '#FDA4AF' : color === 'Emerald Green' ? '#059669' : '#e11d48'}
        stroke="#475569"
        strokeWidth="1.5"
      />
      {/* Stiletto heel stick */}
      <path
        d="M77,26 L77,75 C77,77 75,77 74,77 C73,77 73,76 73,75 L73,26"
        stroke="#475569"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Sole platform shadow */}
      <ellipse cx="48" cy="76" rx="30" ry="4" fill="#E2E8F0" opacity="0.6" />
    </svg>
  );
}

interface CollectionListTableProps {
  onViewProductDetail: (productId: string) => void;
  onNavigateToUpload: () => void;
}

const columnHelper = createColumnHelper<ProductItem>();

export default function CollectionListTable({ onViewProductDetail, onNavigateToUpload }: CollectionListTableProps) {
  const [data, setData] = useState<ProductItem[]>(() => {
    // Add 2 completed rows to demonstrate completed state and "View analysis"
    return [
      ...collectionProducts,
      {
        id: 'WH-X39P2',
        image: 'completed_heel.png',
        color: 'Ruby Crimson',
        occasion: 'Evening Wear',
        ornamentation: 'Glitter Mesh',
        toe: 'Pointed Toe',
        heel: 'Stiletto Heel',
        performance: 'High',
        status: 'Analysing product' // We will treat it as completed if we manually render the details
      },
      {
        id: 'WH-D10F4',
        image: 'completed_loafer.png',
        color: 'Saddle Brown',
        occasion: 'Casual Wear',
        ornamentation: 'Tassel Accent',
        toe: 'Round Toe',
        heel: 'Flat Heel',
        performance: 'Mid',
        status: 'Analysing product'
      }
    ];
  });

  const columns = [
    columnHelper.accessor('image', {
      header: 'Image',
      cell: info => {
        const row = info.row.original;
        return (
          <div className="flex items-center justify-center bg-slate-50 border border-slate-100 rounded-md p-1 h-12 w-12 shadow-2xs">
            <ShoeSvg color={row.color} className="w-10 h-10" />
          </div>
        );
      }
    }),
    columnHelper.accessor('id', {
      header: 'Product ID',
      cell: info => <span className="font-bold text-slate-800 text-xs">{info.getValue()}</span>
    }),
    columnHelper.accessor('color', {
      header: 'Color',
      cell: info => <span className="text-slate-600 font-medium text-xs">{info.getValue()}</span>
    }),
    columnHelper.accessor('occasion', {
      header: 'Occasion',
      cell: info => <span className="text-slate-600 font-medium text-xs">{info.getValue()}</span>
    }),
    columnHelper.accessor('ornamentation', {
      header: 'Ornamentation',
      cell: info => <span className="text-slate-600 font-medium text-xs">{info.getValue()}</span>
    }),
    columnHelper.accessor('toe', {
      header: 'Toe',
      cell: info => <span className="text-slate-600 font-medium text-xs">{info.getValue()}</span>
    }),
    columnHelper.accessor('heel', {
      header: 'Heel',
      cell: info => <span className="text-slate-600 font-medium text-xs">{info.getValue()}</span>
    }),
    columnHelper.accessor('performance', {
      header: 'Performance indicator',
      cell: info => {
        const val = info.getValue();
        if (val === '-') return <span className="text-slate-400 font-bold text-xs">-</span>;
        
        let color = 'bg-slate-100 text-slate-600 border-slate-200';
        if (val === 'High') color = 'bg-emerald-50 text-emerald-700 border-emerald-100 font-bold';
        if (val === 'Mid') color = 'bg-blue-50 text-blue-700 border-blue-100 font-bold';
        if (val === 'Low') color = 'bg-red-50 text-red-700 border-red-100 font-bold';
        
        return (
          <span className={`px-2 py-0.5 rounded-sm border text-[10px] uppercase ${color}`}>
            {val}
          </span>
        );
      }
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: info => {
        const status = info.getValue();
        const row = info.row.original;
        
        // Custom override for completed ones
        const isCompleted = row.id === 'WH-X39P2' || row.id === 'WH-D10F4' || row.id === 'WH-A92K7';

        if (isCompleted) {
          return (
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
              <button
                onClick={() => onViewProductDetail(row.id)}
                className="text-brand-crimson hover:text-brand-crimson-dark font-bold text-xs flex items-center gap-1 hover:underline cursor-pointer"
              >
                <Eye size={12} />
                <span>View analysis</span>
              </button>
            </div>
          );
        }

        if (status === 'Extracting attributes') {
          return (
            <div className="flex items-center gap-2 text-slate-500 font-medium text-xs">
              <div className="animate-spin h-3.5 w-3.5 border-2 border-slate-300 border-t-slate-600 rounded-full"></div>
              <span>Extracting attributes</span>
            </div>
          );
        }

        return (
          <div className="flex items-center gap-2 text-brand-crimson font-medium text-xs">
            <RefreshCw size={13} className="animate-spin text-brand-crimson" />
            <span>Analysing product</span>
          </div>
        );
      }
    })
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 6
      }
    }
  });

  return (
    <div className="space-y-4">
      {/* Batch and Filters bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white border border-brand-border px-5 py-4 rounded-xl shadow-xs">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Filters:</span>
            <select className="border border-slate-200 rounded px-2.5 py-1 text-xs bg-slate-50 font-semibold text-slate-700 focus:outline-hidden cursor-pointer">
              <option>Category: Women</option>
              <option>Category: Men</option>
            </select>
            <select className="border border-slate-200 rounded px-2.5 py-1 text-xs bg-slate-50 font-semibold text-slate-700 focus:outline-hidden cursor-pointer">
              <option>Assortment: Heels</option>
              <option>Assortment: Boots</option>
              <option>Assortment: Flats</option>
            </select>
          </div>
          <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Batch:</span>
            <select className="border border-slate-200 rounded px-2.5 py-1 text-xs bg-slate-50 font-semibold text-slate-700 focus:outline-hidden cursor-pointer">
              <option>Season: Fall 26</option>
              <option>Season: Spring 26</option>
            </select>
            <select className="border border-slate-200 rounded px-2.5 py-1 text-xs bg-slate-50 font-semibold text-slate-700 focus:outline-hidden cursor-pointer">
              <option>Batch: A1234</option>
              <option>Batch: B5678</option>
            </select>
          </div>
        </div>
        <button
          onClick={onNavigateToUpload}
          className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-md shadow-2xs transition-all duration-200 cursor-pointer"
        >
          <Upload size={13} />
          <span>Upload More Images</span>
        </button>
      </div>

      {/* Main TanStack Table Box */}
      <div className="bg-white border border-brand-border rounded-xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-xs">
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id} className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200 text-left">
                  {headerGroup.headers.map(header => (
                    <th key={header.id} className="px-5 py-3.5 font-semibold">
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 bg-white">
              {table.getRowModel().rows.map(row => (
                <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="px-5 py-3">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Custom Pagination Footer Row */}
        <div className="bg-white px-5 py-3.5 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-400 font-medium">
            Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{' '}
            {Math.min(
              (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
              data.length
            )}{' '}
            of {data.length} items
          </span>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className={`p-1.5 rounded-md border border-slate-200 shadow-2xs hover:bg-slate-50 transition cursor-pointer ${
                !table.getCanPreviousPage() ? 'opacity-40 pointer-events-none' : ''
              }`}
            >
              <ChevronLeft size={14} />
            </button>
            
            {Array.from({ length: table.getPageCount() }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => table.setPageIndex(idx)}
                className={`w-7 h-7 flex items-center justify-center text-xs font-bold rounded-md transition cursor-pointer ${
                  table.getState().pagination.pageIndex === idx
                    ? 'bg-brand-crimson text-white shadow-2xs'
                    : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {idx + 1}
              </button>
            ))}

            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className={`p-1.5 rounded-md border border-slate-200 shadow-2xs hover:bg-slate-50 transition cursor-pointer ${
                !table.getCanNextPage() ? 'opacity-40 pointer-events-none' : ''
              }`}
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
