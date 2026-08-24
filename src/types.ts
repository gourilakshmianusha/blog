export interface ImageSummary {
  description: string;
  prompt: string;
  visualTheme: string;
  aspectRatio: string;
  suggestedAltText: string;
  imageUrl: string;
}

export interface SentimentAnalysis {
  score: number; // -1.0 to 1.0
  percentage: number; // 0 to 100
  label: 'Strongly Positive' | 'Positive' | 'Neutral' | 'Analytical/Objective' | 'Cautious/Critical';
  tone: string;
  subjectivity: number; // 0 to 1
  emotionalDrivers: string[];
  explanation: string;
}

export interface BacklinkItem {
  sourceName: string;
  url: string;
  anchorText: string;
  type: 'External Authority' | 'Canonical Source' | 'Internal Reference' | 'Data Citation' | 'Research Study';
  domainAuthorityEst?: string;
  contextSnippet?: string;
}

export interface CuratedBlogItem {
  id: string;
  title: string;
  author: string;
  publishDate: string;
  readTime: string;
  category: string;
  url: string;
  summary: string;
  keyTakeaways: string[];
  imageSummary: ImageSummary;
  sentimentAnalysis: SentimentAnalysis;
  backlinks: BacklinkItem[];
  suggestedFocusKeywords: string[];
}

export interface WebsiteAnalysisResult {
  websiteUrl: string;
  domain: string;
  siteTitle: string;
  siteDescription: string;
  analyzedAt: string;
  totalArticles: number;
  overallSentiment: {
    averageScore: number;
    dominantTone: string;
    positiveCount: number;
    neutralCount: number;
    criticalCount: number;
  };
  blogs: CuratedBlogItem[];
}

export interface CompleteBlogData {
  title: string;
  focusKeyword: string;
  metaDescription: string;
  slug: string;
  targetAudience: string;
  tone: string;
  estimatedReadTime: string;
  wordCount: number;
  firstParagraph: string;
  tableOfContents: string[];
  contentMarkdown: string;
  keyTakeaways: string[];
  backlinks: BacklinkItem[];
  faq: Array<{ question: string; answer: string }>;
  featuredImage: {
    prompt: string;
    altText: string;
    caption: string;
    imageUrl?: string;
  };
  seoChecklist: {
    keywordInTitle: boolean;
    keywordInMetaDescription: boolean;
    keywordInFirstSentence: boolean;
    keywordDensityPercent: number;
    readabilityScore: string;
    headingCount: { h2: number; h3: number };
    totalBacklinks: number;
  };
  generatedAt: string;
}
