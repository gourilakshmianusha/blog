import React, { useState } from 'react';
import { Sparkles, Globe, BookOpen, Link2, CheckCircle2, Zap, Key, Settings, ShieldCheck, CalendarDays } from 'lucide-react';

interface HeaderProps {
  activeTab: 'curated' | 'calendar' | 'generator' | 'backlinks' | 'seo-rules';
  setActiveTab: (tab: 'curated' | 'calendar' | 'generator' | 'backlinks' | 'seo-rules') => void;
  hasCuratedData: boolean;
  hasGeneratedBlog: boolean;
  engineMode: 'offline' | 'cloud';
  setEngineMode: (mode: 'offline' | 'cloud') => void;
  customApiKey: string;
  setCustomApiKey: (key: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  hasCuratedData,
  hasGeneratedBlog,
  engineMode,
  setEngineMode,
  customApiKey,
  setCustomApiKey,
}) => {
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [tempKey, setTempKey] = useState(customApiKey);

  return (
    <>
      <header className="border-b border-stone-200 bg-white/95 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('curated')}>
              <div className="w-10 h-10 rounded-xl bg-stone-900 flex items-center justify-center text-white shadow-sm ring-1 ring-stone-900/10">
                <Sparkles className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-lg tracking-tight text-stone-900 font-serif">BlogPulse AI</span>
                  <span className="px-2 py-0.5 text-[10px] font-semibold bg-amber-100 text-amber-800 rounded-full border border-amber-200">
                    v2.6 SEO Engine
                  </span>
                </div>
                <p className="text-xs text-stone-500 hidden sm:block">
                  URL Blog Curator &bull; Sentiment Analysis &bull; Strict SEO Writer
                </p>
              </div>
            </div>

            {/* Nav Tabs */}
            <nav className="flex items-center space-x-1 sm:space-x-2">
              <button
                id="tab-curated-blogs"
                onClick={() => setActiveTab('curated')}
                className={`px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all flex items-center space-x-1.5 ${
                  activeTab === 'curated'
                    ? 'bg-stone-900 text-white shadow-sm'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                <Globe className="w-4 h-4" />
                <span>Top 10 Blogs</span>
                {hasCuratedData && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block ml-1"></span>
                )}
              </button>

              <button
                id="tab-monthly-calendar"
                onClick={() => setActiveTab('calendar')}
                className={`px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all flex items-center space-x-1.5 ${
                  activeTab === 'calendar'
                    ? 'bg-stone-900 text-white shadow-sm'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                <CalendarDays className="w-4 h-4 text-amber-500" />
                <span>30-Day Calendar</span>
                <span className="px-1.5 py-0.2 rounded-full bg-amber-400 text-stone-950 font-bold text-[9px] hidden sm:inline">
                  31d
                </span>
              </button>

              <button
                id="tab-blog-generator"
                onClick={() => setActiveTab('generator')}
                className={`px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all flex items-center space-x-1.5 ${
                  activeTab === 'generator'
                    ? 'bg-stone-900 text-white shadow-sm'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Full Blog Studio</span>
                {hasGeneratedBlog && (
                  <span className="w-2 h-2 rounded-full bg-amber-400 inline-block ml-1"></span>
                )}
              </button>

              <button
                id="tab-backlinks-matrix"
                onClick={() => setActiveTab('backlinks')}
                className={`px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all flex items-center space-x-1.5 ${
                  activeTab === 'backlinks'
                    ? 'bg-stone-900 text-white shadow-sm'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                <Link2 className="w-4 h-4" />
                <span className="hidden md:inline">Backlink Intelligence</span>
                <span className="md:hidden">Backlinks</span>
              </button>

              <button
                id="tab-seo-rules"
                onClick={() => setActiveTab('seo-rules')}
                className={`px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all flex items-center space-x-1.5 ${
                  activeTab === 'seo-rules'
                    ? 'bg-stone-900 text-white shadow-sm'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span className="hidden lg:inline">Strict SEO Verification</span>
                <span className="lg:hidden">SEO Rules</span>
              </button>

              {/* Engine Mode Settings Button */}
              <button
                id="btn-engine-settings"
                onClick={() => setShowSettingsModal(true)}
                className={`px-2.5 py-2 text-xs font-semibold rounded-lg border transition-all flex items-center space-x-1.5 ${
                  engineMode === 'offline'
                    ? 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100'
                    : 'bg-emerald-50 text-emerald-900 border-emerald-300 hover:bg-emerald-100'
                }`}
                title="Configure Engine Mode & API Key"
              >
                {engineMode === 'offline' ? (
                  <>
                    <Zap className="w-3.5 h-3.5 text-amber-600" />
                    <span className="hidden sm:inline">⚡ Quota-Free Mode</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="hidden sm:inline">🌐 Cloud AI</span>
                  </>
                )}
                <Settings className="w-3 h-3 opacity-60" />
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-stone-200 overflow-hidden">
            <div className="px-6 py-5 bg-stone-900 text-white flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Settings className="w-5 h-5 text-amber-400" />
                <h3 className="font-serif font-bold text-lg">Engine & Quota Settings</h3>
              </div>
              <button
                onClick={() => setShowSettingsModal(false)}
                className="text-stone-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-2">
                  Select Synthesis Mode
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setEngineMode('offline')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      engineMode === 'offline'
                        ? 'border-amber-500 bg-amber-50/70 ring-2 ring-amber-400/20'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center space-x-1.5 mb-1 font-bold text-xs text-amber-900">
                      <Zap className="w-4 h-4 text-amber-600" />
                      <span>⚡ Instant Engine</span>
                    </div>
                    <p className="text-[11px] text-stone-600 leading-snug">
                      100% Quota-Free, sub-second responses tailored to any URL.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setEngineMode('cloud')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      engineMode === 'cloud'
                        ? 'border-emerald-500 bg-emerald-50/70 ring-2 ring-emerald-400/20'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center space-x-1.5 mb-1 font-bold text-xs text-emerald-900">
                      <Sparkles className="w-4 h-4 text-emerald-600" />
                      <span>🌐 Gemini Cloud</span>
                    </div>
                    <p className="text-[11px] text-stone-600 leading-snug">
                      Live multimodal Google Gemini API generation.
                    </p>
                  </button>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center space-x-1.5">
                    <Key className="w-3.5 h-3.5 text-stone-500" />
                    <span>Custom Gemini API Key (Optional)</span>
                  </label>
                </div>
                <input
                  type="password"
                  value={tempKey}
                  onChange={(e) => setTempKey(e.target.value)}
                  placeholder="AIzaSy... (leave blank to use system defaults)"
                  className="w-full text-xs px-3 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-900 font-mono"
                />
                <p className="text-[11px] text-stone-500 mt-1.5">
                  If your shared workspace hits rate limits, provide your personal Gemini key or switch to ⚡ Instant Engine.
                </p>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-2 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setShowSettingsModal(false)}
                  className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCustomApiKey(tempKey.trim());
                    setShowSettingsModal(false);
                  }}
                  className="px-5 py-2 text-xs font-bold bg-stone-900 hover:bg-stone-800 text-white rounded-lg shadow-xs"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

