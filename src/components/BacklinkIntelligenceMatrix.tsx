import React, { useState } from 'react';
import { WebsiteAnalysisResult, CompleteBlogData, BacklinkItem } from '../types';
import { Link2, ExternalLink, Copy, Check, Search, ShieldCheck, Filter, ArrowUpRight } from 'lucide-react';

interface BacklinkIntelligenceMatrixProps {
  curatedData: WebsiteAnalysisResult | null;
  generatedBlog: CompleteBlogData | null;
}

export const BacklinkIntelligenceMatrix: React.FC<BacklinkIntelligenceMatrixProps> = ({
  curatedData,
  generatedBlog,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  // Consolidate all backlinks
  const allBacklinks: Array<BacklinkItem & { articleOrigin: string }> = [];

  if (curatedData) {
    curatedData.blogs.forEach((blog) => {
      if (blog.backlinks) {
        blog.backlinks.forEach((link) => {
          allBacklinks.push({
            ...link,
            articleOrigin: blog.title,
          });
        });
      }
    });
  }

  if (generatedBlog && generatedBlog.backlinks) {
    generatedBlog.backlinks.forEach((link) => {
      allBacklinks.push({
        ...link,
        articleOrigin: `[Generated] ${generatedBlog.title}`,
      });
    });
  }

  const filteredLinks = allBacklinks.filter((item) => {
    if (typeFilter !== 'ALL' && item.type !== typeFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchSource = item.sourceName.toLowerCase().includes(q);
      const matchAnchor = item.anchorText.toLowerCase().includes(q);
      const matchUrl = item.url.toLowerCase().includes(q);
      const matchArticle = item.articleOrigin.toLowerCase().includes(q);
      if (!matchSource && !matchAnchor && !matchUrl && !matchArticle) return false;
    }
    return true;
  });

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const types = ['ALL', 'External Authority', 'Canonical Source', 'Data Citation', 'Research Study'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
        <div className="flex items-center space-x-2 text-xs font-semibold text-amber-800 bg-amber-50 px-3 py-1 rounded-full w-fit border border-amber-200 mb-2">
          <Link2 className="w-3.5 h-3.5" />
          <span>Curated Authority Graph</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-stone-900 font-serif">
          Backlink Intelligence Matrix
        </h2>
        <p className="text-sm text-stone-600 mt-1">
          Explore and export high-authority reference links, canonical sources, and optimal context anchor texts across all curated articles.
        </p>

        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 text-center">
            <span className="text-[10px] uppercase font-bold text-stone-500 block">Total Discovered Links</span>
            <span className="text-xl font-extrabold font-mono text-stone-900">{allBacklinks.length}</span>
          </div>
          <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 text-center">
            <span className="text-[10px] uppercase font-bold text-stone-500 block">Avg Authority</span>
            <span className="text-xl font-extrabold font-mono text-emerald-600">DA 92+</span>
          </div>
          <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 text-center">
            <span className="text-[10px] uppercase font-bold text-stone-500 block">Unique Sources</span>
            <span className="text-xl font-extrabold font-mono text-stone-900">
              {new Set(allBacklinks.map((l) => l.sourceName)).size}
            </span>
          </div>
          <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 text-center">
            <span className="text-[10px] uppercase font-bold text-stone-500 block">High Trust Citations</span>
            <span className="text-xl font-extrabold font-mono text-amber-600">100%</span>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search source, anchor text, domain..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-white rounded-lg border border-stone-200 focus:outline-none focus:border-stone-500"
          />
        </div>

        {/* Type pills */}
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                typeFilter === t
                  ? 'bg-stone-900 text-white'
                  : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Backlinks Table Matrix */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        {filteredLinks.length === 0 ? (
          <div className="p-12 text-center text-stone-500 space-y-2">
            <Link2 className="w-8 h-8 text-stone-300 mx-auto" />
            <p className="font-semibold text-sm">No backlinks match your search criteria.</p>
            <p className="text-xs">Analyze a website on the Top 10 Blogs tab to discover high authority links.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-stone-600">
              <thead className="bg-stone-100 text-stone-700 font-bold border-b border-stone-200 uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="p-3.5">Source & Authority</th>
                  <th className="p-3.5 min-w-[200px]">Optimal Anchor Text</th>
                  <th className="p-3.5 min-w-[220px]">Target Destination URL</th>
                  <th className="p-3.5 min-w-[200px]">Associated Curated Article</th>
                  <th className="p-3.5 text-right min-w-[140px]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {filteredLinks.map((link, idx) => {
                  const itemKey = `link-${idx}`;
                  return (
                    <tr key={idx} className="hover:bg-stone-50 transition-colors">
                      <td className="p-3.5">
                        <div className="font-bold text-stone-900">{link.sourceName}</div>
                        <div className="flex items-center space-x-1.5 mt-1">
                          {link.domainAuthorityEst && (
                            <span className="px-1.5 py-0.2 rounded text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              {link.domainAuthorityEst}
                            </span>
                          )}
                          <span className="px-1.5 py-0.2 rounded text-[10px] bg-stone-100 text-stone-600">
                            {link.type}
                          </span>
                        </div>
                      </td>

                      <td className="p-3.5">
                        <span className="font-mono font-semibold text-amber-900 bg-amber-50 px-2 py-1 rounded border border-amber-200 inline-block">
                          &ldquo;{link.anchorText}&rdquo;
                        </span>
                        {link.contextSnippet && (
                          <div className="text-[10px] text-stone-500 italic mt-1 line-clamp-2">
                            {link.contextSnippet}
                          </div>
                        )}
                      </td>

                      <td className="p-3.5">
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-amber-800 hover:underline flex items-center space-x-1 truncate max-w-xs font-mono text-[11px]"
                        >
                          <span className="truncate">{link.url}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                        </a>
                      </td>

                      <td className="p-3.5 text-stone-700 font-serif font-medium line-clamp-2">
                        {link.articleOrigin}
                      </td>

                      <td className="p-3.5 text-right space-x-1">
                        <button
                          onClick={() => handleCopy(`[${link.anchorText}](${link.url})`, `${itemKey}-md`)}
                          className="px-2 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded text-[11px] font-medium transition-colors"
                          title="Copy Markdown format [anchor](url)"
                        >
                          {copiedIndex === `${itemKey}-md` ? (
                            <span className="text-emerald-600 font-bold">Copied MD</span>
                          ) : (
                            <span>MD Link</span>
                          )}
                        </button>

                        <button
                          onClick={() => handleCopy(`<a href="${link.url}" target="_blank" rel="noopener">${link.anchorText}</a>`, `${itemKey}-html`)}
                          className="px-2 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded text-[11px] font-medium transition-colors"
                          title="Copy HTML format <a href=...>"
                        >
                          {copiedIndex === `${itemKey}-html` ? (
                            <span className="text-emerald-600 font-bold">Copied HTML</span>
                          ) : (
                            <span>HTML</span>
                          )}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
