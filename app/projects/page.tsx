'use client';

import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function ProjectsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    description: ''
  });

  useEffect(() => {
    // Smooth scrolling for anchor links
    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(anchor => {
      anchor.addEventListener('click', function(e: any) {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: (targetElement as HTMLElement).offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });

    // Animation for feature cards
    if (typeof window !== 'undefined') {
      const featureCards = document.querySelectorAll('.feature-card');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = '1';
            (entry.target as HTMLElement).style.transform = 'translateY(0)';
          }
        });
      }, { threshold: 0.1 });

      featureCards.forEach(card => {
        (card as HTMLElement).style.opacity = '0';
        (card as HTMLElement).style.transform = 'translateY(20px)';
        (card as HTMLElement).style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
      });
    }
  }, []);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.department || !formData.description) {
      alert('Please fill in all the required fields.');
      return;
    }

    if (!validateEmail(formData.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    const rawMessage = 
      `Hello InfySkill Team,\n\n` +
      `I would like to request support for my final year project. Here are my details:\n\n` +
      `*Name:* ${formData.name}\n` +
      `*Email:* ${formData.email}\n` +
      `*Department & Domain:* ${formData.department}\n` +
      `*Project Description:*\n${formData.description}\n\n` +
      `Please contact me with the available options. Thank you!`;

    const whatsappMessage = encodeURIComponent(rawMessage);
    window.open(`https://wa.me/919080087187?text=${whatsappMessage}`, '_blank');

    setFormData({ name: '', email: '', department: '', description: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="projects-hero">
        <div className="container">
          <div className="hero-content" style={{ margin: '0 auto', textAlign: 'center' }}>
            <h1>Get Your Final Year Project Done With Experts</h1>
            <p>All Departments • All Domains • Complete Guidance • Documentation • Research Paper Included</p>
            <br />
            <a href="#contact" className="btn btn-primary">
              Request Your Project Now
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section features">
        <div className="container">
          <h2 className="section-title">Why Choose InfySkill For Your Final Year Project?</h2>
          <p className="section-subtitle">We provide end-to-end project development with full support and guaranteed quality.</p>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">💸</div>
              <h3>All Domains</h3>
              <p>Includes "AI/ML, Web Dev, IoT, Android, Embedded, Data Science, Cloud, Python..."</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">📄</div>
              <h3>Documentation & Research</h3>
              <p>Includes "We deliver full project reports, source code, research papers, and presentation materials."</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">👥</div>
              <h3>One-on-One Support</h3>
              <p>Includes "Live project explanations, demo videos, viva preparation, and continuous support."</p>
            </div>
          </div>
        </div>
      </section>

      {/* Departments Section */}
      <section className="section departments">
        <div className="container">
          <h2 className="section-title">Departments & Technologies Covered</h2>
          
          <div className="tags-container">
            <span className="tag">CSE</span>
            <span className="tag">ECE</span>
            <span className="tag">EEE</span>
            <span className="tag">Mechanical</span>
            <span className="tag">Civil</span>
            <span className="tag">IT</span>
            <span className="tag">AI/ML</span>
            <span className="tag">IoT</span>
            <span className="tag">Web Dev</span>
            <span className="tag">Cloud Computing</span>
            <span className="tag">Data Science</span>
            <span className="tag">Python</span>
            <span className="tag">Java</span>
            <span className="tag">Embedded Systems</span>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="highlights">
        <div className="container">
          <div className="highlights-grid">
            <div className="highlight-card">
              <div className="highlight-icon">
                <i className="fas fa-smile"></i>
              </div>
              <h3 className="highlight-number">300+</h3>
              <p className="highlight-text" style={{ color: 'white' }}>Satisfied Students</p>
            </div>
            
            <div className="highlight-card">
              <div className="highlight-icon">
                <i className="fas fa-project-diagram"></i>
              </div>
              <h3 className="highlight-number">100+</h3>
              <p className="highlight-text" style={{ color: 'white' }}>Projects Delivered</p>
            </div>
            
            <div className="highlight-card">
              <div className="highlight-icon">
                <i className="fas fa-star"></i>
              </div>
              <div className="rating">
                <span className="rating-value">4.7</span>
                <div className="stars">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star-half-alt"></i>
                </div>
                <span className="rating-text">Google Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section">
        <div className="container">
          <h2 className="section-title">Contact Us for Project Support</h2>
          
          <form className="contact-form" id="projectForm" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input 
                type="text" 
                id="name" 
                className="form-control" 
                required 
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                className="form-control" 
                required 
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="department">Department & Domain</label>
              <input 
                type="text" 
                id="department" 
                className="form-control" 
                required 
                value={formData.department}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="description">Project Description</label>
              <textarea 
                id="description" 
                className="form-control" 
                required 
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            
            <button type="submit" className="btn btn-primary">Submit Request</button>
          </form>
        </div>
      </section>

      <Footer />
    </>
  );
}