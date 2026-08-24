import React, { useState } from 'react';
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
  ArrowRight
} from 'lucide-react';

interface CuratedBlogsDashboardProps {
  data: WebsiteAnalysisResult;
  onSelectBlogToGenerate: (blog: CuratedBlogItem, focusKeyword?: string) => void;
}

export const CuratedBlogsDashboard: React.FC<CuratedBlogsDashboardProps> = ({
  data,
  onSelectBlogToGenerate,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [sentimentFilter, setSentimentFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'default' | 'sentiment-desc' | 'sentiment-asc' | 'read-time'>('default');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Extract unique categories
  const categories = ['ALL', ...Array.from(new Set(data.blogs.map((b) => b.category)))];

  // Filter & Sort
  const filteredBlogs = data.blogs
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
              <span className="text-[10px] font-bold text-stone-500 uppercase block">Curated Articles</span>
              <span className="text-lg font-extrabold text-stone-900 font-mono">
                {data.blogs.length} / 10
              </span>
            </div>

            <div className="text-center p-2 bg-white rounded-lg border border-stone-100 shadow-2xs">
              <span className="text-[10px] font-bold text-stone-500 uppercase block">Dominant Tone</span>
              <span className="text-xs font-semibold text-stone-800 block truncate" title={dominantTone}>
                {dominantTone}
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

      {/* Filter & View Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-stone-50/80 p-4 rounded-xl border border-stone-200">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center space-x-1 text-xs font-semibold text-stone-600 mr-2">
            <Filter className="w-3.5 h-3.5" />
            <span>Category:</span>
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              id={`filter-cat-${cat.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-stone-900 text-white shadow-2xs'
                  : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search, Sentiment & Sort */}
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

          {/* View Mode Toggle */}
          <div className="flex items-center bg-white border border-stone-200 rounded-lg p-0.5">
            <button
              id="btn-view-grid"
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md ${viewMode === 'grid' ? 'bg-stone-900 text-white' : 'text-stone-500 hover:text-stone-900'}`}
              title="Grid View"
            >
              <Grid className="w-3.5 h-3.5" />
            </button>
            <button
              id="btn-view-table"
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-md ${viewMode === 'table' ? 'bg-stone-900 text-white' : 'text-stone-500 hover:text-stone-900'}`}
              title="Dense Table Matrix"
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid Mode */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredBlogs.map((blog, idx) => (
            <article
              key={blog.id}
              id={`article-card-${blog.id}`}
              className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
            >
              {/* Header Meta */}
              <div className="space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-stone-900 text-white">
                      #{idx + 1}
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-xs font-semibold bg-stone-100 text-stone-800 border border-stone-200">
                      {blog.category}
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
          ))}
        </div>
      ) : (
        /* Dense Table View */
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
