import React, { useState } from 'react';
import { Search, Globe, Sparkles, ArrowRight, Loader2, RefreshCw, Bookmark, Compass } from 'lucide-react';

interface UrlSearchBarProps {
  onAnalyze: (url: string, topic?: string) => void;
  isLoading: boolean;
  currentUrl: string;
  engineMode: 'offline' | 'cloud';
  setEngineMode: (mode: 'offline' | 'cloud') => void;
}

const PRESET_SITES = [
  { name: 'TechCrunch', url: 'https://techcrunch.com', category: 'AI & Startups', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { name: 'The Verge', url: 'https://theverge.com', category: 'Consumer Tech', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { name: 'Search Engine Journal', url: 'https://searchenginejournal.com', category: 'SEO & Content', color: 'bg-purple-50 text-purple-700 border-purple-200' },
  { name: 'Smashing Magazine', url: 'https://smashingmagazine.com', category: 'Web Dev & Design', color: 'bg-rose-50 text-rose-700 border-rose-200' },
  { name: 'HubSpot Blog', url: 'https://blog.hubspot.com', category: 'Marketing & Sales', color: 'bg-amber-50 text-amber-800 border-amber-200' },
  { name: 'MIT Tech Review', url: 'https://technologyreview.com', category: 'Deep Tech & Science', color: 'bg-cyan-50 text-cyan-800 border-cyan-200' },
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

  const handleSelectPreset = (presetUrl: string) => {
    setInputUrl(presetUrl);
    onAnalyze(presetUrl, topic.trim() || undefined);
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
              <span>Optional Niche / Filter:</span>
              <input
                id="optional-topic-input"
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. AI Agents, SEO Trends, Design..."
                className="px-2.5 py-1 text-xs border border-stone-200 rounded-md bg-white focus:outline-none focus:border-stone-500 w-40 sm:w-56"
              />
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
                onClick={() => handleSelectPreset(site.url)}
                disabled={isLoading}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center space-x-1.5 ${site.color}`}
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
