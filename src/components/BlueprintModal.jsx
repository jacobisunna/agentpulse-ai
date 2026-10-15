import React, { useState } from 'react';
import { X, CheckCircle2, Bot, Sparkles, ArrowRight, Building, Mail, Phone, Layers } from 'lucide-react';
import confetti from 'canvas-confetti';
import { INDUSTRIES } from '../data/agencyData';

export function BlueprintModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [step, setStep] = useState(1);
  const [selectedIndustry, setSelectedIndustry] = useState('restaurant');
  const [selectedPains, setSelectedPains] = useState(['Missed phone calls during peak rush']);
  const [formData, setFormData] = useState({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    monthlyVolume: '500-1000'
  });
  const [submitted, setSubmitted] = useState(false);

  const painPoints = [
    'Missed phone calls during peak hours',
    'After-hours inquiry loss & unanswered voicemails',
    'Manual table booking & schedule double-booking',
    'Repetitive menu, pricing, and FAQ questions',
    'Time-consuming material or service quotes',
    'Inventory replenishment and vendor order delays',
    'Unanswered negative reviews across Google/Yelp'
  ];

  const togglePain = (pain) => {
    if (selectedPains.includes(pain)) {
      setSelectedPains(selectedPains.filter((p) => p !== pain));
    } else {
      setSelectedPains([...selectedPains, pain]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#06b6d4', '#6366f1', '#10b981']
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#090e18] border border-cyan-500/30 rounded-3xl shadow-2xl shadow-cyan-950/60 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-900 border border-white/10 text-slate-400 hover:text-white transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div className="p-6 sm:p-10 space-y-6">
            {/* Modal Header */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Custom Architecture Blueprint</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
                Design Your Custom AI Workforce
              </h3>
              <p className="text-sm text-slate-400">
                Tell us about your business operations. We'll generate an architectural blueprint and ROI projection tailored to your specific tools.
              </p>
            </div>

            {/* Stepper Dots */}
            <div className="flex items-center gap-2 pb-2">
              <span className={`h-1.5 flex-1 rounded-full ${step >= 1 ? 'bg-cyan-400' : 'bg-slate-800'}`} />
              <span className={`h-1.5 flex-1 rounded-full ${step >= 2 ? 'bg-cyan-400' : 'bg-slate-800'}`} />
              <span className={`h-1.5 flex-1 rounded-full ${step >= 3 ? 'bg-cyan-400' : 'bg-slate-800'}`} />
            </div>

            {/* STEP 1: Select Industry */}
            {step === 1 && (
              <div className="space-y-4 animate-in fade-in">
                <label className="text-sm font-semibold text-white block">
                  1. Which industry matches your business?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {INDUSTRIES.map((ind) => (
                    <button
                      key={ind.id}
                      type="button"
                      onClick={() => setSelectedIndustry(ind.id)}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        selectedIndustry === ind.id
                          ? 'bg-cyan-500/15 border-cyan-400 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.25)]'
                          : 'bg-slate-900/80 border-white/5 text-slate-300 hover:border-white/20'
                      }`}
                    >
                      <p className="text-xs font-bold leading-tight">{ind.name.split(' ')[0]}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{ind.badge}</p>
                    </button>
                  ))}
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-semibold text-sm cursor-pointer shadow-lg"
                  >
                    <span>Next: Select Pain Points</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Select Pain Points */}
            {step === 2 && (
              <div className="space-y-4 animate-in fade-in">
                <label className="text-sm font-semibold text-white block">
                  2. What are your biggest daily operational bottlenecks? (Select all that apply)
                </label>
                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {painPoints.map((pain, idx) => {
                    const isChecked = selectedPains.includes(pain);
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => togglePain(pain)}
                        className={`w-full flex items-center justify-between p-3 rounded-xl border text-xs text-left transition-all cursor-pointer ${
                          isChecked
                            ? 'bg-cyan-500/10 border-cyan-400 text-cyan-200'
                            : 'bg-slate-900/60 border-white/5 text-slate-300 hover:border-white/20'
                        }`}
                      >
                        <span>{pain}</span>
                        <div className={`w-4 h-4 rounded flex items-center justify-center border ${isChecked ? 'bg-cyan-400 border-cyan-400 text-black' : 'border-slate-600'}`}>
                          {isChecked && <CheckCircle2 className="w-3.5 h-3.5 text-black" />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs text-slate-400 hover:text-white cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-semibold text-sm cursor-pointer shadow-lg"
                  >
                    <span>Next: Contact Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Contact & Business Info */}
            {step === 3 && (
              <form onSubmit={handleSubmit} className="space-y-4 animate-in fade-in">
                <label className="text-sm font-semibold text-white block">
                  3. Where should we send your AI Agent Blueprint?
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Business Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Apex Auto Care"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      className="w-full bg-slate-950 border border-white/10 focus:border-cyan-500 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Marcus Vance"
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      className="w-full bg-slate-950 border border-white/10 focus:border-cyan-500 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Work Email</label>
                    <input
                      type="email"
                      required
                      placeholder="marcus@apexrepair.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-950 border border-white/10 focus:border-cyan-500 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Direct Phone (For Voice Demo)</label>
                    <input
                      type="tel"
                      required
                      placeholder="(555) 234-5678"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-950 border border-white/10 focus:border-cyan-500 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="text-xs text-slate-400 hover:text-white cursor-pointer"
                  >
                    Back
                  </button>

                  <button
                    type="submit"
                    className="flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 text-white font-bold text-sm shadow-[0_0_25px_rgba(6,182,212,0.4)] cursor-pointer"
                  >
                    <span>Generate My Custom Blueprint</span>
                    <Sparkles className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          /* Confirmation Screen */
          <div className="p-8 sm:p-12 text-center space-y-6 animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-xl">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
                Blueprint Generated Successfully!
              </h3>
              <p className="text-slate-300 text-sm max-w-md mx-auto">
                Thank you, <strong>{formData.contactName || 'Partner'}</strong>! We've generated your custom <strong>{selectedIndustry.toUpperCase()}</strong> Agent Architecture blueprint.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-cyan-500/20 text-xs font-mono text-cyan-300 max-w-md mx-auto text-left space-y-2">
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span className="text-slate-400">Target Business:</span>
                <span className="text-white font-semibold">{formData.businessName || 'Your Business'}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span className="text-slate-400">Agent Vertical:</span>
                <span className="text-cyan-400">{selectedIndustry}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Selected Workflows:</span>
                <span className="text-emerald-400">{selectedPains.length} automated flows</span>
              </div>
            </div>

            <p className="text-xs text-slate-400">
              Our lead AI solutions engineer will reach out to <strong>{formData.email}</strong> with your full architectural schema and interactive sandbox link.
            </p>

            <button
              onClick={() => {
                setSubmitted(false);
                setStep(1);
                onClose();
              }}
              className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors"
            >
              Done & Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
