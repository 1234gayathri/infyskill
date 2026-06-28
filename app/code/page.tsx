'use client';

import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function CodeEditorPage() {
  useEffect(() => {

    // Scroll animations
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeInOptions = {
      threshold: 0.3,
      rootMargin: "0px 0px -100px 0px"
    };
    
    const fadeInObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, fadeInOptions);
    
    fadeElements.forEach(element => {
      fadeInObserver.observe(element);
    });
  }, []);

  return (
    <>
      <Navbar />
      
      <style jsx>{`
        .code-hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding-top: 80px;
          background: linear-gradient(to bottom, #0f172a, #1e293b);
          position: relative;
          overflow: hidden;
        }
        
        .code-hero::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle at center, rgba(59, 130, 246, 0.1) 0%, transparent 70%);
          animation: pulse 15s infinite alternate;
        }
        
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 0.5;
          }
          100% {
            transform: scale(1.1);
            opacity: 0.8;
          }
        }
        
        .code-hero-content {
          position: relative;
          z-index: 2;
        }
        
        .code-hero-title {
          font-size: 3.5rem;
          font-weight: 800;
          margin-bottom: 1.5rem;
          background: linear-gradient(90deg, #3b82f6, #8b5cf6);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .code-hero-subtitle {
          font-size: 1.5rem;
          color: #94a3b8;
          margin-bottom: 2rem;
        }
        
        .cta-button {
          display: inline-block;
          padding: 1rem 2.5rem;
          background: linear-gradient(90deg, #3b82f6, #8b5cf6);
          color: white;
          border-radius: 50px;
          font-weight: 600;
          text-decoration: none;
          box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        
        .cta-button::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(90deg, #3b82f6, #8b5cf6, #3b82f6);
          z-index: -1;
          border-radius: 50px;
          animation: glowing 1.5s infinite;
        }
        
        @keyframes glowing {
          0% { opacity: 0.7; }
          50% { opacity: 1; }
          100% { opacity: 0.7; }
        }
        
        .cta-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(59, 130, 246, 0.6);
          color: white;
        }
        
        .code-features {
          padding: 100px 0;
          background-color: #1e293b;
        }
        
        .code-section-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 3rem;
          text-align: center;
          position: relative;
          color: #f8fafc;
        }
        
        .code-section-title::after {
          content: '';
          position: absolute;
          bottom: -15px;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 4px;
          background: linear-gradient(90deg, #3b82f6, #8b5cf6);
          border-radius: 2px;
        }
        
        .code-feature-card {
          background: rgba(30, 41, 59, 0.7);
          border-radius: 15px;
          padding: 2rem;
          height: 100%;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .code-feature-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          border-color: rgba(59, 130, 246, 0.3);
        }
        
        .code-feature-icon {
          font-size: 2.5rem;
          margin-bottom: 1.5rem;
          background: linear-gradient(90deg, #3b82f6, #8b5cf6);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .code-demo {
          padding: 100px 0;
          background-color: #0f172a;
        }
        
        .code-editor-demo {
          background: #1a1a1a;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
        }
        
        .editor-header {
          background: #2d2d2d;
          padding: 0.75rem 1rem;
          display: flex;
          align-items: center;
        }
        
        .editor-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          margin-right: 8px;
        }
        
        .dot-red { background-color: #ff5f56; }
        .dot-yellow { background-color: #ffbd2e; }
        .dot-green { background-color: #27c93f; }
        
        .editor-body {
          padding: 1.5rem;
          font-family: 'Courier New', monospace;
          font-size: 1.1rem;
          line-height: 1.6;
        }
        
        .code-line {
          display: block;
          margin-bottom: 0.5rem;
        }
        
        .code-comment { color: #6a9955; }
        .code-keyword { color: #c586c0; }
        .code-function { color: #dcdcaa; }
        .code-var { color: #9cdcfe; }
        .code-string { color: #ce9178; }
        
        .fade-in {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .fade-in.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        @media (max-width: 992px) {
          .code-hero-title {
            font-size: 2.8rem;
          }
          
          .code-hero-subtitle {
            font-size: 1.2rem;
          }
        }
        
        @media (max-width: 768px) {
          .code-hero-title {
            font-size: 2.2rem;
          }
          
          .code-section-title {
            font-size: 2rem;
          }
        }
      `}</style>

      {/* Hero Section */}
      <section className="code-hero">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 code-hero-content">
              <h1 className="code-hero-title">Code Editor</h1>
              <p className="code-hero-subtitle">A Modern Multi-Language Code Editor & Execution Platform</p>
              <a href="https://infyskill-code.onrender.com/" className="cta-button">
                Try Code Editor Now <i className="fas fa-arrow-right ms-2"></i>
              </a>
            </div>
            <div className="col-lg-6 d-none d-lg-block">
              <img 
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMxZTJlM2IiLz4KICAgIDx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjE0IiBmaWxsPSIjZjhmYWZjIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zNWVtIj5mdW5jdGlvbiBoZWxsb1dvcmxkKCkgewogICAgY29uc29sZS5sb2coJ0hlbGxvIFdvcmxkJyk7Cn0KCmhlbGxvV29ybGQoKTs8L3RleHQ+CiAgICA8cmVjdCB4PSIyMCIgeT0iMjAiIHdpZHRoPSI2MCIgaGVpZ2h0PSIyMCIgcng9IjEwIiByeT0iMTAiIGZpbGw9IiM0M2FhNjMiLz4KICAgIDxyZWN0IHg9IjkwIiB5PSIyMCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjIwIiByeD0iMTAiIHJ5PSIxMCIgZmlsbD0iI2YwYzY0MyIvPgogICAgPHJlY3QgeD0iMTYwIiB5PSIyMCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjIwIiByeD0iMTAiIHJ5PSIxMCIgZmlsbD0iI2Y0NjY2MyIvPgo8L3N2Zz4="
                alt="Code Editor" 
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="code-features">
        <div className="container">
          <h2 className="code-section-title">Powerful Features</h2>
          <div className="row g-4">
            <div className="col-md-6 col-lg-4 fade-in">
              <div className="code-feature-card">
                <div className="code-feature-icon">
                  <i className="fas fa-code"></i>
                </div  >
                <h3 style={{color:'black'}} >Multi-Language Support</h3>
                <p style={{color:'white'}} >Write and execute code in multiple programming languages including JavaScript, Python, Java, C++, and more.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 fade-in">
              <div className="code-feature-card">
                <div className="code-feature-icon">
                  <i className="fas fa-bolt"></i>
                </div>
                <h3  style={{color:'black'}} >Real-time Execution</h3>
                <p style={{color:'white'}}  >See your code results instantly with our powerful execution engine. No setup or configuration needed.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 fade-in">
              <div className="code-feature-card">
                <div className="code-feature-icon">
                  <i className="fas fa-share-alt"></i>
                </div>
                <h3  style={{color:'black'}} >Collaborative Coding</h3>
                <p  style={{color:'white'}}  >Share your code with others and collaborate in real-time. Perfect for interviews, teaching, and team projects.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 fade-in">
              <div className="code-feature-card">
                <div className="code-feature-icon">
                  <i className="fas fa-cloud"></i>
                </div>
                <h3 style={{color:'black'}}  >Cloud Storage</h3>
                <p  style={{color:'white'}} >Save your code snippets in the cloud and access them from anywhere, on any device.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 fade-in">
              <div className="code-feature-card">
                <div className="code-feature-icon">
                  <i className="fas fa-mobile-alt"></i>
                </div>
                <h3 style={{color:'black'}}  >Fully Responsive</h3>
                <p style={{color:'white'}} >Code on the go with our mobile-friendly interface that works seamlessly on all devices.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 fade-in">
              <div className="code-feature-card">
                <div className="code-feature-icon">
                  <i className="fas fa-lock"></i>
                </div>
                <h3  style={{color:'black'}} >Secure & Private</h3>
                <p style={{color:'white'}} >Your code is secure with industry-standard encryption. We prioritize your privacy and data protection.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="code-demo">
        <div className="container">
          <h2 className="code-section-title">Live Code Demo</h2>
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="code-editor-demo fade-in">
                <div className="editor-header">
                  <div className="editor-dot dot-red"></div>
                  <div className="editor-dot dot-yellow"></div>
                  <div className="editor-dot dot-green"></div>
                  <span className="ms-2" style={{ color: '#f8fafc' }}>example.js</span>
                </div>
                <div className="editor-body">
                  <span className="code-line"><span className="code-comment">// JavaScript example</span></span>
                  <span className="code-line"><span className="code-keyword">function</span> <span className="code-function">greet</span>(name) {'{'}</span>
                  <span className="code-line">  <span className="code-keyword">return</span> <span className="code-string">{"`Hello, ${name}! Welcome to Code Editor.`"}</span>;</span>
                  <span className="code-line">{'}'}</span>
                  <span className="code-line"></span>
                  <span className="code-line"><span className="code-keyword">const</span> <span className="code-var">user</span> = <span className="code-string">"Developer"</span>;</span>
                  <span className="code-line"><span className="code-var">console</span>.<span className="code-function">log</span>(<span className="code-function">greet</span>(user));</span>
                  <span className="code-line"></span>
                  <span className="code-line"><span className="code-comment">// Output: Hello, Developer! Welcome to Code Editor.</span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="code-features">
        <div className="container">
          <h2 className="code-section-title">About Code Editor</h2>
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center fade-in">
              <p className="lead" style={{ color: '#94a3b8', fontSize: '1.25rem', marginBottom: '1rem' }}>
                Code Editor is designed for developers, by developers. Our mission is to provide a seamless coding experience that empowers you to write, test, and share code without any friction.
              </p>
              <p style={{ color: '#94a3b8' }}>
                Whether you're learning to code, preparing for technical interviews, or quickly testing an idea, Code Editor is the perfect tool for the job.
              </p>
              <a href="https://infyskill-code.onrender.com/" className="cta-button mt-4">
                Start Coding Now
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}