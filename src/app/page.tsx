"use client";

import { useState } from 'react';
import Shell from '@/components/layout/Shell';
import TrendIntelligence from '@/components/views/TrendIntelligence';
import NewProductIntelligence from '@/components/views/NewProductIntelligence';
import LaunchIntelligence from '@/components/views/LaunchIntelligence';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'trend' | 'new-product' | 'launch'>('trend');
  const [selectedProductId, setSelectedProductId] = useState<string>('WH-A92K7');

  const handleNavigateToLaunch = (productId: string) => {
    setSelectedProductId(productId);
    setActiveTab('launch');
  };

  return (
    <Shell activeTab={activeTab} setActiveTab={setActiveTab}>
      {activeTab === 'trend' && <TrendIntelligence />}
      {activeTab === 'new-product' && (
        <NewProductIntelligence onNavigateToLaunch={handleNavigateToLaunch} />
      )}
      {activeTab === 'launch' && (
        <LaunchIntelligence
          productId={selectedProductId}
          onBack={() => setActiveTab('new-product')}
        />
      )}
    </Shell>
  );
}
