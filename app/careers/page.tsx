'use client';

import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function CareersPage() {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gsap && window.ScrollTrigger) {
      const gsap = window.gsap;
      const ScrollTrigger = window.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      gsap.utils.toArray('.position-card').forEach((card: any) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            toggleActions: 'play none none none'
          },
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out'
        });
      });
    }
  }, []);

  return (
    <>
      <Navbar />
      
      {/* Careers Hero */}
      <section className="careers-hero">
        <div className="container">
          <h1>Join Our Team</h1>
          <p>Build your career while helping others build theirs</p>
        </div>
      </section>

      {/* Open Positions */}
      <section className="open-positions">
        <div className="container">
          <h2 className="section-title">Current Openings</h2>
          <div className="position-cards">
            {/* Digital Marketing Specialist */}
            <div className="position-card">
              <h3>Digital Marketing Specialist</h3>
              <div className="position-meta">
                <span><i className="fas fa-map-marker-alt"></i> Remote</span>
                <span><i className="fas fa-briefcase"></i> Any degree with relevant skills</span>
                <span><i className="fas fa-industry"></i> 6 months to 2 years</span>
              </div>
              <div className="position-desc">
                <p>Manage paid social media campaigns (Facebook, Instagram, YouTube, LinkedIn).
                  Design eye-catching posters, reels, and short videos.
                  Edit videos for courses, testimonials, and marketing.
                  Analyze performance data to improve campaigns.
                  Collaborate with design and content teams.
                  Drive enrollments and increase brand visibility.</p>
                <ul>
                  <li>Proficiency in Canva, Photoshop, Premiere Pro, or other editing tools</li>
                  <li>Knowledge of Facebook Ads Manager, Google Ads, and SEO best practices</li>
                  <li>Strong creativity, attention to detail, and a sense of trends</li>
                  <li>Portfolio of past designs or ad campaigns is a big plus</li>
                </ul>
              </div>
              <a 
                href="https://mail.google.com/mail/?view=cm&fs=1&to=infyskilledutech@gmail.com&su=Application%20for%20Digital%20Marketing%20Specialist&body=Dear%20Team,%0A%0AI%20am%20excited%20to%20apply%20for%20the%20Digital%20Marketing%20Specialist%20role.%20Here%20are%20my%20details:%0A%0AName:%20%0AExperience:%20%0ATools%20Used:%20%0APortfolio%20Link:%20%0ALinkedIn%20Profile:%20%0AResume%20Link:%20%0A%0AThank%20you%20for%20the%20opportunity.%0A%0ABest%20regards,%0A[Your%20Name]" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Apply Now
              </a>
            </div>

            {/* Campus Ambassadors */}
            <div className="position-card">
              <h3>Campus Ambassadors</h3>
              <div className="position-meta">
                <span><i className="fas fa-map-marker-alt"></i> Remote</span>
                <span><i className="fas fa-briefcase"></i> Any degree</span>
                <span><i className="fas fa-industry"></i> dedicate atleast 2 hour per day</span>
              </div>
              <div className="position-desc">
                <p>As a campus ambassador, you'll promote our courses and webinars within your college and peer networks. You'll help organize mini-events, tech talks, or info sessions at your institution, representing our brand as the face of innovation on campus. By sharing social media content, creating awareness, and boosting engagement, you'll work closely with our team to execute impactful marketing and outreach strategies.</p>
                <h4>Requirements:</h4>
                <ul>
                  <li>Must be a student pursuing B.Tech, MCA, or any Degree</li>
                  <li>Available to dedicate at least 2 hours per day</li>
                  <li>LinkedIn recommendation + chance to join full-time after graduation</li>
                </ul>
              </div>
              <a 
                href="https://mail.google.com/mail/?view=cm&fs=1&to=infyskilledutech@gmail.com&su=Application%20for%20Campus%20Ambassador%20Role&body=Dear%20Team,%0A%0AI%20am%20interested%20in%20applying%20for%20the%20Campus%20Ambassador%20position.%20Please%20find%20my%20details%20below:%0A%0AName:%20%0ACollege:%20%0ADegree:%20%0ALinkedIn%20Profile:%20%0AResume%20Link:%20%0A%0AI%20look%20forward%20to%20hearing%20from%20you.%0A%0ABest%20regards,%0A[Your%20Name]" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Apply Now
              </a>
            </div>

            {/* Marketing Managers */}
            <div className="position-card">
              <h3>Marketing Managers</h3>
              <div className="position-meta">
                <span><i className="fas fa-map-marker-alt"></i> Remote/Hybrid</span>
                <span><i className="fas fa-briefcase"></i> MBA in marketing and related field</span>
                <span><i className="fas fa-industry"></i> 1-3 years preffered</span>
              </div>
              <div className="position-desc">
                <p>Work closely with Campus Ambassadors across India to drive student registrations and engagement. Design and implement marketing strategies suited for the EdTech space, while collaborating with academic institutions, colleges, and student bodies. Oversee campaign performance, plan outreach initiatives, and organize webinars that resonate with students. Serve as a vital link connecting learners, colleges, and the organization.</p>
                <h4>Requirements:</h4>
                <ul>
                  <li>Excellent communication and team management skills</li>
                  <li>Strong understanding of student behavior and education trends</li>
                </ul>
              </div>
              <a 
                href="https://mail.google.com/mail/?view=cm&fs=1&to=infyskilledutech@gmail.com&su=Application%20for%20Marketing%20Manager%20Role&body=Dear%20Team,%0A%0AI%20am%20writing%20to%20express%20my%20interest%20in%20the%20Marketing%20Manager%20position.%20Below%20are%20my%20details%20for%20your%20reference:%0A%0AName:%20%0AExperience:%20%0AMarketing%20Skills:%20%0ALinkedIn%20Profile:%20%0AResume%20Link:%20%0A%0AThank%20you%20for%20considering%20my%20application.%0A%0ABest%20regards,%0A[Your%20Name]" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Apply Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="why-join">
        <div className="container">
          <h2 className="section-title">Why Join InfySkill?</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">
                <i className="fas fa-graduation-cap"></i>
              </div>
              <h3>Continuous Learning</h3>
              <p>Access to all our courses and workshops to enhance your skills.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">
                <i className="fas fa-users"></i>
              </div>
              <h3>Great Team</h3>
              <p>Work with passionate educators and industry experts.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <h3>Growth Opportunities</h3>
              <p>Fast-track career growth in a rapidly expanding ed-tech.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">
                <i className="fas fa-heart"></i>
              </div>
              <h3>Make an Impact</h3>
              <p>Help shape the careers of thousands of students.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}