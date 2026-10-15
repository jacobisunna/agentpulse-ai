import React from 'react';
import { Star, Quote, TrendingUp } from 'lucide-react';
import { CLIENT_STORIES } from '../data/agencyData';

export function ClientStories() {
  return (
    <section id="results" className="relative overflow-hidden border-y border-slate-200/70 bg-white/60 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto mb-14 max-w-3xl space-y-5 text-center">
          <div data-reveal className="eyebrow">
            <TrendingUp className="h-3.5 w-3.5 text-indigo-500" aria-hidden="true" />
            <span>Proven business impact</span>
          </div>
          <h2 data-reveal style={{ '--reveal-delay': '60ms' }} className="section-title">
            Loved by <span className="gradient-text">small business owners</span>
          </h2>
          <p data-reveal style={{ '--reveal-delay': '120ms' }} className="section-lead mx-auto max-w-2xl">
            Hear from local entrepreneurs who stopped drowning in phone tag and unlocked record profitability.
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
          {CLIENT_STORIES.map((story, idx) => (
            <figure
              key={story.client}
              data-reveal
              style={{ '--reveal-delay': `${idx * 90}ms` }}
              className="spotlight-card card flex flex-col p-7"
            >
              {/* Metric callout */}
              <div className="flex items-start justify-between gap-4 rounded-xl border border-indigo-100 bg-indigo-50 p-4">
                <div className="min-w-0">
                  <p className="font-display text-2xl font-bold tracking-tight text-indigo-700">{story.metric}</p>
                  <p className="mt-1 font-mono text-[11px] leading-snug text-slate-600">{story.metricLabel}</p>
                </div>
                <div role="img" aria-label="Rated 5 out of 5" className="flex shrink-0 gap-0.5 pt-1.5">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} aria-hidden="true" className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>

              {/* Quote */}
              <blockquote className="mt-6 flex-1">
                <Quote aria-hidden="true" strokeWidth={1.5} className="mb-3 h-6 w-6 fill-indigo-100 text-indigo-300" />
                <p className="text-[15px] leading-relaxed text-slate-700">{story.quote}</p>
              </blockquote>

              {/* Author & business */}
              <figcaption className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
                <span className="shrink-0 rounded-full bg-gradient-to-br from-indigo-500 via-blue-500 to-cyan-400 p-[2px] shadow-soft">
                  <img
                    src={story.image}
                    alt=""
                    width="44"
                    height="44"
                    loading="lazy"
                    decoding="async"
                    className="block h-11 w-11 rounded-full object-cover ring-2 ring-white"
                  />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-ink">{story.author}</p>
                  <p className="text-xs text-slate-500">{story.role}</p>
                  <p className="font-mono text-[11px] text-indigo-600">{story.client}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
