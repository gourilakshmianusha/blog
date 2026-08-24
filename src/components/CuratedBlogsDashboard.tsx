import React, { useState, useMemo } from 'react';
import { WebsiteAnalysisResult, CuratedBlogItem } from '../types';
import { SentimentBadge } from './SentimentBadge';
import { ImageSummaryCard } from './ImageSummaryCard';
import { BacklinkListBadge } from './BacklinkListBadge';
import { 
  Sparkles, 
  Layers, 
  Filter, 
  ArrowUpDown, 
  ExternalLink, 
  PenTool, 
  CheckCircle2, 
  TrendingUp, 
  Grid, 
  List, 
  BarChart3, 
  Clock, 
  Calendar, 
  User, 
  BookOpen, 
  Tag, 
  Compass,
  ArrowRight,
  FolderTree,
  Cpu,
  Search,
  Server,
  Palette,
  ShieldCheck,
  Leaf,
  Code2,
  Scale,
  Briefcase,
  Database,
  HeartPulse,
  Globe,
  HeartHandshake,
  Moon,
  Users
} from 'lucide-react';

interface CuratedBlogsDashboardProps {
  data: WebsiteAnalysisResult;
  onSelectBlogToGenerate: (blog: CuratedBlogItem, focusKeyword?: string) => void;
  onCategoryChange?: (category: string, websiteUrl?: string) => void;
  onOpenCalendar?: () => void;
  isAnalyzingCategory?: boolean;
}

export const EXPLORE_CATEGORIES = [
  { name: 'Astrology', label: 'Astrology & Cosmic', icon: Moon, desc: 'Zodiac charts, planetary cycles, transit forecasts' },
  { name: 'Health', label: 'Health & Wellness', icon: HeartPulse, desc: 'Metabolic longevity, gut-brain health, nutrition' },
  { name: 'Digital', label: 'Digital Tech & Marketing', icon: Globe, desc: 'Omnichannel growth, ad spend ROI, martech' },
  { name: 'AI', label: 'AI & Machine Learning', icon: Cpu, desc: 'Autonomous agents, RAG, neural architecture' },
  { name: 'NGO', label: 'NGO & Non-Profit Impact', icon: HeartHandshake, desc: 'Global missions, donor transparency, humanitarian' },
  { name: 'Growth & SEO', label: 'Growth & SEO', icon: Search, desc: 'Generative search, zero-click queries, backlinks' },
  { name: 'Cloud Infrastructure', label: 'Cloud Infrastructure', icon: Server, desc: 'Serverless architecture, kubernetes, edge computing' },
  { name: 'Cybersecurity', label: 'Cybersecurity', icon: ShieldCheck, desc: 'Zero-trust, quantum encryption, threat vectors' },
  { name: 'Design & UX', label: 'UI/UX & Design', icon: Palette, desc: 'Design systems, micro-interactions, Figma tokens' },
  { name: 'Data & Analytics', label: 'Data & Analytics', icon: Database, desc: 'Vector databases, data pipelines, predictive models' },
  { name: 'Green Tech', label: 'Climate & Green Tech', icon: Leaf, desc: 'Clean computing, carbon offsets, immersion cooling' },
  { name: 'Web Engineering', label: 'Web Engineering', icon: Code2, desc: 'Modern frontend, reactivity, performance metrics' },
];

// Category styling and icon mapping with rich support for Astrology, Health, Digital, AI, NGO, and Tech domains
const getCategoryStyle = (categoryName: string) => {
  const cat = categoryName.toLowerCase();

  // 1. Astrology & Zodiac / Celestial
  if (
    cat.includes('astrology') || 
    cat.includes('zodiac') || 
    cat.includes('horoscope') || 
    cat.includes('celestial') || 
    cat.includes('planetary') || 
    cat.includes('astro') ||
    cat.includes('retrograde')
  ) {
    return {
      icon: Moon,
      badge: 'bg-indigo-100 text-indigo-900 border-indigo-200',
      headerBg: 'bg-gradient-to-r from-indigo-950 via-purple-950 to-slate-900 text-white',
      accent: 'text-indigo-600',
      lightBg: 'bg-indigo-50/60',
      border: 'border-indigo-200',
    };
  }

  // 2. Health & Wellness / Medical / Nutrition
  if (
    cat.includes('health') || 
    cat.includes('wellness') || 
    cat.includes('medical') || 
    cat.includes('fitness') || 
    cat.includes('nutrition') || 
    cat.includes('medicine') ||
    cat.includes('mental') ||
    cat.includes('holistic')
  ) {
    return {
      icon: HeartPulse,
      badge: 'bg-rose-100 text-rose-900 border-rose-200',
      headerBg: 'bg-gradient-to-r from-rose-950 via-pink-950 to-red-900 text-white',
      accent: 'text-rose-600',
      lightBg: 'bg-rose-50/60',
      border: 'border-rose-200',
    };
  }

  // 3. Digital Marketing / Digital Transformation / Web Media
  if (
    cat.includes('digital') || 
    cat.includes('marketing') || 
    cat.includes('ecommerce') || 
    cat.includes('e-commerce') || 
    cat.includes('media') ||
    cat.includes('social') ||
    cat.includes('advertising')
  ) {
    return {
      icon: Globe,
      badge: 'bg-blue-100 text-blue-900 border-blue-200',
      headerBg: 'bg-gradient-to-r from-blue-950 via-cyan-950 to-slate-900 text-white',
      accent: 'text-blue-600',
      lightBg: 'bg-blue-50/60',
      border: 'border-blue-200',
    };
  }

  // 4. AI & Machine Learning / Robotics
  if (
    cat.includes('ai') || 
    cat.includes('artificial') || 
    cat.includes('intelligence') || 
    cat.includes('machine') ||
    cat.includes('llm') ||
    cat.includes('neural') ||
    cat.includes('agent')
  ) {
    return {
      icon: Cpu,
      badge: 'bg-purple-100 text-purple-900 border-purple-200',
      headerBg: 'bg-gradient-to-r from-purple-950 via-violet-950 to-indigo-950 text-white',
      accent: 'text-purple-600',
      lightBg: 'bg-purple-50/60',
      border: 'border-purple-200',
    };
  }

  // 5. NGO / Non-Profit / Humanitarian / Social Impact
  if (
    cat.includes('ngo') || 
    cat.includes('non-profit') || 
    cat.includes('nonprofit') || 
    cat.includes('charity') || 
    cat.includes('humanitarian') || 
    cat.includes('philanthropy') ||
    cat.includes('community') ||
    cat.includes('social cause') ||
    cat.includes('advocacy')
  ) {
    return {
      icon: HeartHandshake,
      badge: 'bg-teal-100 text-teal-900 border-teal-200',
      headerBg: 'bg-gradient-to-r from-teal-950 via-emerald-950 to-slate-900 text-white',
      accent: 'text-teal-600',
      lightBg: 'bg-teal-50/60',
      border: 'border-teal-200',
    };
  }

  // 6. Growth & SEO
  if (cat.includes('seo') || cat.includes('growth') || cat.includes('search')) {
    return {
      icon: Search,
      badge: 'bg-emerald-100 text-emerald-900 border-emerald-200',
      headerBg: 'bg-gradient-to-r from-emerald-900 to-teal-900 text-white',
      accent: 'text-emerald-600',
      lightBg: 'bg-emerald-50/50',
      border: 'border-emerald-200',
    };
  }

  // 7. Cloud Infrastructure & DevOps
  if (cat.includes('cloud') || cat.includes('infrastructure') || cat.includes('devops') || cat.includes('server')) {
    return {
      icon: Server,
      badge: 'bg-sky-100 text-sky-900 border-sky-200',
      headerBg: 'bg-gradient-to-r from-sky-900 to-blue-900 text-white',
      accent: 'text-sky-600',
      lightBg: 'bg-sky-50/50',
      border: 'border-sky-200',
    };
  }

  // 8. Design & Product UI/UX
  if (cat.includes('design') || cat.includes('ux') || cat.includes('ui') || cat.includes('creative')) {
    return {
      icon: Palette,
      badge: 'bg-amber-100 text-amber-900 border-amber-200',
      headerBg: 'bg-gradient-to-r from-amber-950 to-stone-900 text-white',
      accent: 'text-amber-600',
      lightBg: 'bg-amber-50/50',
      border: 'border-amber-200',
    };
  }

  // 9. Cybersecurity & Privacy
  if (cat.includes('security') || cat.includes('cyber') || cat.includes('privacy') || cat.includes('crypto')) {
    return {
      icon: ShieldCheck,
      badge: 'bg-red-100 text-red-900 border-red-200',
      headerBg: 'bg-gradient-to-r from-stone-900 to-red-950 text-white',
      accent: 'text-red-600',
      lightBg: 'bg-red-50/50',
      border: 'border-red-200',
    };
  }

  // 10. Data & Analytics
  if (cat.includes('data') || cat.includes('analytics') || cat.includes('bi')) {
    return {
      icon: Database,
      badge: 'bg-cyan-100 text-cyan-900 border-cyan-200',
      headerBg: 'bg-gradient-to-r from-cyan-950 to-blue-950 text-white',
      accent: 'text-cyan-600',
      lightBg: 'bg-cyan-50/50',
      border: 'border-cyan-200',
    };
  }

  // 11. Green Tech & Climate
  if (cat.includes('green') || cat.includes('climate') || cat.includes('sustainable') || cat.includes('eco')) {
    return {
      icon: Leaf,
      badge: 'bg-teal-100 text-teal-900 border-teal-200',
      headerBg: 'bg-gradient-to-r from-teal-900 to-emerald-950 text-white',
      accent: 'text-teal-600',
      lightBg: 'bg-teal-50/50',
      border: 'border-teal-200',
    };
  }

  // 12. Web & Frontend Engineering
  if (cat.includes('web') || cat.includes('frontend') || cat.includes('engineering') || cat.includes('dev')) {
    return {
      icon: Code2,
      badge: 'bg-orange-100 text-orange-900 border-orange-200',
      headerBg: 'bg-gradient-to-r from-stone-900 to-orange-950 text-white',
      accent: 'text-orange-600',
      lightBg: 'bg-orange-50/50',
      border: 'border-orange-200',
    };
  }

  // 13. Policy, Ethics & Legal
  if (cat.includes('policy') || cat.includes('ethics') || cat.includes('law') || cat.includes('governance')) {
    return {
      icon: Scale,
      badge: 'bg-indigo-100 text-indigo-900 border-indigo-200',
      headerBg: 'bg-gradient-to-r from-indigo-950 to-slate-900 text-white',
      accent: 'text-indigo-600',
      lightBg: 'bg-indigo-50/50',
      border: 'border-indigo-200',
    };
  }

  return {
    icon: Briefcase,
    badge: 'bg-stone-100 text-stone-800 border-stone-300',
    headerBg: 'bg-gradient-to-r from-stone-900 to-stone-800 text-white',
    accent: 'text-stone-700',
    lightBg: 'bg-stone-50',
    border: 'border-stone-200',
  };
};

export const CuratedBlogsDashboard: React.FC<CuratedBlogsDashboardProps> = ({
  data,
  onSelectBlogToGenerate,
  onCategoryChange,
  onOpenCalendar,
  isAnalyzingCategory = false,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [sentimentFilter, setSentimentFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'default' | 'sentiment-desc' | 'sentiment-asc' | 'read-time'>('default');
  const [viewMode, setViewMode] = useState<'category-wise' | 'grid' | 'table'>('category-wise');

  const handleCategorySelect = (catName: string) => {
    setSelectedCategory(catName);
    if (onCategoryChange && catName !== 'ALL') {
      onCategoryChange(catName, data.websiteUrl);
    }
  };

  // Compute category statistics and counts
  const categoryStats = useMemo(() => {
    const map = new Map<string, number>();
    data.blogs.forEach((b) => {
      map.set(b.category, (map.get(b.category) || 0) + 1);
    });
    return Array.from(map.entries()).map(([category, count]) => ({ category, count }));
  }, [data.blogs]);

  // Extract unique categories list
  const categories = ['ALL', ...categoryStats.map((c) => c.category)];

  // Filter & Sort
  const filteredBlogs = useMemo(() => {
    return data.blogs
      .filter((blog) => {
        if (selectedCategory !== 'ALL' && blog.category !== selectedCategory) return false;
        if (sentimentFilter === 'POSITIVE' && blog.sentimentAnalysis.score < 0.2) return false;
        if (sentimentFilter === 'NEUTRAL' && Math.abs(blog.sentimentAnalysis.score) >= 0.2) return false;
        if (sentimentFilter === 'CRITICAL' && blog.sentimentAnalysis.score > -0.1) return false;
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = blog.title.toLowerCase().includes(q);
          const matchSummary = blog.summary.toLowerCase().includes(q);
          const matchKeyword = blog.suggestedFocusKeywords?.some((k) => k.toLowerCase().includes(q));
          if (!matchTitle && !matchSummary && !matchKeyword) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'sentiment-desc') return b.sentimentAnalysis.score - a.sentimentAnalysis.score;
        if (sortBy === 'sentiment-asc') return a.sentimentAnalysis.score - b.sentimentAnalysis.score;
        if (sortBy === 'read-time') {
          const aMin = parseInt(a.readTime) || 5;
          const bMin = parseInt(b.readTime) || 5;
          return aMin - bMin;
        }
        return 0;
      });
  }, [data.blogs, selectedCategory, sentimentFilter, searchQuery, sortBy]);

  // Group filtered blogs by category for Category-Wise mode
  const groupedByCategory = useMemo(() => {
    const groups: { [category: string]: CuratedBlogItem[] } = {};
    filteredBlogs.forEach((blog) => {
      if (!groups[blog.category]) {
        groups[blog.category] = [];
      }
      groups[blog.category].push(blog);
    });

    return Object.entries(groups).map(([catName, blogs]) => {
      const avgSent = blogs.reduce((acc, b) => acc + b.sentimentAnalysis.score, 0) / (blogs.length || 1);
      const positiveCount = blogs.filter((b) => b.sentimentAnalysis.score >= 0.2).length;
      return {
        category: catName,
        blogs,
        avgSentiment: avgSent,
        positiveRatio: Math.round((positiveCount / blogs.length) * 100),
        style: getCategoryStyle(catName),
      };
    });
  }, [filteredBlogs]);

  const avgSentiment = data.overallSentiment?.averageScore || 0;
  const dominantTone = data.overallSentiment?.dominantTone || 'Authoritative & Informative';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Overview & Sentiment Executive Summary */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full w-fit border border-amber-200 mb-2">
              <Compass className="w-3.5 h-3.5" />
              <span>Domain Analysis &bull; {data.domain}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 font-serif">
              {data.siteTitle} &bull; Top 10 Curated Articles
            </h2>
            <p className="text-sm text-stone-600 mt-1 max-w-2xl">
              {data.siteDescription}
            </p>
            {onOpenCalendar && (
              <div className="mt-3 flex items-center gap-2">
                <button
                  type="button"
                  id="btn-goto-calendar"
                  onClick={onOpenCalendar}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-lg text-xs font-semibold transition-all shadow-2xs"
                >
                  <Calendar className="w-3.5 h-3.5 text-amber-700" />
                  <span>View 30-Day Content Calendar for this Domain &rarr;</span>
                </button>
              </div>
            )}
          </div>

          {/* Sentiment Gauge Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-stone-50 p-4 rounded-xl border border-stone-200">
            <div className="text-center p-2 bg-white rounded-lg border border-stone-100 shadow-2xs">
              <span className="text-[10px] font-bold text-stone-500 uppercase block">Average Sentiment</span>
              <span className={`text-lg font-extrabold font-mono ${avgSentiment >= 0.2 ? 'text-emerald-600' : 'text-amber-600'}`}>
                {avgSentiment >= 0 ? `+${avgSentiment.toFixed(2)}` : avgSentiment.toFixed(2)}
              </span>
            </div>

            <div className="text-center p-2 bg-white rounded-lg border border-stone-100 shadow-2xs">
              <span className="text-[10px] font-bold text-stone-500 uppercase block">Categories</span>
              <span className="text-lg font-extrabold text-stone-900 font-mono">
                {categoryStats.length} Categories
              </span>
            </div>

            <div className="text-center p-2 bg-white rounded-lg border border-stone-100 shadow-2xs">
              <span className="text-[10px] font-bold text-stone-500 uppercase block">Total Articles</span>
              <span className="text-lg font-extrabold text-stone-900 font-mono">
                {data.blogs.length} / 10
              </span>
            </div>

            <div className="text-center p-2 bg-white rounded-lg border border-stone-100 shadow-2xs">
              <span className="text-[10px] font-bold text-stone-500 uppercase block">Positive Ratio</span>
              <span className="text-lg font-extrabold text-emerald-600 font-mono">
                {Math.round((data.overallSentiment.positiveCount / (data.blogs.length || 1)) * 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Global Category Selector Switcher */}
      <div className="bg-stone-900 text-white rounded-2xl p-5 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <h3 className="text-sm font-bold tracking-tight">
              Switch Category (Instantly Curates 10 Dedicated Articles):
            </h3>
          </div>
          <span className="text-xs text-stone-400">
            Click any category to change the curated blogs for {data.domain}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {EXPLORE_CATEGORIES.map((cat) => {
            const CatIcon = cat.icon;
            const isCurrent = selectedCategory.toLowerCase().includes(cat.name.toLowerCase()) || 
              data.blogs.some(b => b.category.toLowerCase().includes(cat.name.toLowerCase()) && selectedCategory === b.category);

            return (
              <button
                key={cat.name}
                id={`cat-switch-${cat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                type="button"
                onClick={() => handleCategorySelect(cat.name)}
                disabled={isAnalyzingCategory}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-amber-400/20 border-amber-400 text-amber-200'
                    : 'bg-stone-800/80 hover:bg-stone-800 border-stone-700 text-stone-200'
                }`}
              >
                <div className="flex items-center space-x-1.5 mb-1">
                  <CatIcon className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                  <span className="text-xs font-bold truncate">{cat.name}</span>
                </div>
                <span className="text-[10px] text-stone-400 line-clamp-1">{cat.desc}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Category-Wise Navigation & Filters */}
      <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4">
        {/* Category Pill Bar with Article Counts */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2 text-xs font-bold text-stone-700 uppercase tracking-wider">
              <FolderTree className="w-4 h-4 text-stone-600" />
              <span>Current Results Categories ({categoryStats.length}):</span>
            </div>
            {selectedCategory !== 'ALL' && (
              <button
                onClick={() => setSelectedCategory('ALL')}
                className="text-xs font-semibold text-amber-700 hover:text-amber-900 hover:underline cursor-pointer"
              >
                Reset to All Categories
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* All Category Pill */}
            <button
              id="filter-cat-all"
              onClick={() => setSelectedCategory('ALL')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center space-x-2 cursor-pointer ${
                selectedCategory === 'ALL'
                  ? 'bg-stone-900 text-white shadow-sm'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-200'
              }`}
            >
              <span>All Articles</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                selectedCategory === 'ALL' ? 'bg-stone-700 text-white' : 'bg-stone-200 text-stone-800'
              }`}>
                {data.blogs.length}
              </span>
            </button>

            {/* Individual Category Pills with Counts */}
            {categoryStats.map(({ category, count }) => {
              const catStyle = getCategoryStyle(category);
              const CatIcon = catStyle.icon;
              const isSelected = selectedCategory === category;

              return (
                <button
                  key={category}
                  id={`filter-cat-${category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                  onClick={() => handleCategorySelect(category)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center space-x-1.5 border cursor-pointer ${
                    isSelected
                      ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
                      : `${catStyle.badge} hover:opacity-90`
                  }`}
                >
                  <CatIcon className="w-3.5 h-3.5" />
                  <span>{category}</span>
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                    isSelected ? 'bg-stone-700 text-white' : 'bg-white/80 text-stone-900'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* View Mode & Filter Controls */}
        <div className="pt-3 border-t border-stone-100 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          {/* Search Query Input */}
          <div className="relative flex-1 max-w-sm">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search in titles, keywords, summaries..."
              className="w-full text-xs bg-stone-50 border border-stone-200 rounded-lg pl-8 pr-3 py-1.5 text-stone-800 focus:bg-white focus:outline-none focus:border-stone-500"
            />
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Sentiment Filter */}
            <select
              id="sentiment-filter-select"
              value={sentimentFilter}
              onChange={(e) => setSentimentFilter(e.target.value)}
              className="text-xs bg-white border border-stone-200 rounded-lg px-2.5 py-1.5 text-stone-700 focus:outline-none focus:border-stone-500"
            >
              <option value="ALL">All Sentiments</option>
              <option value="POSITIVE">🟢 Positive Only (&gt; 0.2)</option>
              <option value="NEUTRAL">🟡 Neutral / Objective</option>
              <option value="CRITICAL">🔴 Critical / Cautionary</option>
            </select>

            {/* Sort Dropdown */}
            <select
              id="sort-by-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs bg-white border border-stone-200 rounded-lg px-2.5 py-1.5 text-stone-700 focus:outline-none focus:border-stone-500"
            >
              <option value="default">Default Order</option>
              <option value="sentiment-desc">Highest Sentiment Score</option>
              <option value="sentiment-asc">Lowest Sentiment Score</option>
              <option value="read-time">Shortest Read Time</option>
            </select>

            {/* View Mode Toggle: Category-Wise vs Grid vs Table */}
            <div className="flex items-center bg-stone-100 p-1 rounded-xl border border-stone-200">
              <button
                id="btn-view-category-wise"
                onClick={() => setViewMode('category-wise')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg flex items-center space-x-1.5 transition-all ${
                  viewMode === 'category-wise'
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
                title="Category-Wise Grouped View"
              >
                <FolderTree className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Category-Wise</span>
              </button>

              <button
                id="btn-view-grid"
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-all ${
                  viewMode === 'grid'
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
                title="Grid View"
              >
                <Grid className="w-3.5 h-3.5" />
              </button>

              <button
                id="btn-view-table"
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg transition-all ${
                  viewMode === 'table'
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
                title="Dense Table Matrix"
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* RENDER VIEW ACCORDING TO VIEW MODE */}

      {/* 1. CATEGORY-WISE GROUPED VIEW (Primary Mode) */}
      {viewMode === 'category-wise' && (
        <div className="space-y-10">
          {groupedByCategory.map((group) => {
            const GroupIcon = group.style.icon;

            return (
              <section
                key={group.category}
                id={`category-section-${group.category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                className="space-y-4"
              >
                {/* Category Header Card */}
                <div className={`p-4 sm:p-5 rounded-2xl border ${group.style.border} ${group.style.lightBg} flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shadow-2xs`}>
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${group.style.headerBg} shadow-xs shrink-0`}>
                      <GroupIcon className="w-5 h-5 text-amber-300" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg sm:text-xl font-bold text-stone-900 font-serif">
                          {group.category}
                        </h3>
                        <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-white text-stone-800 border border-stone-200">
                          {group.blogs.length} {group.blogs.length === 1 ? 'Article' : 'Articles'}
                        </span>
                      </div>
                      <p className="text-xs text-stone-600 mt-0.5">
                        Domain topic cluster analyzing {group.category.toLowerCase()} methodologies & empirical reports.
                      </p>
                    </div>
                  </div>

                  {/* Category Level Sentiment Badge */}
                  <div className="flex items-center space-x-3 text-xs bg-white px-3 py-2 rounded-xl border border-stone-200/80 shadow-2xs shrink-0">
                    <span className="text-[11px] font-bold text-stone-500 uppercase">Category Sentiment:</span>
                    <span className={`font-bold font-mono ${group.avgSentiment >= 0.2 ? 'text-emerald-600' : 'text-amber-600'}`}>
                      {group.avgSentiment >= 0 ? `+${group.avgSentiment.toFixed(2)}` : group.avgSentiment.toFixed(2)}
                    </span>
                    <span className="text-stone-300">|</span>
                    <span className="font-semibold text-stone-700">
                      {group.positiveRatio}% Positive
                    </span>
                  </div>
                </div>

                {/* Grid of articles for this category */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {group.blogs.map((blog) => (
                    <ArticleCard
                      key={blog.id}
                      blog={blog}
                      onSelectBlogToGenerate={onSelectBlogToGenerate}
                    />
                  ))}
                </div>
              </section>
            );
          })}

          {groupedByCategory.length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl border border-stone-200 p-8 shadow-xs">
              <Compass className="w-12 h-12 text-stone-300 mx-auto mb-3" />
              <h4 className="text-base font-bold text-stone-800">
                {selectedCategory !== 'ALL' 
                  ? `No articles found for "${selectedCategory}" in current snapshot` 
                  : 'No articles match your filter criteria'}
              </h4>
              <p className="text-xs text-stone-500 mt-1 max-w-md mx-auto">
                {selectedCategory !== 'ALL'
                  ? `Would you like to instantly generate 10 high-authority articles specialized in ${selectedCategory} for ${data.domain}?`
                  : 'Try resetting the category filter or searching for another keyword.'}
              </p>
              <div className="mt-4 flex items-center justify-center gap-3">
                {selectedCategory !== 'ALL' && onCategoryChange && (
                  <button
                    type="button"
                    onClick={() => onCategoryChange(selectedCategory, data.websiteUrl)}
                    className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center space-x-1.5 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Curate 10 {selectedCategory} Articles</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory('ALL');
                    setSentimentFilter('ALL');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 2. FLAT GRID VIEW */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredBlogs.map((blog) => (
            <ArticleCard
              key={blog.id}
              blog={blog}
              onSelectBlogToGenerate={onSelectBlogToGenerate}
            />
          ))}
        </div>
      )}

      {/* 3. DENSE TABLE VIEW */}
      {viewMode === 'table' && (
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-stone-600">
              <thead className="bg-stone-100 text-stone-700 font-bold border-b border-stone-200 uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="p-3.5">#</th>
                  <th className="p-3.5 min-w-[240px]">Article Title & Category</th>
                  <th className="p-3.5 min-w-[140px]">Sentiment Score</th>
                  <th className="p-3.5 min-w-[160px]">Image Summary</th>
                  <th className="p-3.5 min-w-[160px]">Backlinks</th>
                  <th className="p-3.5 text-right min-w-[160px]">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {filteredBlogs.map((blog, idx) => (
                  <tr key={blog.id} className="hover:bg-stone-50 transition-colors">
                    <td className="p-3.5 font-bold font-mono text-stone-900">
                      {idx + 1}
                    </td>
                    <td className="p-3.5">
                      <div className="font-bold text-stone-900 text-sm font-serif line-clamp-2">
                        {blog.title}
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="px-1.5 py-0.5 rounded text-[10px] bg-stone-100 font-medium">
                          {blog.category}
                        </span>
                        <span className="text-stone-400">{blog.readTime}</span>
                      </div>
                    </td>
                    <td className="p-3.5">
                      <SentimentBadge sentiment={blog.sentimentAnalysis} size="sm" />
                      <div className="text-[10px] text-stone-500 mt-1">{blog.sentimentAnalysis.tone}</div>
                    </td>
                    <td className="p-3.5">
                      <div className="flex items-center space-x-2">
                        <img
                          src={blog.imageSummary.imageUrl}
                          alt="thumb"
                          className="w-12 h-8 rounded object-cover border border-stone-200 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <span className="text-[10px] text-stone-600 line-clamp-2">
                          {blog.imageSummary.description}
                        </span>
                      </div>
                    </td>
                    <td className="p-3.5">
                      <span className="font-semibold text-stone-900">
                        {blog.backlinks?.length || 0} Backlinks
                      </span>
                      <div className="text-[10px] text-stone-500 truncate max-w-[140px]">
                        {blog.backlinks?.[0]?.sourceName || 'Authority References'}
                      </div>
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => onSelectBlogToGenerate(blog)}
                        className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-medium transition-all inline-flex items-center space-x-1.5 shadow-2xs"
                      >
                        <PenTool className="w-3 h-3 text-amber-300" />
                        <span>Write Blog</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

// Reusable Article Card Component
const ArticleCard: React.FC<{
  blog: CuratedBlogItem;
  onSelectBlogToGenerate: (blog: CuratedBlogItem, focusKeyword?: string) => void;
}> = ({ blog, onSelectBlogToGenerate }) => {
  const catStyle = getCategoryStyle(blog.category);
  const CatIcon = catStyle.icon;

  return (
    <article
      id={`article-card-${blog.id}`}
      className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
    >
      {/* Header Meta */}
      <div className="space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center space-x-2">
            <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border flex items-center space-x-1.5 ${catStyle.badge}`}>
              <CatIcon className="w-3.5 h-3.5" />
              <span>{blog.category}</span>
            </span>
          </div>

          <div className="flex items-center space-x-3 text-xs text-stone-500">
            <span className="flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{blog.readTime}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{blog.publishDate}</span>
            </span>
          </div>
        </div>

        {/* Article Title */}
        <h3 className="text-lg sm:text-xl font-bold text-stone-900 font-serif leading-snug group-hover:text-amber-950 transition-colors">
          <a
            href={blog.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline flex items-start justify-between gap-2"
          >
            <span>{blog.title}</span>
            <ExternalLink className="w-4 h-4 opacity-40 group-hover:opacity-100 shrink-0 mt-1" />
          </a>
        </h3>

        <div className="flex items-center space-x-2 text-xs text-stone-500">
          <User className="w-3.5 h-3.5 text-stone-400" />
          <span>{blog.author}</span>
        </div>

        {/* Sentiment Analysis Component */}
        <SentimentBadge sentiment={blog.sentimentAnalysis} showDetails={true} />

        {/* Image Summary Card */}
        <ImageSummaryCard imageSummary={blog.imageSummary} articleTitle={blog.title} />

        {/* Summary Text */}
        <div className="space-y-2 pt-1">
          <span className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
            Article Summary & Insights:
          </span>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            {blog.summary}
          </p>

          {/* Bullet Key Takeaways */}
          {blog.keyTakeaways && blog.keyTakeaways.length > 0 && (
            <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 space-y-1.5 mt-2">
              <span className="text-[11px] font-bold text-stone-700 block">Key Takeaways:</span>
              <ul className="space-y-1 text-xs text-stone-600">
                {blog.keyTakeaways.map((takeaway, tIdx) => (
                  <li key={tIdx} className="flex items-start space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Backlinks Component */}
        <BacklinkListBadge backlinks={blog.backlinks} articleTitle={blog.title} />

        {/* Focus Keyword Suggestions */}
        {blog.suggestedFocusKeywords && blog.suggestedFocusKeywords.length > 0 && (
          <div className="pt-2">
            <span className="text-[11px] font-semibold text-stone-500 block mb-1.5">
              Suggested Focus Keywords for Full Blog:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {blog.suggestedFocusKeywords.map((kw, kwIdx) => (
                <button
                  key={kwIdx}
                  onClick={() => onSelectBlogToGenerate(blog, kw)}
                  className="px-2 py-0.5 rounded-md bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-medium transition-colors"
                  title="Generate full blog with this focus keyword"
                >
                  + {kw}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Action Button: Generate Complete Blog */}
      <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
        <span className="text-xs text-stone-400">
          Strict SEO Placement Ready
        </span>
        <button
          id={`btn-generate-blog-${blog.id}`}
          onClick={() => onSelectBlogToGenerate(blog)}
          className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-sm flex items-center space-x-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
        >
          <PenTool className="w-4 h-4 text-amber-300" />
          <span>Generate Complete Blog</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </article>
  );
};

