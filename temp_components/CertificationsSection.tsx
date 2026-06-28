'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';

export default function CertificationsSection() {
  const certifications = [
    { img: '/images/isoCert.jpeg', alt: 'ISO Certified', name: 'ISO Certified' },
    { img: '/images/dpiitCert.png', alt: 'DPIIT STARTUP INDIA', name: 'DPIIT Startup India' },
    { img: '/images/mcaCert.jpeg', alt: 'MCA REGISTERED', name: 'MCA Registered' },
    { img: '/images/aicteCert.jpeg', alt: 'AICTE APPROVED', name: 'AICTE Approved' },
    { img: '/images/msme-logo.png', alt: 'MSME APPROVED', name: 'MSME Approved' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [prevTranslate, setPrevTranslate] = useState(0);
  
  const carouselRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const CARD_WIDTH = 300;
  const GAP = 30;
  const itemsToShow = 3;

  // Create infinite loop by tripling the items
  const infiniteItems = [...certifications, ...certifications, ...certifications];

  // Smooth scroll to index with ultra-smooth easing
  const scrollToIndex = useCallback((index: number, smooth = true) => {
    if (!trackRef.current) return;
    
    const offset = -(index * (CARD_WIDTH + GAP));
    
    if (smooth) {
      gsap.to(trackRef.current, {
        x: offset,
        duration: 1.2,
        ease: 'power4.inOut',
        overwrite: 'auto',
      });
    } else {
      gsap.set(trackRef.current, { x: offset });
    }
    
    setPrevTranslate(offset);
    setCurrentTranslate(offset);
  }, []);

  // Handle infinite loop reset
  useEffect(() => {
    if (currentIndex >= certifications.length * 2) {
      setTimeout(() => {
        scrollToIndex(certifications.length, false);
        setCurrentIndex(certifications.length);
      }, 800);
    } else if (currentIndex < certifications.length && currentIndex > 0) {
      scrollToIndex(currentIndex, true);
    } else if (currentIndex === 0) {
      scrollToIndex(certifications.length, false);
      setCurrentIndex(certifications.length);
    } else {
      scrollToIndex(currentIndex, true);
    }
  }, [currentIndex, scrollToIndex, certifications.length]);

  // Navigation functions
  const goToNext = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => {
      if (prev <= certifications.length) {
        return certifications.length * 2 - 1;
      }
      return prev - 1;
    });
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(certifications.length + index);
  };

  // Drag handlers
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setStartX(clientX);
    if (trackRef.current) {
      const transform = window.getComputedStyle(trackRef.current).transform;
      const matrix = new DOMMatrix(transform);
      setPrevTranslate(matrix.m41);
    }
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !trackRef.current) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const diff = clientX - startX;
    const newTranslate = prevTranslate + diff * 0.8; // Damping for smoothness
    setCurrentTranslate(newTranslate);
    gsap.to(trackRef.current, {
      x: newTranslate,
      duration: 0.3,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const movedBy = currentTranslate - prevTranslate;
    const threshold = (CARD_WIDTH + GAP) * 0.25;
    
    if (movedBy < -threshold) {
      goToNext();
    } else if (movedBy > threshold) {
      goToPrev();
    } else {
      // Smooth snap back with elastic easing
      if (trackRef.current) {
        gsap.to(trackRef.current, {
          x: prevTranslate,
          duration: 0.8,
          ease: 'elastic.out(1, 0.5)',
        });
      }
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrev();
      if (e.key === 'ArrowRight') goToNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Initial animation
  useEffect(() => {
    if (!carouselRef.current) return;
    
    gsap.fromTo(
      '.cert-card',
      { opacity: 0, scale: 0.8, y: 50 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'back.out(1.4)',
      }
    );

    // Initialize position
    scrollToIndex(certifications.length, false);
    setCurrentIndex(certifications.length);
  }, []);

  const getActiveIndex = () => {
    return ((currentIndex - certifications.length) % certifications.length + certifications.length) % certifications.length;
  };

  return (
    <section className="certifications">
      <div className="container">
        <h2 className="section-title">Our Certifications & Recognitions</h2>
        
        <div 
          className="advanced-carousel"
          ref={carouselRef}
        >
          {/* Carousel Track */}
          <div className="carousel-viewport">
            <div 
              ref={trackRef}
              className="carousel-track"
              onMouseDown={handleDragStart}
              onMouseMove={handleDragMove}
              onMouseUp={handleDragEnd}
              onMouseLeave={handleDragEnd}
              onTouchStart={handleDragStart}
              onTouchMove={handleDragMove}
              onTouchEnd={handleDragEnd}
            >
              {infiniteItems.map((cert, index) => (
                <div 
                  key={`${cert.alt}-${index}`} 
                  className="cert-card-advanced"
                  style={{
                    minWidth: `${CARD_WIDTH}px`,
                    marginRight: `${GAP}px`,
                  }}
                >
                  <div className="cert-card-inner">
                    <div className="cert-shine"></div>
                    <img 
                      src={cert.img} 
                      alt={cert.alt}
                      draggable={false}
                    />
                    <div className="cert-overlay">
                      <p className="cert-name">{cert.name}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="carousel-dots">
            {certifications.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${getActiveIndex() === index ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              >
                <span className="dot-inner"></span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}