import React, { useState } from 'react';
import CollectionListTable from './CollectionListTable';
import ImageUploadWizard from './ImageUploadWizard';
import ProductAttributeSelection from './ProductAttributeSelection';

interface NewProductIntelligenceProps {
  onNavigateToLaunch: (productId: string) => void;
}

export default function NewProductIntelligence({ onNavigateToLaunch }: NewProductIntelligenceProps) {
  const [activeSubView, setActiveSubView] = useState<'list' | 'upload' | 'detail'>('list');
  const [selectedProductId, setSelectedProductId] = useState<string>('WH-A92K7');

  const handleViewDetail = (productId: string) => {
    setSelectedProductId(productId);
    setActiveSubView('detail');
  };

  if (activeSubView === 'detail') {
    return (
      <ProductAttributeSelection
        productId={selectedProductId}
        onBack={() => setActiveSubView('list')}
        onConfirmSelection={() => onNavigateToLaunch(selectedProductId)}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* View Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">New Product Intelligence</h1>
          <p className="text-xs text-slate-400 mt-1">Review and analyze your product catalogue across key performance indicators and potential.</p>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="border-b border-slate-200 flex gap-4 pt-2">
        <button
          onClick={() => setActiveSubView('upload')}
          className={`pb-2.5 text-xs font-bold uppercase tracking-wider border-b-2 cursor-pointer transition-all ${
            activeSubView === 'upload'
              ? 'border-brand-crimson text-brand-crimson'
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          Upload Images
        </button>
        <button
          onClick={() => setActiveSubView('list')}
          className={`pb-2.5 text-xs font-bold uppercase tracking-wider border-b-2 cursor-pointer transition-all ${
            activeSubView === 'list'
              ? 'border-brand-crimson text-brand-crimson'
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          New Product List
        </button>
      </div>

      {/* Sub-view Rendering */}
      <div>
        {activeSubView === 'list' ? (
          <CollectionListTable
            onViewProductDetail={handleViewDetail}
            onNavigateToUpload={() => setActiveSubView('upload')}
          />
        ) : (
          <ImageUploadWizard
            onProceed={() => setActiveSubView('list')}
            onNavigateToList={() => setActiveSubView('list')}
          />
        )}
      </div>
    </div>
  );
}
