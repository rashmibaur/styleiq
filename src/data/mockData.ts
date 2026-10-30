// ─────────────────────────────────────────────────────────────
//  StyleIQ Mock Data — Trend Intelligence Tab
// ─────────────────────────────────────────────────────────────

export interface TrendPill {
  name: string;
  change: string;
  isPositive: boolean;
  isNeutral?: boolean;
}

export interface AttributeCategory {
  title: string;
  pills: TrendPill[];
}

export interface TrendData {
  assortment: TrendPill[];
  attributes: {
    color: TrendPill[];
    ornamentation: TrendPill[];
    occasion: TrendPill[];
    heelType: TrendPill[];
    toeType: TrendPill[];
  };
}

// ── Trend Intelligence: Brand & Social pills ──────────────────

export const brandTrendData: TrendData = {
  assortment: [
    { name: 'Boots',    change: '▲ 1%', isPositive: true  },
    { name: 'Loafers',  change: '▲ 5%', isPositive: true  },
    { name: 'Heels',    change: '▼ 2%', isPositive: false },
    { name: 'Sneakers', change: '▲ 9%', isPositive: true  },
  ],
  attributes: {
    color: [
      { name: 'Ocean Blue',    change: '▲ 4%', isPositive: true  },
      { name: 'Rose Gold',     change: '▲ 6%', isPositive: true  },
      { name: 'Black',         change: '▲ 2%', isPositive: true  },
      { name: 'Forest Green',  change: '▲ 5%', isPositive: true  },
    ],
    ornamentation: [
      { name: '3D Floral',    change: '▲ 2%', isPositive: true              },
      { name: 'Studded',      change: 'N/A',   isPositive: false, isNeutral: true },
      { name: 'Chain Accents',change: '▲ 1%', isPositive: true              },
      { name: 'Ankle Strap',  change: '▲ 7%', isPositive: true              },
    ],
    occasion: [
      { name: 'Evening Soiree',   change: '▲ 3%', isPositive: true },
      { name: 'Casual Getaway',   change: '▲ 2%', isPositive: true },
      { name: 'Business Meeting', change: '▲ 4%', isPositive: true },
      { name: 'Weekend Vibe',     change: '▲ 2%', isPositive: true },
    ],
    heelType: [
      { name: 'Block',      change: '▲ 2%', isPositive: true },
      { name: 'Sculptural', change: '▲ 1%', isPositive: true },
      { name: 'Kitten',     change: '▲ 3%', isPositive: true },
      { name: 'Stiletto',   change: '▲ 1%', isPositive: true },
    ],
    toeType: [
      { name: 'Square Toe', change: '▲ 3%', isPositive: true },
      { name: 'Open Toe',   change: '▲ 1%', isPositive: true },
      { name: 'Almond Toe', change: '▲ 6%', isPositive: true },
      { name: 'Roman Toe',  change: '▲ 2%', isPositive: true },
    ],
  },
};

export const socialTrendData: TrendData = {
  assortment: [
    { name: 'Boots',    change: '▲ 1%', isPositive: true  },
    { name: 'Loafers',  change: '▲ 5%', isPositive: true  },
    { name: 'Heels',    change: '▼ 2%', isPositive: false },
    { name: 'Sneakers', change: '▲ 9%', isPositive: true  },
  ],
  attributes: {
    color: [
      { name: 'Lavender',     change: '▲ 4%', isPositive: true },
      { name: 'Rose Gold',    change: '▲ 7%', isPositive: true },
      { name: 'Classic Black',change: '▲ 3%', isPositive: true },
      { name: 'Nude/Beige',   change: '▲ 5%', isPositive: true },
    ],
    ornamentation: [
      { name: '3D Floral',     change: '▲ 3%', isPositive: true              },
      { name: 'Crystal Mesh',  change: 'N/A',   isPositive: false, isNeutral: true },
      { name: 'Chain Accents', change: '▲ 1%', isPositive: true              },
      { name: 'Minimal Straps',change: '▲ 2%', isPositive: true              },
    ],
    occasion: [
      { name: 'Brunch Wear',   change: '▲ 3%', isPositive: true },
      { name: 'Resort Luxe',   change: '▲ 2%', isPositive: true },
      { name: 'Formal Office', change: '▲ 4%', isPositive: true },
      { name: 'Daily Casual',  change: '▲ 2%', isPositive: true },
    ],
    heelType: [
      { name: 'Flared Block', change: '▲ 2%', isPositive: true },
      { name: 'Sculptural',   change: '▲ 1%', isPositive: true },
      { name: 'Kitten Heel',  change: '▲ 3%', isPositive: true },
      { name: 'Stiletto',     change: '▲ 1%', isPositive: true },
    ],
    toeType: [
      { name: 'Square Toe',  change: '▲ 3%', isPositive: true },
      { name: 'Snip Toe',    change: '▲ 1%', isPositive: true },
      { name: 'Pointed Toe', change: '▲ 6%', isPositive: true },
      { name: 'Round Toe',   change: '▲ 2%', isPositive: true },
    ],
  },
};

// ── Social Media Charts ───────────────────────────────────────

export interface BrandUserActivityItem {
  name: string;
  brand: number;
  user: number;
}

export const brandVsUserActivityData: BrandUserActivityItem[] = [
  { name: 'Sneakers', brand: 12000, user: 28000 },
  { name: 'Boots',    brand:  8000, user: 19000 },
  { name: 'Sandals',  brand: 20000, user: 24000 },
  { name: 'Heels',    brand: 22000, user: 18000 },
  { name: 'Loafers',  brand:  6000, user: 20000 },
  { name: 'Mules',    brand:  4000, user:  9000 },
];

export interface SentimentItem {
  name: string;
  positive: number;
  neutral: number;
  negative: number;
}

export const sentimentByAssortmentData: SentimentItem[] = [
  { name: 'Sneakers', positive: 180, neutral: 120, negative:  40 },
  { name: 'Boots',    positive: 150, neutral: 100, negative:  60 },
  { name: 'Sandals',  positive: 210, neutral: 140, negative:  90 },
  { name: 'Heels',    positive:  90, neutral: 180, negative: 120 },
  { name: 'Loafers',  positive:  80, neutral:  60, negative:  45 },
  { name: 'Mules',    positive:  70, neutral:  45, negative:  20 },
];

// Brand-led sentiment (for "Mentions by: Brand" toggle)
export const sentimentByAssortmentBrandData: SentimentItem[] = [
  { name: 'Sneakers', positive: 220, neutral:  80, negative:  30 },
  { name: 'Boots',    positive: 130, neutral:  90, negative:  70 },
  { name: 'Sandals',  positive: 190, neutral: 100, negative:  50 },
  { name: 'Heels',    positive: 110, neutral: 130, negative:  80 },
  { name: 'Loafers',  positive:  60, neutral:  70, negative:  40 },
  { name: 'Mules',    positive:  50, neutral:  35, negative:  25 },
];

export type Sentiment = 'Positive' | 'Neutral' | 'Negative';

export interface AttributeSentimentPoint {
  x: number;        // Number of Posts
  y: number;        // Engagement %
  z: number;        // Node size
  name: string;
  category: string;
  sentiment: Sentiment;
}

export const attributeSentimentMatrixData: AttributeSentimentPoint[] = [
  { x: 120, y:  7.2, z: 20, name: 'Black',          category: 'Color',         sentiment: 'Positive' },
  { x: 260, y: 12.5, z: 25, name: 'Wedding',        category: 'Occasion',      sentiment: 'Positive' },
  { x: 310, y: 11.2, z: 24, name: 'Gold Accents',   category: 'Ornamentation', sentiment: 'Positive' },
  { x: 150, y:  9.8, z: 15, name: 'Pointy Toe',     category: 'Toe',           sentiment: 'Positive' },
  { x: 140, y: 11.8, z: 28, name: 'Party Occasion', category: 'Occasion',      sentiment: 'Positive' },
  { x: 200, y:  8.5, z: 18, name: 'Stiletto',       category: 'Heel',          sentiment: 'Neutral'  },
  { x:  90, y:  5.6, z: 12, name: 'Rose Gold',      category: 'Color',         sentiment: 'Neutral'  },
  { x: 320, y:  6.4, z: 22, name: 'Block Heel',     category: 'Heel',          sentiment: 'Neutral'  },
  { x: 280, y:  8.0, z: 16, name: 'Slip-on',        category: 'Closure',       sentiment: 'Neutral'  },
  { x: 180, y:  4.8, z: 10, name: 'Square Toe',     category: 'Toe',           sentiment: 'Negative' },
  { x: 230, y: 11.0, z: 30, name: 'Bow Detail',     category: 'Ornamentation', sentiment: 'Negative' },
];

export interface TrendingThemeItem {
  name: string;
  value: number;
  rank: number;
  category: string;
}

export const trendingThemesData: TrendingThemeItem[] = [
  { name: 'Floral Detail',    value: 58000, rank: 1, category: 'Ornamentation' },
  { name: 'Platform Soles',   value: 52000, rank: 2, category: 'Sole Type'     },
  { name: 'Pointed Toe',      value: 50000, rank: 3, category: 'Toe Type'      },
  { name: 'Metallic Finish',  value: 49000, rank: 4, category: 'Color'         },
  { name: 'Slip-on Style',    value: 48000, rank: 5, category: 'Closure'       },
  { name: 'Block Heel',       value: 44000, rank: 6, category: 'Heel Type'     },
  { name: 'Strass/Glitter',   value: 41000, rank: 7, category: 'Ornamentation' },
];

// ── Brand Insights Treemaps ───────────────────────────────────

export interface TreemapItem {
  name: string;
  size: number;
  count: string;
  percentage: string;
  [key: string]: unknown; // satisfies Recharts TreemapDataType
}


export const brandCatalogSpreadData = {
  assortmentSpread: [
    { name: 'Sneakers',   size: 380, count: '380 SKUs', percentage: '24%' },
    { name: 'Heels',      size: 280, count: '280 SKUs', percentage: '18%' },
    { name: 'Boots',      size: 250, count: '250 SKUs', percentage: '16%' },
    { name: 'Sandals',    size: 320, count: '320 SKUs', percentage: '20%' },
    { name: 'Loafers',    size: 180, count: '180 SKUs', percentage: '11%' },
    { name: 'Flip Flops', size: 120, count: '120 SKUs', percentage:  '8%' },
  ] as TreemapItem[],
  catalogByBrands: [
    { name: 'Gucci',     size: 310, count: '310 SKUs', percentage: '18%' },
    { name: 'Prada',     size: 290, count: '290 SKUs', percentage: '17%' },
    { name: 'Valentino', size: 220, count: '220 SKUs', percentage: '13%' },
    { name: 'Dior',      size: 320, count: '320 SKUs', percentage: '19%' },
    { name: 'Versace',   size: 260, count: '260 SKUs', percentage: '15%' },
    { name: 'Chanel',    size: 200, count: '200 SKUs', percentage: '12%' },
    { name: 'John Lobb', size: 100, count: '100 SKUs', percentage:  '6%' },
  ] as TreemapItem[],
};

export const newProductLaunchData = {
  catalogByAssortment: [
    { name: 'Sneakers',     size: 55, count: '55 SKUs', percentage: '25%' },
    { name: 'Sandals',      size: 29, count: '29 SKUs', percentage: '13%' },
    { name: 'Sports Shoes', size: 48, count: '48 SKUs', percentage: '22%' },
    { name: 'Heels',        size: 19, count: '19 SKUs', percentage:  '9%' },
    { name: 'Boots',        size: 33, count: '33 SKUs', percentage: '15%' },
    { name: 'Loafers',      size: 14, count: '14 SKUs', percentage:  '7%' },
    { name: 'Flip Flops',   size: 10, count: '10 SKUs', percentage:  '5%' },
  ] as TreemapItem[],
  catalogByBrands: [
    { name: 'Gucci',     size: 40, count: '40 SKUs', percentage: '20%' },
    { name: 'Dior',      size: 38, count: '38 SKUs', percentage: '19%' },
    { name: 'Prada',     size: 34, count: '34 SKUs', percentage: '17%' },
    { name: 'Valentino', size: 25, count: '25 SKUs', percentage: '12%' },
    { name: 'Versace',   size: 30, count: '30 SKUs', percentage: '15%' },
    { name: 'Chanel',    size: 22, count: '22 SKUs', percentage: '11%' },
    { name: 'John Lobb', size: 14, count: '14 SKUs', percentage:  '7%' },
  ] as TreemapItem[],
};

// ── Brand Attributes Matrix ───────────────────────────────────

export interface AttributeMatrixRow {
  color:         { name: string; pct: string };
  occasion:      { name: string; pct: string };
  ornamentation: { name: string; pct: string };
  toe:           { name: string; pct: string };
  heel:          { name: string; pct: string; isHighlighted?: boolean };
}

export const brandAttributesMatrix: AttributeMatrixRow[] = [
  { color: { name: 'Jet Black',       pct: '28%' }, occasion: { name: 'Ethnic',      pct: '30%' }, ornamentation: { name: 'Chains',        pct: '20%' }, toe: { name: 'Closed Toe', pct: '30%' }, heel: { name: 'Black Heel',    pct: '30%', isHighlighted: true  } },
  { color: { name: 'Sky Blue',        pct: '25%' }, occasion: { name: 'Resort Wear', pct: '20%' }, ornamentation: { name: '3D Flowers',    pct: '20%' }, toe: { name: 'Round Toe',  pct: '30%' }, heel: { name: 'Stiletto Heel', pct: '15%', isHighlighted: false } },
  { color: { name: 'Emerald Green',   pct: '20%' }, occasion: { name: 'Formal',      pct: '15%' }, ornamentation: { name: 'Gold Charms',   pct: '20%' }, toe: { name: 'Square Toe', pct: '20%' }, heel: { name: 'Wedge Heel',    pct: '20%', isHighlighted: false } },
  { color: { name: 'Sunset Orange',   pct: '18%' }, occasion: { name: 'Casual',      pct: '10%' }, ornamentation: { name: 'Shimmer Lace', pct: '15%' }, toe: { name: 'Open Toe',   pct: '11%' }, heel: { name: 'Platform Heel', pct: '11%', isHighlighted: false } },
  { color: { name: 'Lavender Purple', pct: '20%' }, occasion: { name: 'Festive',     pct: '25%' }, ornamentation: { name: 'Bow Details',   pct: '15%' }, toe: { name: 'Pointy Toe', pct: '15%' }, heel: { name: 'Cone Heel',     pct: '10%', isHighlighted: false } },
  { color: { name: 'Crimson Red',     pct: '10%' }, occasion: { name: 'Vintage',     pct: '22%' }, ornamentation: { name: 'Beaded Accents',pct: '20%' }, toe: { name: 'Open Toe',   pct: '15%' }, heel: { name: 'Kitten Heel',   pct: '22%', isHighlighted: false } },
];

// ── New Product Intelligence ──────────────────────────────────

export interface ProductItem {
  id: string;
  image: string;
  color: string;
  occasion: string;
  ornamentation: string;
  toe: string;
  heel: string;
  performance: string;
  status: 'Analysing product' | 'Extracting attributes';
}

export const collectionProducts: ProductItem[] = [
  { id: 'WH-A92K7', image: 'stiletto_black.png',    color: 'Jet Black',      occasion: 'Party',   ornamentation: 'Shimmer',              toe: 'Pointy Toe', heel: 'Stiletto Heel',  performance: 'High', status: 'Analysing product'    },
  { id: 'WH-Z51P8', image: 'stiletto_ivory.png',    color: 'Ivory White',    occasion: 'Wedding', ornamentation: 'Pearl Embellishment',  toe: 'Pointy Toe', heel: 'Slim Stiletto',  performance: '-',    status: 'Analysing product'    },
  { id: 'WH-L84Q3', image: 'heel_black_block.png',  color: 'Black',          occasion: 'Formal',  ornamentation: 'Minimal Stitch',       toe: 'Pointed Toe',heel: 'Block Heel',     performance: '-',    status: 'Analysing product'    },
  { id: 'WH-R73D5', image: 'stiletto_rosegold.png', color: 'Rose Gold',      occasion: 'Festive', ornamentation: 'Metallic Finish',      toe: 'Square Toe', heel: 'Stiletto Heel',  performance: '-',    status: 'Analysing product'    },
  { id: 'WH-T09V4', image: 'green_heel.png',        color: 'Emerald Green',  occasion: 'Festive', ornamentation: 'Gold Charms',          toe: 'Open Toe',   heel: 'Block Heel',     performance: '-',    status: 'Analysing product'    },
  { id: 'WH-C18N6', image: 'pink_heel.png',         color: '-',              occasion: '-',       ornamentation: '-',                    toe: '-',          heel: '-',              performance: '-',    status: 'Extracting attributes'},
  { id: 'WH-B5W42', image: 'white_heel.png',        color: '-',              occasion: '-',       ornamentation: '-',                    toe: '-',          heel: '-',              performance: '-',    status: 'Extracting attributes'},
  { id: 'WH-YQ701', image: 'red_block.png',         color: '-',              occasion: '-',       ornamentation: '-',                    toe: '-',          heel: '-',              performance: '-',    status: 'Extracting attributes'},
  { id: 'WH-E93S8', image: 'purple_wedge.png',      color: '-',              occasion: '-',       ornamentation: '-',                    toe: '-',          heel: '-',              performance: '-',    status: 'Extracting attributes'},
  { id: 'WH-R45Y8', image: 'beige_lace.png',        color: '-',              occasion: '-',       ornamentation: '-',                    toe: '-',          heel: '-',              performance: '-',    status: 'Extracting attributes'},
];

// ── Launch Intelligence ───────────────────────────────────────

export const launchPlanMatrixData = {
  rows: [
    { cluster: 'NORTH CLUSTER', A: 8, B: 4, C: 2, total: 14 },
    { cluster: 'SOUTH CLUSTER', A: 3, B: 7, C: 4, total: 14 },
    { cluster: 'EAST CLUSTER',  A: 1, B: 3, C: 8, total: 12 },
    { cluster: 'WEST CLUSTER',  A: 9, B: 5, C: 2, total: 16 },
  ],
  totals: { A: 21, B: 19, C: 16, overall: 56 },
};

export const demandForecastSummaryData = [
  { month: 'Apr', lower: 3000, actual: 3300, upper: 3800 },
  { month: 'May', lower: 3300, actual: 3950, upper: 4400 },
  { month: 'Jun', lower: 3600, upper: 5000 },
];
