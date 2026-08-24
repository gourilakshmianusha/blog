import React, { useState } from 'react';
import { ImageSummary } from '../types';
import { Image as ImageIcon, Sparkles, Copy, Check, Eye, Maximize2, ExternalLink } from 'lucide-react';

interface ImageSummaryCardProps {
  imageSummary: ImageSummary;
  articleTitle: string;
}

export const ImageSummaryCard: React.FC<ImageSummaryCardProps> = ({
  imageSummary,
  articleTitle,
}) => {
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(imageSummary.prompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  return (
    <>
      <div className="bg-stone-50 rounded-xl border border-stone-200 overflow-hidden group hover:border-stone-300 transition-all">
        {/* Image Preview Banner */}
        <div className="relative aspect-video w-full bg-stone-200 overflow-hidden cursor-pointer" onClick={() => setShowModal(true)}>
          <img
            src={imageSummary.imageUrl || "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"}
            alt={imageSummary.suggestedAltText || articleTitle}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-2.5">
            <span className="text-white text-[11px] font-medium flex items-center space-x-1">
              <Eye className="w-3.5 h-3.5" />
              <span>Inspect Prompt & Theme</span>
            </span>
            <span className="p-1 rounded bg-white/20 text-white backdrop-blur-xs">
              <Maximize2 className="w-3.5 h-3.5" />
            </span>
          </div>
          <span className="absolute top-2 right-2 px-2 py-0.5 bg-stone-900/80 backdrop-blur-xs text-white text-[10px] font-mono rounded-md uppercase">
            {imageSummary.aspectRatio || '16:9'}
          </span>
        </div>

        {/* Visual Summary Details */}
        <div className="p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded border border-amber-200">
              {imageSummary.visualTheme || 'Editorial Visual'}
            </span>
            <button
              onClick={handleCopyPrompt}
              className="text-[11px] text-stone-600 hover:text-stone-900 flex items-center space-x-1 transition-colors"
              title="Copy GenAI Prompt"
            >
              {copiedPrompt ? (
                <>
                  <Check className="w-3 h-3 text-emerald-600" />
                  <span className="text-emerald-600 font-medium">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Prompt</span>
                </>
              )}
            </button>
          </div>

          <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
            {imageSummary.description}
          </p>

          <div className="text-[10px] text-stone-400 bg-white p-1.5 rounded border border-stone-200 truncate">
            <span className="font-semibold text-stone-500">Alt:</span> {imageSummary.suggestedAltText || articleTitle}
          </div>
        </div>
      </div>

      {/* Modal for full prompt view */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-5 shadow-2xl border border-stone-200 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center space-x-2">
                <ImageIcon className="w-5 h-5 text-amber-600" />
                <h3 className="font-bold text-stone-900 text-sm sm:text-base">Related Image Specification</h3>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="w-7 h-7 rounded-full bg-stone-100 text-stone-500 hover:bg-stone-200 flex items-center justify-center text-sm font-bold"
              >
                &times;
              </button>
            </div>

            <div className="aspect-video w-full rounded-xl overflow-hidden bg-stone-100">
              <img
                src={imageSummary.imageUrl || "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"}
                alt={imageSummary.suggestedAltText}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="font-semibold text-stone-700 block mb-1">Visual Concept Description:</span>
                <p className="text-stone-600 bg-stone-50 p-2.5 rounded-lg border border-stone-200 leading-relaxed">
                  {imageSummary.description}
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-stone-700">GenAI Generative Prompt:</span>
                  <button
                    onClick={handleCopyPrompt}
                    className="text-amber-700 hover:text-amber-800 font-medium flex items-center space-x-1"
                  >
                    {copiedPrompt ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedPrompt ? 'Copied to Clipboard' : 'Copy Prompt'}</span>
                  </button>
                </div>
                <pre className="font-mono text-[11px] bg-stone-900 text-amber-300 p-2.5 rounded-lg whitespace-pre-wrap leading-normal border border-stone-800">
                  {imageSummary.prompt}
                </pre>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="bg-stone-50 p-2 rounded border border-stone-200">
                  <span className="text-stone-400 block">Visual Theme:</span>
                  <span className="font-medium text-stone-800">{imageSummary.visualTheme}</span>
                </div>
                <div className="bg-stone-50 p-2 rounded border border-stone-200">
                  <span className="text-stone-400 block">Aspect Ratio:</span>
                  <span className="font-mono font-medium text-stone-800">{imageSummary.aspectRatio}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-stone-900 text-white rounded-lg text-xs font-medium hover:bg-stone-800 transition-colors"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
