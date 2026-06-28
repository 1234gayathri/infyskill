'use client';

import { useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function WebinarsPage() {
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

  const handleRegisterClick = () => {
    window.open('https://whatsapp.com/channel/0029VaLkBaU3LdQdb07EJs2D', '_blank');
  };

  return (
    <>
      <Navbar />
      
      {/* Webinar Highlights Promo Section */}
      <section className="webinars-hero webinar-promo">
        <div className="container">
          <h2 className="section-title">Upcoming Webinar Highlights</h2>
          <div className="promo-grid">
            <div className="promo-card">
              <h3>Resume Building Season</h3>
              <p>Join our expert-led webinar to learn how to create a standout resume.</p>
              <p>Learn how to build an ATS-ready resume in 4–5 powerful steps.</p>
              <button onClick={handleRegisterClick} className="promo-btn">Register Now</button>
            </div>
            <div className="promo-card">
              <h3>Placement Guidance Sessions</h3>
              <p>Unlock job readiness after every course with expert career advice.</p>
              <p>Sessions follow course completion and are packed with interview prep tips.</p>
              <button onClick={handleRegisterClick} className="promo-btn">Register Now</button>
            </div>
            <div className="promo-card">
              <h3>Digital Presence Mastery</h3>
              <p>Establish your personal brand online with our exclusive post-training webinars.</p>
              <p>Exclusively for registered students after training completion.</p>
              <button onClick={handleRegisterClick} className="promo-btn">Register Now</button>
            </div>
          </div>
        </div>
      </section>

      {/* Webinar Benefits */}
      <section className="webinar-benefits">
        <div className="container">
          <h2 className="section-title">Why Attend Our Webinars?</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">
                <i className="fas fa-chalkboard-teacher"></i>
              </div>
              <h3>Learn from Experts</h3>
              <p>Gain insights from industry professionals with years of experience.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">
                <i className="fas fa-money-bill-wave"></i>
              </div>
              <h3>Free of Cost</h3>
              <p>All our webinars are completely free to attend.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">
                <i className="fas fa-certificate"></i>
              </div>
              <h3>Benefits</h3>
              <p>Interview preparation strategies — Coding, DSA, system design, projects</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">
                <i className="fas fa-question-circle"></i>
              </div>
              <h3>Q&A Session</h3>
              <p>Get your questions answered by the experts.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}