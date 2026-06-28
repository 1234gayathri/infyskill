'use client';

import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AboutPage() {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gsap && window.ScrollTrigger) {
      const gsap = window.gsap;
      const ScrollTrigger = window.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

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
  }, []);

  return (
    <>
      <Navbar />
      
      {/* About Hero */}
      <section className="about-hero">
        <div className="container">
          <h1>About InfySkill</h1>
          <p>Bridging the gap between academia and industry</p>
        </div>
      </section>

      {/* Mission Vision */}
      <section className="mission-vision">
        <div className="container">
          <div className="mv-grid">
            <div className="mv-card">
              <div className="mv-icon">
                <i className="fas fa-bullseye"></i>
              </div>
              <h3>Our Mission</h3>
              <p>To provide high-quality, practical, and industry-relevant training to students from technical and
                non-technical backgrounds, enabling them to build strong fundamentals, gain domain expertise,
                and succeed in campus and off-campus placements with confidence.
              </p>
            </div>
            <div className="mv-card">
              <div className="mv-icon">
                <i className="fas fa-eye"></i>
              </div>
              <h3>Our Vision</h3>
              <p>To become a trusted platform that bridges the gap between academic learning and real-world IT
                careers by empowering students to secure jobs before graduation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="journey">
        <div className="container">
          <h2 className="section-title">Our Journey</h2>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-content">
                <h3>November 2022 — The Beginning</h3>
                <p>We started our journey as MSP EduTech, with a mission to empower students with real-world skills. <br /> In our initial phase, we trained 500+ students, laying the foundation for a strong learning community.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-content">
                <h3>April 2023 — Official Recognition & Rapid Growth</h3>
                <p>Officially registered under Ministry of Corporate Affairs (MCA).<br />Trained 3000+ students.<br />Collaborated with 5+ colleges and partnered with 10+ startups to provide internship opportunities.<br /> 200+ students secured placements even before completing their graduation.
                  <br />Recognized by AICTE, Startup India (DPIIT), and MSME, establishing credibility and national-level recognition.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-content">
                <h3>2024 — First Major Milestone</h3>
                <p>Crossed 5000+ students trained.<br />Achieved ISO Certification, ensuring quality standards in our services.<br />Collaborated with 10+ colleges.<br />Enabled 100+ students to gain real-time internship experiences.<br />Facilitated 300+ student placements, boosting early career success.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-content">
                <h3>What's Next?</h3>
                <p>We are planning to expand into school education, with a goal to introduce AI Fundamentals and 21st-century skills to school students.<br /> Our vision is to build a tech-savvy generation right from the foundational level and bridge the gap between education and industry from an early age.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team">
        <div className="container">
          <h2 className="section-title">Founder's Message</h2>
          <div className="team-grid">
            <div className="team-card">
              <img src="/images/simhaReddy.jpeg" alt="Team Member" />
              <h3>V.Samara Simha Reddy</h3>
              <p>Founder & CEO</p>
              <div className="team-social">
                <a href="https://www.linkedin.com/in/valluru-samara-simha-reddy-445088189?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
            <div className="founder-message">
              <p className="message">When we started InfySkill in April 2023, our vision was simple—to help students
                get job-ready before they graduate. We saw a gap between what colleges teach and what companies
                expect, and we wanted to fill that gap with structured, practical, and goal-driven training.

                At InfySkill, we are not just offering courses—we are building careers. From resume building
                to interview prep, from core concepts to domain expertise, our team is here to guide you every
                step of the way.
                If you're a student with a dream to land an IT job before graduation, you're in the right place.
                Let's work together to turn your goal into reality.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}