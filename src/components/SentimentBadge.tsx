import React from 'react';
import { SentimentAnalysis } from '../types';
import { Smile, Meh, Frown, Sparkles, TrendingUp, AlertTriangle } from 'lucide-react';

interface SentimentBadgeProps {
  sentiment: SentimentAnalysis;
  size?: 'sm' | 'md' | 'lg';
  showDetails?: boolean;
}

export const SentimentBadge: React.FC<SentimentBadgeProps> = ({
  sentiment,
  size = 'md',
  showDetails = false,
}) => {
  const { score, label, tone, percentage } = sentiment;

  // Determine styling based on score
  let bgClass = 'bg-stone-100 text-stone-700 border-stone-200';
  let badgeColor = 'text-stone-600';
  let Icon = Meh;

  if (score >= 0.5) {
    bgClass = 'bg-emerald-50 text-emerald-800 border-emerald-200';
    badgeColor = 'text-emerald-600';
    Icon = Smile;
  } else if (score >= 0.15) {
    bgClass = 'bg-teal-50 text-teal-800 border-teal-200';
    badgeColor = 'text-teal-600';
    Icon = Smile;
  } else if (score >= -0.15) {
    bgClass = 'bg-amber-50 text-amber-800 border-amber-200';
    badgeColor = 'text-amber-600';
    Icon = Meh;
  } else {
    bgClass = 'bg-rose-50 text-rose-800 border-rose-200';
    badgeColor = 'text-rose-600';
    Icon = Frown;
  }

  const formattedScore = score >= 0 ? `+${score.toFixed(2)}` : score.toFixed(2);

  if (size === 'sm') {
    return (
      <span className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded-md text-[11px] font-medium border ${bgClass}`}>
        <Icon className="w-3 h-3" />
        <span>{formattedScore}</span>
        <span className="opacity-75">({label})</span>
      </span>
    );
  }

  return (
    <div className={`inline-flex flex-col p-2.5 rounded-xl border ${bgClass} w-full`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1.5 font-semibold text-xs">
          <Icon className={`w-4 h-4 ${badgeColor}`} />
          <span>Sentiment: {label}</span>
        </div>
        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-white/70 shadow-2xs">
          Score: {formattedScore}
        </span>
      </div>

      {showDetails && (
        <div className="mt-2 pt-2 border-t border-black/5 text-[11px] space-y-1">
          <div className="flex justify-between">
            <span className="opacity-70">Tone:</span>
            <span className="font-medium text-right">{tone}</span>
          </div>
          {sentiment.emotionalDrivers && sentiment.emotionalDrivers.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1">
              {sentiment.emotionalDrivers.map((driver, i) => (
                <span key={i} className="px-1.5 py-0.5 bg-white/60 rounded text-[10px]">
                  {driver}
                </span>
              ))}
            </div>
          )}
          {sentiment.explanation && (
            <p className="mt-1 text-[11px] italic opacity-85 leading-snug">
              &ldquo;{sentiment.explanation}&rdquo;
            </p>
          )}
        </div>
      )}
    </div>
  );
};
