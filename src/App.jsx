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
import { CtaBand } from './components/CtaBand';
import { Footer } from './components/Footer';
import { BlueprintModal } from './components/BlueprintModal';
import { INDUSTRIES } from './data/agencyData';
import { useReveal } from './hooks/useReveal';

export function App() {
  const [isBlueprintOpen, setIsBlueprintOpen] = useState(false);
  const [selectedIndustryId, setSelectedIndustryId] = useState(INDUSTRIES[0].id);

  useReveal();

  const handleOpenBlueprint = () => setIsBlueprintOpen(true);
  const handleCloseBlueprint = () => setIsBlueprintOpen(false);

  return (
    <div className="relative flex min-h-screen flex-col text-slate-900">
      {/* Interactive pointer layer: signal field, reticle cursor, card spotlights */}
      <MouseEffect />

      <Navbar onOpenBlueprint={handleOpenBlueprint} />

      <main className="relative z-20 flex-1">
        {/* Hero with live call demo, impact metrics and integrations strip */}
        <Hero onOpenBlueprint={handleOpenBlueprint} />

        {/* 6 key SMB verticals deep-dive */}
        <IndustryShowcase
          onSelectIndustryForSimulator={setSelectedIndustryId}
          onOpenBlueprint={handleOpenBlueprint}
        />

        {/* Interactive agent sandbox */}
        <AgentPlayground
          selectedIndustryId={selectedIndustryId}
          onSelectIndustry={setSelectedIndustryId}
        />

        {/* ROI & hours-saved calculator */}
        <RoiCalculator onOpenBlueprint={handleOpenBlueprint} />

        {/* 4-step deployment pipeline */}
        <WorkflowSection />

        {/* Capabilities bento grid */}
        <BentoGrid />

        {/* Client results */}
        <ClientStories />

        {/* Closing call to action */}
        <CtaBand onOpenBlueprint={handleOpenBlueprint} />
      </main>

      <Footer onOpenBlueprint={handleOpenBlueprint} />

      {/* Custom agent blueprint configurator */}
      <BlueprintModal isOpen={isBlueprintOpen} onClose={handleCloseBlueprint} />
    </div>
  );
}

export default App;
