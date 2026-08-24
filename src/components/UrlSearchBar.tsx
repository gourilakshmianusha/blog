import React, { useState } from 'react';
import { Search, Globe, Sparkles, ArrowRight, Loader2, RefreshCw, Bookmark, Compass } from 'lucide-react';

interface UrlSearchBarProps {
  onAnalyze: (url: string, topic?: string) => void;
  isLoading: boolean;
  currentUrl: string;
  engineMode: 'offline' | 'cloud';
  setEngineMode: (mode: 'offline' | 'cloud') => void;
}

const CATEGORY_DEFAULT_URLS: Record<string, string> = {
  'Astrology': 'https://astrology.com',
  'Health': 'https://healthline.com',
  'Digital': 'https://digitaltrends.com',
  'AI': 'https://openai.com/news',
  'NGO': 'https://charitynavigator.org',
  'Growth & SEO': 'https://searchenginejournal.com',
  'Cloud Infrastructure': 'https://aws.amazon.com/blogs',
  'Cybersecurity': 'https://krebsonsecurity.com',
  'Design & UX': 'https://smashingmagazine.com',
  'Data & Analytics': 'https://towardsdatascience.com',
  'Green Tech': 'https://cleantechnica.com',
  'Web Engineering': 'https://dev.to',
};

const PRESET_SITES = [
  { name: 'Astrology.com', url: 'https://astrology.com', category: 'Astrology', color: 'bg-indigo-50 text-indigo-800 border-indigo-200' },
  { name: 'Healthline', url: 'https://healthline.com', category: 'Health & Wellness', color: 'bg-rose-50 text-rose-800 border-rose-200' },
  { name: 'Digital Trends', url: 'https://digitaltrends.com', category: 'Digital Tech', color: 'bg-blue-50 text-blue-800 border-blue-200' },
  { name: 'OpenAI Blog', url: 'https://openai.com/news', category: 'AI & Research', color: 'bg-purple-50 text-purple-800 border-purple-200' },
  { name: 'Charity Navigator', url: 'https://charitynavigator.org', category: 'NGO & Non-Profit', color: 'bg-teal-50 text-teal-800 border-teal-200' },
  { name: 'TechCrunch', url: 'https://techcrunch.com', category: 'AI & Startups', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { name: 'Search Engine Journal', url: 'https://searchenginejournal.com', category: 'SEO & Growth', color: 'bg-amber-50 text-amber-800 border-amber-200' },
  { name: 'Wired', url: 'https://wired.com', category: 'Culture & Systems', color: 'bg-stone-100 text-stone-800 border-stone-300' },
];

export const UrlSearchBar: React.FC<UrlSearchBarProps> = ({
  onAnalyze,
  isLoading,
  currentUrl,
  engineMode,
  setEngineMode,
}) => {
  const [inputUrl, setInputUrl] = useState(currentUrl || '');
  const [topic, setTopic] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputUrl.trim()) return;
    onAnalyze(inputUrl.trim(), topic.trim() || undefined);
  };

  const handleSelectPreset = (presetUrl: string, presetCategory?: string) => {
    setInputUrl(presetUrl);
    if (presetCategory) {
      setTopic(presetCategory);
    }
    onAnalyze(presetUrl, presetCategory || topic.trim() || undefined);
  };

  const handleSelectCategory = (catName: string) => {
    setTopic(catName);
    // If the input url is empty, default to the category's canonical site, otherwise use current URL
    const targetUrl = inputUrl.trim() || CATEGORY_DEFAULT_URLS[catName] || 'https://techcrunch.com';
    if (!inputUrl.trim()) {
      setInputUrl(targetUrl);
    }
    onAnalyze(targetUrl, catName);
  };

  return (
    <div className="w-full bg-gradient-to-b from-stone-50 to-white border-b border-stone-200 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-stone-100 rounded-full text-xs font-medium text-stone-700 mb-3 border border-stone-200">
            <Compass className="w-3.5 h-3.5 text-stone-600" />
            <span>AI-Powered Website URL Discovery & Sentiment Extraction</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 font-serif tracking-tight">
            Curate Top 10 Blogs & Generate Full SEO Posts
          </h1>
          <p className="mt-2 text-sm sm:text-base text-stone-600 max-w-2xl mx-auto">
            Input any website URL to extract 10 top articles with detailed summaries, image prompts, sentiment analysis, and authoritative backlinks.
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSubmit} className="relative">
          <div className="flex flex-col sm:flex-row items-stretch gap-2 bg-white p-2 rounded-2xl shadow-sm border border-stone-300 focus-within:ring-2 focus-within:ring-stone-900 focus-within:border-stone-900 transition-all">
            <div className="flex-1 flex items-center px-3 space-x-3">
              <Globe className="w-5 h-5 text-stone-400 shrink-0" />
              <input
                id="website-url-input"
                type="text"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                placeholder="Enter website URL (e.g., https://techcrunch.com, hubspot.com)..."
                className="w-full text-sm sm:text-base text-stone-900 placeholder:text-stone-400 bg-transparent border-none outline-none focus:ring-0"
                required
              />
            </div>

            <button
              id="btn-analyze-website"
              type="submit"
              disabled={isLoading || !inputUrl.trim()}
              className="px-6 py-3 bg-stone-900 hover:bg-stone-800 disabled:bg-stone-300 text-white font-medium text-sm rounded-xl transition-all flex items-center justify-center space-x-2 shadow-sm shrink-0 cursor-pointer disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-amber-300" />
                  <span>Curating Top 10...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Analyze Website</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {/* Subtopic Optional input & Engine Mode Switch */}
          <div className="mt-3 flex flex-wrap items-center justify-between text-xs text-stone-500 px-2 gap-2">
            <div className="flex items-center space-x-2">
              <span className="font-medium text-stone-600">Category / Niche:</span>
              <input
                id="optional-topic-input"
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Artificial Intelligence, SEO, Cloud..."
                className="px-2.5 py-1 text-xs border border-stone-200 rounded-md bg-white focus:outline-none focus:border-stone-500 w-44 sm:w-60"
              />
              {topic && (
                <button
                  type="button"
                  onClick={() => setTopic('')}
                  className="text-[10px] text-stone-400 hover:text-stone-600 underline"
                >
                  clear
                </button>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-[11px] text-stone-400">Engine:</span>
              <button
                type="button"
                onClick={() => setEngineMode(engineMode === 'offline' ? 'cloud' : 'offline')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold border flex items-center space-x-1.5 transition-all ${
                  engineMode === 'offline'
                    ? 'bg-amber-100/80 text-amber-900 border-amber-300'
                    : 'bg-emerald-100/80 text-emerald-900 border-emerald-300'
                }`}
              >
                <span>{engineMode === 'offline' ? '⚡ 100% Quota-Free (Instant)' : '🌐 Gemini Cloud AI'}</span>
                <span className="text-[9px] underline opacity-75">toggle</span>
              </button>
            </div>
          </div>

          {/* Quick Category Suggestions Chips */}
          <div className="mt-2.5 px-2 flex flex-wrap items-center gap-1.5 text-[11px]">
            <span className="text-stone-400 mr-1">Categories:</span>
            {[
              'Astrology',
              'Health',
              'Digital',
              'AI',
              'NGO',
              'Growth & SEO',
              'Cloud Infrastructure',
              'Cybersecurity',
              'Design & UX',
              'Data & Analytics',
              'Green Tech',
              'Web Engineering'
            ].map((catName) => (
              <button
                key={catName}
                id={`cat-chip-${catName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                type="button"
                onClick={() => handleSelectCategory(catName)}
                className={`px-2.5 py-0.5 rounded-md border text-[11px] font-medium transition-all cursor-pointer ${
                  topic.toLowerCase() === catName.toLowerCase()
                    ? 'bg-stone-900 text-white border-stone-900 shadow-2xs'
                    : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                }`}
              >
                {catName}
              </button>
            ))}
          </div>
        </form>

        {/* Quick Presets */}
        <div className="mt-5">
          <div className="flex items-center space-x-2 text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
            <Bookmark className="w-3.5 h-3.5" />
            <span>Popular Presets to Test Instantly:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {PRESET_SITES.map((site) => (
              <button
                key={site.url}
                id={`preset-${site.name.toLowerCase().replace(/\s+/g, '-')}`}
                type="button"
                onClick={() => handleSelectPreset(site.url, site.category)}
                disabled={isLoading}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center space-x-1.5 cursor-pointer ${site.color}`}
              >
                <span>{site.name}</span>
                <span className="text-[10px] opacity-70">({site.category})</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
