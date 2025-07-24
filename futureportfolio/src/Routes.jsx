import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Single Page Portfolio Import
import SinglePagePortfolio from "pages/SinglePagePortfolio";
// Original pages (kept for reference/fallback)
import PortalEntryLoadingExperience from "pages/portal-entry-loading-experience";
import HeroUniverseNavigationHub from "pages/hero-universe-navigation-hub";
import ServicesGalaxyExploration from "pages/services-galaxy-exploration";
import ContactPortalCommunication from "pages/contact-portal-communication";
import PortfolioCosmosCaseStudies from "pages/portfolio-cosmos-case-studies";
import SkillsMatrixVisualization from "pages/skills-matrix-visualization";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Single Page Portfolio as Main Route */}
        <Route path="/" element={<SinglePagePortfolio />} />
        
        {/* Original pages kept for reference/fallback */}
        <Route path="/portal-entry-loading-experience" element={<PortalEntryLoadingExperience />} />
        <Route path="/hero-universe-navigation-hub" element={<HeroUniverseNavigationHub />} />
        <Route path="/services-galaxy-exploration" element={<ServicesGalaxyExploration />} />
        <Route path="/contact-portal-communication" element={<ContactPortalCommunication />} />
        <Route path="/portfolio-cosmos-case-studies" element={<PortfolioCosmosCaseStudies />} />
        <Route path="/skills-matrix-visualization" element={<SkillsMatrixVisualization />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;