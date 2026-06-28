'use client';

import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const builderUrl = 'https://portfolio-generator-jade.vercel.app/';

export default function PortfolioGeneratorPage() {
  useEffect(() => {
    // Auth bypass
  }, []);

  const handleLaunch = () => {
    window.open(builderUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <Navbar />
      <section className="portfolio-hero">
        <div className="container">
          <div className="portfolio-hero-content">
            <h1>Build a Portfolio That Wins Interviews</h1>
            <p className="portfolio-subtitle">Showcase your skills, experience, and achievements with our guided portfolio generator crafted for ambitious professionals.</p>
            <div className="portfolio-hero-actions">
              <button type="button" className="btn btn-primary btn-large" onClick={handleLaunch}>Launch Portfolio Builder</button>
              <a href="#features" className="btn btn-outline btn-large">See What&apos;s Inside</a>
            </div>
            <ul className="portfolio-highlights-list">
              <li>Curated layouts designed for hiring managers</li>
              <li>Easy content blocks for projects, case studies, and testimonials</li>
              <li>Instant hosting with personalized sharing links</li>
            </ul>
          </div>
          <div className="portfolio-hero-image">
            <img src="/images/home.webp" alt="Portfolio Generator" />
          </div>
        </div>
      </section>

      <section id="features" className="portfolio-features">
        <div className="container">
          <h2 className="portfolio-section-title">Everything You Need to Stand Out</h2>
          <p className="portfolio-section-subtitle">Our generator removes the guesswork by combining design best practices with storytelling frameworks.</p>
          <div className="portfolio-feature-grid">
            <div className="portfolio-feature-card">
              <div className="portfolio-icon"><i className="fas fa-layer-group"></i></div>
              <h3>Purpose-Built Templates</h3>
              <p>Choose from professional layouts optimized for product, engineering, design, and marketing roles.</p>
            </div>
            <div className="portfolio-feature-card">
              <div className="portfolio-icon"><i className="fas fa-bolt"></i></div>
              <h3>Guided Storytelling</h3>
              <p>Step-by-step prompts help you translate project impact into compelling narratives.</p>
            </div>
            <div className="portfolio-feature-card">
              <div className="portfolio-icon"><i className="fas fa-share-alt"></i></div>
              <h3>Share-Ready Delivery</h3>
              <p>Publish instantly with a custom link and built-in analytics to track engagement.</p>
            </div>
            <div className="portfolio-feature-card">
              <div className="portfolio-icon"><i className="fas fa-magic"></i></div>
              <h3>Personalized Styling</h3>
              <p>Fine-tune color systems, typography, and media blocks to match your professional brand.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="portfolio-workflow">
        <div className="container">
          <h2 className="portfolio-section-title">From Ideas to Published Portfolio in Minutes</h2>
          <div className="portfolio-workflow-grid">
            <div className="workflow-step">
              <span>1</span>
              <h4>Pick a Template</h4>
              <p>Select a layout curated for your role and industry.</p>
            </div>
            <div className="workflow-step">
              <span>2</span>
              <h4>Plug in Your Wins</h4>
              <p>Use guided prompts to highlight outcomes, metrics, and learnings.</p>
            </div>
            <div className="workflow-step">
              <span>3</span>
              <h4>Customize the Look</h4>
              <p>Drop in visuals, tweak palettes, and align the narrative to your brand.</p>
            </div>
            <div className="workflow-step">
              <span>4</span>
              <h4>Share Instantly</h4>
              <p>Publish with one click and share a trackable link with recruiters.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="portfolio-cta">
        <div className="container">
          <div className="portfolio-cta-card">
            <div>
              <h2>Ready to present your work like a pro?</h2>
              <p>Join the creator community using InfySkill tools to craft memorable digital portfolios that convert opportunities faster.</p>
            </div>
            <button type="button" className="btn btn-secondary btn-large" onClick={handleLaunch}>Start Building</button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
