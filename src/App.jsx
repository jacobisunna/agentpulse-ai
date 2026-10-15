import React, { useState } from 'react';
import { MouseEffect } from './components/MouseEffect';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { IndustryShowcase } from './components/IndustryShowcase';
import { AgentPlayground } from './components/AgentPlayground';
import { RoiCalculator } from './components/RoiCalculator';
import { WorkflowSection } from './components/WorkflowSection';
import { BentoGrid } from './components/BentoGrid';
import { ClientStories } from './components/ClientStories';
import { Footer } from './components/Footer';
import { BlueprintModal } from './components/BlueprintModal';
import { INDUSTRIES } from './data/agencyData';

export function App() {
  const [isBlueprintOpen, setIsBlueprintOpen] = useState(false);
  const [selectedIndustryId, setSelectedIndustryId] = useState(INDUSTRIES[0].id);

  const handleOpenBlueprint = () => setIsBlueprintOpen(true);
  const handleCloseBlueprint = () => setIsBlueprintOpen(false);

  const handleSelectIndustryForSimulator = (industryId) => {
    setSelectedIndustryId(industryId);
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col relative selection:bg-cyan-500 selection:text-black">
      {/* Dynamic Interactive Mouse System: Ambient Spotlight, CSS Variables, and Neural Particle Canvas */}
      <MouseEffect />

      {/* Navigation Bar */}
      <Navbar onOpenBlueprint={handleOpenBlueprint} />

      {/* Main Page Content */}
      <main className="flex-1 z-20">
        {/* Hero Section with Live Call Simulator & Impact Metrics */}
        <Hero onOpenBlueprint={handleOpenBlueprint} />

        {/* 6 Key SMB Verticals Deep-Dive Showcase */}
        <IndustryShowcase
          onSelectIndustryForSimulator={handleSelectIndustryForSimulator}
          onOpenBlueprint={handleOpenBlueprint}
        />

        {/* Live Interactive AI Agent Simulator & Chat Sandbox */}
        <AgentPlayground
          selectedIndustryId={selectedIndustryId}
          onSelectIndustry={setSelectedIndustryId}
        />

        {/* SMB Financial ROI & Hours Saved Calculator */}
        <RoiCalculator onOpenBlueprint={handleOpenBlueprint} />

        {/* 4-Step Autonomous Agent Deployment Engine */}
        <WorkflowSection />

        {/* Cutting-Edge Bento Grid: Sub-400ms Voice AI & Guardrails */}
        <BentoGrid />

        {/* Verified Client Case Studies & Impact Ratings */}
        <ClientStories />
      </main>

      {/* Footer with Vercel & GitHub Badges */}
      <Footer onOpenBlueprint={handleOpenBlueprint} />

      {/* Interactive Custom Blueprint Configurator Modal */}
      <BlueprintModal
        isOpen={isBlueprintOpen}
        onClose={handleCloseBlueprint}
      />
    </div>
  );
}

export default App;
