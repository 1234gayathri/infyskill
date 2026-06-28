'use client';

import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function CreateResumePage() {
  const RESUME_BUILDER_URL = 'https://resume-web-tau-three.vercel.app/';

  useEffect(() => {
    // Auth bypass
  }, []);

  const openResumeBuilder = () => {
    window.open(RESUME_BUILDER_URL, '_blank');
  };

  return (
    <>
      <Navbar />
      
      <section className="resume-hero">
        <div className="container">
          <div className="resume-hero-content">
            <h1>Create Your Professional Resume</h1>
            <p className="subtitle">Build a stunning resume in minutes with our easy-to-use builder</p>
            <div className="resume-features">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-file-alt"></i>
                </div>
                <h3>Professional Templates</h3>
                <p>Choose from multiple designs</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-download"></i>
                </div>
                <h3>Download PDF</h3>
                <p>Export in multiple formats</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-edit"></i>
                </div>
                <h3>Easy to Edit</h3>
                <p>Update anytime, anywhere</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-mobile-alt"></i>
                </div>
                <h3>Mobile Friendly</h3>
                <p>Works on all devices</p>
              </div>
            </div>
          </div>
          <div className="resume-hero-image">
            <img src="https://img.freepik.com/free-vector/curriculum-vitae-concept-illustration_114360-7458.jpg" alt="Resume Builder" />
          </div>
        </div>
      </section>


      <section className="resume-benefits">
        <div className="container">
          <h2 className="section-title">Why Choose Our Resume Builder?</h2>
          <div className="benefits-grid">
            <div className="benefit-item">
              <div className="benefit-icon">
                <i className="fas fa-bolt"></i>
              </div>
              <h3>Lightning Fast</h3>
              <p>Create a professional resume in under 10 minutes</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">
                <i className="fas fa-check-double"></i>
              </div>
              <h3>ATS Optimized</h3>
              <p>Pass applicant tracking systems with ease</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">
                <i className="fas fa-palette"></i>
              </div>
              <h3>Multiple Templates</h3>
              <p>Choose from professionally designed layouts</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">
                <i className="fas fa-file-download"></i>
              </div>
              <h3>Instant Download</h3>
              <p>Export your resume as PDF instantly</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">
                <i className="fas fa-mobile-alt"></i>
              </div>
              <h3>Mobile Friendly</h3>
              <p>Build your resume on any device</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">
                <i className="fas fa-infinity"></i>
              </div>
              <h3>Unlimited Edits</h3>
              <p>Update and refine anytime you want</p>
            </div>
          </div>
        </div>
      </section>

      <section className="resume-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Create Your Resume?</h2>
            <p>Join thousands of students who have successfully created their professional resumes with us</p>
            <button onClick={openResumeBuilder} className="btn btn-secondary btn-large">
              <i className="fas fa-arrow-right"></i>
              Create Resume Now
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}