import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { AlertTriangle, CheckCircle, FileText, Info, Loader2, Trash2, UploadCloud } from 'lucide-react';

interface ImageUploadWizardProps {
  onProceed: () => void;
  onNavigateToList: () => void;
}

interface UploadFile {
  name: string;
  size: number;
  status: 'pending' | 'processing' | 'done' | 'error';
  errorMsg?: string;
}

export default function ImageUploadWizard({ onProceed, onNavigateToList }: ImageUploadWizardProps) {
  const [files, setFiles] = useState<UploadFile[]>([
    { name: 'heel_stiletto_black.png', size: 1024 * 342, status: 'done' },
    { name: 'ivory_wedding_pump.png', size: 1024 * 512, status: 'done' },
    { name: 'block_heel_sandal.jpg', size: 1024 * 289, status: 'done' },
    { name: 'rosegold_party_heel.png', size: 1024 * 412, status: 'done' },
    { name: 'emerald_green_stiletto.png', size: 1024 * 612, status: 'processing' },
    { name: 'casual_flat_slide.jpg', size: 1024 * 188, status: 'pending' },
    { name: 'incorrect_angle_photo.heic', size: 1024 * 1024 * 2.4, status: 'error', errorMsg: 'Incorrect file format (HEIC not supported)' },
    { name: 'blurry_heel_preview.png', size: 1024 * 90, status: 'error', errorMsg: 'Low resolution/blurry image (Min 800x800px)' }
  ]);

  const [notes, setNotes] = useState('');
  const [progress, setProgress] = useState(4); // 4 out of 8 processed

  // Simulate extraction progress ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setFiles(prev => {
        const next = [...prev];
        const processingIdx = next.findIndex(f => f.status === 'processing');
        if (processingIdx !== -1) {
          next[processingIdx].status = 'done';
          setProgress(p => Math.min(p + 1, 6)); // We have 6 valid files
        }
        const pendingIdx = next.findIndex(f => f.status === 'pending');
        if (pendingIdx !== -1) {
          next[pendingIdx].status = 'processing';
        }
        return next;
      });
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const onDrop = (acceptedFiles: File[]) => {
    const newUploads: UploadFile[] = acceptedFiles.map(file => ({
      name: file.name,
      size: file.size,
      status: 'pending'
    }));
    setFiles(prev => [...prev, ...newUploads]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png']
    }
  });

  const handleDeleteFile = (idx: number) => {
    setFiles(prev => prev.filter((_, i) => i !== idx));
  };

  const errorFiles = files.filter(f => f.status === 'error');
  const validFiles = files.filter(f => f.status !== 'error');

  return (
    <div className="space-y-6">
      {/* Header bar and filters */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white border border-brand-border px-5 py-4 rounded-xl shadow-xs">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Filters:</span>
            <select className="border border-slate-200 rounded px-2.5 py-1 text-xs bg-slate-50 font-semibold text-slate-700 focus:outline-hidden cursor-pointer">
              <option>Category: Women</option>
            </select>
            <select className="border border-slate-200 rounded px-2.5 py-1 text-xs bg-slate-50 font-semibold text-slate-700 focus:outline-hidden cursor-pointer">
              <option>Assortment: Heels</option>
            </select>
          </div>
          <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Batch:</span>
            <select className="border border-slate-200 rounded px-2.5 py-1 text-xs bg-slate-50 font-semibold text-slate-700 focus:outline-hidden cursor-pointer">
              <option>Season: Fall 26</option>
            </select>
            <select className="border border-slate-200 rounded px-2.5 py-1 text-xs bg-slate-50 font-semibold text-slate-700 focus:outline-hidden cursor-pointer">
              <option>Batch: A1234</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN: Validation rules & metadata */}
        <div className="lg:col-span-1 space-y-6">
          {/* Validation Rules */}
          <div className="bg-white border border-brand-border rounded-xl p-5 shadow-xs space-y-4">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wide border-b border-slate-100 pb-2 flex items-center gap-1.5">
              <Info size={14} className="text-brand-crimson" />
              Validation Guidelines
            </h3>
            <ul className="text-xs text-slate-500 space-y-2.5 list-disc pl-4 leading-relaxed">
              <li>Upload only high-quality images of single footwear items.</li>
              <li>Maintain a neutral, uncluttered background (preferably white or light grey).</li>
              <li>Supported resolutions: Minimum 800x800px for best attribute extraction.</li>
              <li>Do not include human models, text overlays, or complex watermark branding.</li>
              <li>Supported file types: PNG, JPG, JPEG (Max 10MB per file).</li>
            </ul>
          </div>

          {/* Batch description form fields */}
          <div className="bg-white border border-brand-border rounded-xl p-5 shadow-xs space-y-4">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wide border-b border-slate-100 pb-2">Batch Metadata</h3>
            
            <div className="space-y-3.5">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Season Selection</label>
                <input
                  type="text"
                  value="Season: Fall 26"
                  disabled
                  className="w-full border border-slate-200 bg-slate-50 rounded px-2.5 py-1.5 text-xs text-slate-500 font-semibold"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Batch Identifier</label>
                <input
                  type="text"
                  value="Batch: A1234"
                  disabled
                  className="w-full border border-slate-200 bg-slate-50 rounded px-2.5 py-1.5 text-xs text-slate-500 font-semibold"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Additional Notes</label>
                <textarea
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Enter notes about style variants, photography studio source or batch guidelines..."
                  rows={3}
                  className="w-full border border-slate-200 rounded px-2.5 py-1.5 text-xs focus:outline-hidden focus:border-brand-crimson font-medium text-slate-700 placeholder:text-slate-400"
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Drag zone and Queue status */}
        <div className="lg:col-span-2 space-y-6">
          {/* Dashed Drag zone */}
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 ${
              isDragActive
                ? 'border-brand-crimson bg-brand-crimson/5'
                : 'border-slate-300 hover:border-slate-400 bg-white'
            }`}
          >
            <input {...getInputProps()} />
            <UploadCloud size={40} className={isDragActive ? 'text-brand-crimson' : 'text-slate-400'} />
            <h4 className="mt-3 text-sm font-bold text-slate-700">Drag & drop files here or click to browse</h4>
            <p className="mt-1 text-xs text-slate-400">Supported formats: JPG, PNG (Max 10MB per file)</p>
          </div>

          {/* Queue & warning alerts */}
          <div className="bg-white border border-brand-border rounded-xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-800">Batch Processing Queue</h3>
                <p className="text-[10px] text-slate-400 mt-1">Real-time status of shoe image parsing & validation</p>
              </div>
              
              <div className="text-right">
                <span className="text-xs font-bold text-slate-700">{progress}/{validFiles.length} images processed</span>
                <div className="text-[9px] font-semibold text-brand-crimson uppercase tracking-wide flex items-center gap-1 mt-0.5 justify-end">
                  <Loader2 size={10} className="animate-spin text-brand-crimson" />
                  <span>Parsing batch...</span>
                </div>
              </div>
            </div>

            {/* Error alerts warning */}
            {errorFiles.length > 0 && (
              <div className="bg-red-50 border border-red-100 text-red-800 rounded-lg p-3.5 text-xs flex items-start gap-3">
                <AlertTriangle size={16} className="text-red-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-bold text-red-900 block">{errorFiles.length} images incorrect format or failed validation</span>
                  <span className="block text-red-700 text-[11px]">These files will not be processed. Hover over files to remove or replace them.</span>
                </div>
              </div>
            )}

            {/* File List details */}
            <div className="max-h-60 overflow-y-auto divide-y divide-slate-100 pr-1 space-y-1.5">
              {files.map((file, idx) => {
                let badge = 'text-slate-400';
                let bgCircle = 'bg-slate-100';
                
                if (file.status === 'done') {
                  badge = 'text-emerald-600 bg-emerald-50 border-emerald-100';
                  bgCircle = 'bg-emerald-100 text-emerald-700';
                } else if (file.status === 'processing') {
                  badge = 'text-brand-crimson bg-red-50 border-red-100';
                  bgCircle = 'bg-red-100 text-brand-crimson';
                } else if (file.status === 'error') {
                  badge = 'text-red-600 bg-red-50 border-red-100';
                  bgCircle = 'bg-red-100 text-red-600';
                }

                return (
                  <div key={idx} className="flex items-center justify-between py-2 text-xs hover:bg-slate-50 rounded px-2 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center ${bgCircle} shrink-0`}>
                        <FileText size={14} />
                      </div>
                      <div className="text-left">
                        <span className={`block font-bold truncate max-w-xs md:max-w-md ${file.status === 'error' ? 'text-red-700' : 'text-slate-700'}`}>
                          {file.name}
                        </span>
                        <span className="block text-[10px] text-slate-400">{(file.size / 1024).toFixed(0)} KB</span>
                        {file.errorMsg && (
                          <span className="block text-[10px] text-red-500 font-medium">{file.errorMsg}</span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-0.5 rounded-sm border text-[9px] uppercase font-bold tracking-wide ${badge}`}>
                        {file.status === 'done' ? (
                          'Processed'
                        ) : file.status === 'processing' ? (
                          'Extracting...'
                        ) : file.status === 'error' ? (
                          'Failed'
                        ) : (
                          'Pending'
                        )}
                      </span>
                      <button
                        onClick={() => handleDeleteFile(idx)}
                        className="p-1 hover:bg-slate-100 text-slate-400 hover:text-red-500 rounded-md cursor-pointer transition"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Progress bar */}
            <div className="pt-2">
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-crimson rounded-full transition-all duration-500"
                  style={{ width: `${(progress / validFiles.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer operations */}
      <div className="flex items-center justify-end gap-3 pt-4">
        <button
          onClick={onNavigateToList}
          className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 font-semibold text-xs rounded-md shadow-xs transition-all duration-200 cursor-pointer"
        >
          Cancel Upload
        </button>
        <button
          onClick={onProceed}
          className="px-4 py-2 bg-brand-crimson hover:bg-brand-crimson-dark text-white font-bold text-xs rounded-md shadow-xs transition-all duration-200 cursor-pointer"
        >
          Proceed to New Product List
        </button>
      </div>
    </div>
  );
}
