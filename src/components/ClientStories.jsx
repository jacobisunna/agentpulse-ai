import React from 'react';
import { Star, Quote, CheckCircle2, TrendingUp } from 'lucide-react';
import { CLIENT_STORIES } from '../data/agencyData';

export function ClientStories() {
  return (
    <section id="results" className="py-24 relative overflow-hidden bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-wider">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Proven Business Impact</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-white tracking-tight">
            Loved By Small Business Owners
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Hear from local entrepreneurs who stopped drowning in phone tag and unlocked record profitability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CLIENT_STORIES.map((story, idx) => (
            <div
              key={idx}
              className="spotlight-card rounded-2xl border border-white/10 bg-[#090d18]/90 p-8 flex flex-col justify-between space-y-6 hover:border-cyan-500/30 transition-all shadow-xl"
            >
              <div className="space-y-4">
                {/* Metric Callout */}
                <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-500/20 flex items-center justify-between">
                  <div>
                    <span className="text-xl font-extrabold font-display text-cyan-300">
                      {story.metric}
                    </span>
                    <p className="text-[11px] font-mono text-slate-400">{story.metricLabel}</p>
                  </div>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Quote */}
                <p className="text-slate-300 text-sm leading-relaxed italic">
                  "{story.quote}"
                </p>
              </div>

              {/* Author & Business */}
              <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                <img
                  src={story.image}
                  alt={story.author}
                  className="w-11 h-11 rounded-full object-cover border border-cyan-500/40"
                  loading="lazy"
                />
                <div>
                  <h4 className="font-semibold text-white text-sm">{story.author}</h4>
                  <p className="text-xs text-slate-400">{story.role}</p>
                  <p className="text-[11px] text-cyan-400 font-mono">{story.client}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
