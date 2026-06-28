'use client';

import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TestimonialCarousel from '../components/TestimonialCarousel';
import VideoTestimonials from '../components/VideoTestimonials';
import CompaniesSection from '../components/CompaniesSection';
import StatsCounter from '../components/StatsCounter';
import CertificationsSection from '../components/CertificationsSection';
import GallerySection from '../components/GallerySection';

export default function HomePage() {
  useEffect(() => {
    // GSAP Animations
    if (typeof window !== 'undefined' && window.gsap) {
      const gsap = window.gsap;
      const ScrollTrigger = window.ScrollTrigger;
      
      if (ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);
      }

      // Hero animations
      gsap.from('.hero-title', {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power3.out'
      });

      gsap.from('.hero-subtitle', {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power3.out',
        delay: 0.3
      });

      gsap.from('.hero-buttons', {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power3.out',
        delay: 0.6
      });

      gsap.from('.hero-image', {
        duration: 1,
        x: 50,
        opacity: 0,
        ease: 'power3.out',
        delay: 0.9
      });

      // Section animations
      if (ScrollTrigger) {
        gsap.utils.toArray('section').forEach((section: any) => {
          gsap.from(section, {
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none none'
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
          });
        });
      }
    }
  }, []);

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-icon">🎓</span> Empowering Future-Ready Professionals
            </div>
            <h1 className="hero-title">
              Learn. Grow.<br />Get <span className="highlight">Hired.</span>
            </h1>
            <p className="hero-subtitle">
              Master in-demand skills with live projects, expert mentors, industry-recognized certifications and placement support.
            </p>
            <div className="hero-buttons">
              <a href="/courses" className="btn btn-primary btn-explore">
                Explore Courses <span className="btn-arrow">→</span>
              </a>
              <a href="https://whatsapp.com/channel/0029VaLkBaU3LdQdb07EJs2D" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-watch">
                Watch Demo <span className="btn-play-icon">▶</span>
              </a>
            </div>
          </div>
          <div className="hero-image">
            <img src="/images/home.webp" alt="Learning illustration" />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="container">
          <h2 className="section-title">What Our Students Say</h2>
          <TestimonialCarousel />
        </div>
      </section>

      {/* Video Testimonials */}
      <VideoTestimonials />

      {/* Companies Section */}
      <CompaniesSection />

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            <StatsCounter target={7000} suffix="+" label="Students Trained" />
            <StatsCounter target={10} suffix="+" label="Colleges Collaborated" />
            <StatsCounter target={500} suffix="+" label="Students Placed" />
            <StatsCounter target={2} suffix="+" label="Years of Experience" />
          </div>
        </div>
      </section>

      {/* Certifications */}
      <CertificationsSection />

      {/* Gallery */}
      <GallerySection />

      <Footer />
    </>
  );
}