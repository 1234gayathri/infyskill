'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLearnDropdown, setShowLearnDropdown] = useState(false);
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem('infyskill_token');
    setIsLoggedIn(!!token);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setShowLearnDropdown(false);
    setShowMoreDropdown(false);
  }, [pathname]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <Link href="/" className="logo">
          <img style={{ backgroundColor: 'white' }} src="/images/logotwo.png" height="40" width="150" alt="logo" />
        </Link>
        
        <div className={`navbar-toggle ${isMenuOpen ? 'active' : ''}`} id="mobile-menu" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
        
        <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/about">About Us</Link></li>
          
          <li 
            className={`dropdown ${showLearnDropdown ? 'active' : ''}`}
            onMouseEnter={() => setShowLearnDropdown(true)}
            onMouseLeave={() => setShowLearnDropdown(false)}
          >
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                setShowLearnDropdown(!showLearnDropdown);
              }}
              style={{
                textDecoration: 'none',
                color: 'var(--dark-color)',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              Learn With Us
            </a>
            <ul 
              className="dropdown-menu" 
              style={{
                display: showLearnDropdown ? 'block' : 'none',
                position: 'absolute',
                background: 'white',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                borderRadius: '8px',
                padding: '10px 0',
                minWidth: '200px',
                zIndex: 100
              }}
            >
              <div><Link href="/courses" style={{ display: 'block', padding: '8px 20px', color: '#1e293b', textDecoration: 'none' }}>Our Courses</Link></div>
              <div><Link href="/workshops" style={{ display: 'block', padding: '8px 20px', color: '#1e293b', textDecoration: 'none' }}>Our Workshops</Link></div>
              <div><Link href="/webinars" style={{ display: 'block', padding: '8px 20px', color: '#1e293b', textDecoration: 'none' }}>Our Webinars</Link></div>
            </ul>
          </li>
          
          <li><Link href="/projects">Academic Project Guidance</Link></li>
          <li><Link href="/insights">Verify Certificate</Link></li>
          
          <li 
            className={`dropdown ${showMoreDropdown ? 'active' : ''}`}
            onMouseEnter={() => setShowMoreDropdown(true)}
            onMouseLeave={() => setShowMoreDropdown(false)}
          >
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                setShowMoreDropdown(!showMoreDropdown);
              }}
              style={{
                textDecoration: 'none',
                color: 'var(--dark-color)',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              More
            </a>
            <ul 
              className="dropdown-menu" 
              style={{
                display: showMoreDropdown ? 'block' : 'none',
                position: 'absolute',
                background: 'white',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                borderRadius: '8px',
                padding: '10px 0',
                minWidth: '200px',
                zIndex: 100
              }}
            >
              <div><Link href="/careers" style={{ display: 'block', padding: '2px 20px', color: '#1e293b', textDecoration: 'none' }}>Careers</Link></div>
              <div><Link href="/contact" style={{ display: 'block', padding: '2px 20px', color: '#1e293b', textDecoration: 'none' }}>Contact Us</Link></div>
              <div><Link href="/create-resume" style={{ display: 'block', padding: '2px 20px', color: '#1e293b', textDecoration: 'none' }}>Create Resume</Link></div>
              <div><Link href="/portfolio-generator" style={{ display: 'block', padding: '2px 20px', color: '#1e293b', textDecoration: 'none' }}>Portfolio Builder</Link></div>
              <div><Link href="/code" style={{ display: 'block', padding: '2px 20px', color: '#1e293b', textDecoration: 'none' }}>Code Editor</Link></div>
            </ul>
          </li>

        </ul>
      </div>
    </nav>
  );
}