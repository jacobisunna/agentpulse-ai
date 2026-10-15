import React, { useState } from 'react';
import { Calculator, DollarSign, Clock, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export function RoiCalculator({ onOpenBlueprint }) {
  const [inboundCalls, setInboundCalls] = useState(650);
  const [hourlyWage, setHourlyWage] = useState(24);
  const [dailyAdminHours, setDailyAdminHours] = useState(3.5);
  const [teamSize, setTeamSize] = useState(4);

  // Formulas
  // Average call handling & follow-up: 6 minutes (0.1 hours) per interaction
  const hoursOnCallsPerMonth = Math.round((inboundCalls * 0.1) + (dailyAdminHours * 22 * (teamSize * 0.4)));
  const agentAutomationRate = 0.88; // 88% autonomously resolved
  const monthlyHoursSaved = Math.round(hoursOnCallsPerMonth * agentAutomationRate);
  const monthlyLaborSaved = Math.round(monthlyHoursSaved * hourlyWage);
  const annualSavings = monthlyLaborSaved * 12;

  // Estimated recovered leads (assuming 15% of inbound calls were historically missed after-hours)
  const recoveredCalls = Math.round(inboundCalls * 0.18);
  const estimatedRecoveredRevenue = Math.round(recoveredCalls * 65); // $65 avg ticket across SMB

  const handleCalculateImpact = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#06b6d4', '#6366f1', '#10b981']
    });
  };

  return (
    <section id="calculator" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-emerald-500/30 text-emerald-400 text-xs font-mono uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5" />
            <span>SMB Financial Economics</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-white tracking-tight">
            Calculate Your Small Business ROI
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            See the exact hours and operational payroll our autonomous agents return to your business every single month.
          </p>
        </div>

        <div className="spotlight-card rounded-3xl border border-white/10 bg-[#090d18]/90 p-8 lg:p-12 shadow-2xl max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Controls: Sliders */}
            <div className="lg:col-span-6 space-y-8">
              {/* Slider 1: Monthly Calls / Interactions */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-300 font-medium">Monthly Inbound Calls & Inquiries:</span>
                  <span className="font-mono text-cyan-400 font-bold text-base">{inboundCalls.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="150"
                  max="4000"
                  step="50"
                  value={inboundCalls}
                  onChange={(e) => setInboundCalls(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-[11px] font-mono text-slate-400">
                  <span>150 calls</span>
                  <span>4,000+ calls</span>
                </div>
              </div>

              {/* Slider 2: Average Hourly Staff Wage */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-300 font-medium">Average Staff Hourly Rate ($/hr):</span>
                  <span className="font-mono text-cyan-400 font-bold text-base">${hourlyWage}/hr</span>
                </div>
                <input
                  type="range"
                  min="16"
                  max="50"
                  step="1"
                  value={hourlyWage}
                  onChange={(e) => setHourlyWage(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-[11px] font-mono text-slate-400">
                  <span>$16/hr</span>
                  <span>$50/hr</span>
                </div>
              </div>

              {/* Slider 3: Daily Admin Hours */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-300 font-medium">Daily Hours Spent on Booking & Phone Tag:</span>
                  <span className="font-mono text-cyan-400 font-bold text-base">{dailyAdminHours} hrs/day</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="8"
                  step="0.5"
                  value={dailyAdminHours}
                  onChange={(e) => setDailyAdminHours(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-[11px] font-mono text-slate-400">
                  <span>1 hour</span>
                  <span>8 hours</span>
                </div>
              </div>

              {/* Slider 4: Team Size */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-300 font-medium">Location Team Size:</span>
                  <span className="font-mono text-cyan-400 font-bold text-base">{teamSize} employees</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="25"
                  step="1"
                  value={teamSize}
                  onChange={(e) => setTeamSize(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-[11px] font-mono text-slate-400">
                  <span>1 person</span>
                  <span>25 people</span>
                </div>
              </div>
            </div>

            {/* Right Display: Projected Financial Results */}
            <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-cyan-950/40 border border-cyan-500/30 space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-300">
                  Estimated Financial Impact
                </span>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                  88% Autonomous Resolution
                </span>
              </div>

              {/* Big Stat 1: Monthly Labor Savings */}
              <div className="space-y-1">
                <p className="text-xs text-slate-400 font-medium">Estimated Monthly Payroll Savings</p>
                <div className="text-4xl sm:text-5xl font-extrabold font-display text-white">
                  ${monthlyLaborSaved.toLocaleString()}
                  <span className="text-lg font-normal text-slate-400">/mo</span>
                </div>
              </div>

              {/* Sub-grid of secondary metrics */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-900/80 border border-white/5 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Clock className="w-4 h-4 text-cyan-400" />
                    <span>Hours Recovered</span>
                  </div>
                  <div className="text-2xl font-bold font-display text-white">
                    {monthlyHoursSaved} <span className="text-xs font-normal text-slate-400">hrs/mo</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-white/5 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    <span>Annual Total Value</span>
                  </div>
                  <div className="text-2xl font-bold font-display text-emerald-400">
                    ${annualSavings.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Missed Revenue Recovery insight */}
              <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-xs text-emerald-300 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
                <p>
                  <strong>Bonus Revenue:</strong> By eliminating missed after-hours calls, you will capture an estimated ~{recoveredCalls} additional orders/bookings worth approximately <strong>${estimatedRecoveredRevenue.toLocaleString()}/mo</strong> in gross sales.
                </p>
              </div>

              {/* Call to action */}
              <button
                onClick={() => {
                  handleCalculateImpact();
                  onOpenBlueprint();
                }}
                className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all cursor-pointer"
              >
                <span>Lock In This ROI Blueprint</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
