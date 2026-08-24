import React, { useState } from 'react';
import { BacklinkItem } from '../types';
import { Link2, ExternalLink, ShieldCheck, ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';

interface BacklinkListBadgeProps {
  backlinks: BacklinkItem[];
  articleTitle: string;
}

export const BacklinkListBadge: React.FC<BacklinkListBadgeProps> = ({
  backlinks,
  articleTitle,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopyLink = (text: string, index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1800);
  };

  if (!backlinks || backlinks.length === 0) {
    return null;
  }

  return (
    <div className="border border-stone-200 rounded-xl overflow-hidden bg-white">
      {/* Header Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 bg-stone-50 hover:bg-stone-100/80 flex items-center justify-between text-xs font-medium text-stone-700 transition-colors"
      >
        <div className="flex items-center space-x-2">
          <Link2 className="w-3.5 h-3.5 text-stone-600" />
          <span>Curated Backlinks & Sources</span>
          <span className="px-1.5 py-0.5 rounded-full bg-stone-200 text-stone-800 text-[10px] font-bold">
            {backlinks.length}
          </span>
        </div>
        <div className="flex items-center space-x-1 text-stone-400">
          <span className="text-[11px]">{isOpen ? 'Hide' : 'Show'}</span>
          {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </div>
      </button>

      {/* Expanded Backlinks List */}
      {isOpen && (
        <div className="p-3 divide-y divide-stone-100 space-y-2">
          {backlinks.map((link, idx) => (
            <div key={idx} className="pt-2 first:pt-0 text-xs">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center space-x-1.5 flex-wrap">
                    <span className="font-semibold text-stone-900">{link.sourceName}</span>
                    {link.domainAuthorityEst && (
                      <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {link.domainAuthorityEst}
                      </span>
                    )}
                    <span className="text-[10px] text-stone-500 bg-stone-100 px-1.5 py-0.2 rounded">
                      {link.type}
                    </span>
                  </div>
                  
                  {/* Anchor text */}
                  <div className="mt-1 flex items-center space-x-1 text-[11px] text-stone-600">
                    <span className="text-stone-400">Anchor:</span>
                    <span className="font-medium text-amber-900 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-100 font-mono">
                      &ldquo;{link.anchorText}&rdquo;
                    </span>
                  </div>
                  
                  {link.contextSnippet && (
                    <p className="mt-1 text-[11px] text-stone-500 italic">
                      {link.contextSnippet}
                    </p>
                  )}
                </div>

                <div className="flex items-center space-x-1 shrink-0">
                  <button
                    onClick={(e) => handleCopyLink(`[${link.anchorText}](${link.url})`, idx, e)}
                    className="p-1 rounded hover:bg-stone-100 text-stone-500 hover:text-stone-900 transition-colors"
                    title="Copy Markdown Link"
                  >
                    {copiedIndex === idx ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 rounded hover:bg-stone-100 text-stone-500 hover:text-stone-900 transition-colors"
                    title="Visit Source"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
