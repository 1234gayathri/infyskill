'use client';

import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';

export default function GallerySection() {
  const images = [
    '/images/image01.jpg', '/images/image02.jpg', '/images/image03.jpg',
    '/images/image04.jpg', '/images/image05.jpg', '/images/image06.jpg',
    '/images/image07.jpg', '/images/image08.jpg', '/images/image09.jpg',
    '/images/image10.jpg', '/images/image20.jpg', '/images/image12.jpg',
    '/images/image15.jpg', '/images/image16.jpg', '/images/image17.jpg', 
    '/images/image18.jpg','images/image19.jpg','images/image11.jpg','images/image13.jpg','images/image21.jpg','images/image22.jpg','images/image23.jpg'
  ];

  const [selectedImage, setSelectedImage] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [hasMoved, setHasMoved] = useState(false);

  // Handle thumbnail click
  const handleThumbnailClick = (index: number) => {
    if (!hasMoved) {
      setSelectedImage(index);
      gsap.fromTo(
        '.gallery-featured-image',
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' }
      );
    }
  };

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setHasMoved(false);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    setHasMoved(true);
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setHasMoved(false);
    setStartX(e.touches[0].pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !containerRef.current) return;
    setHasMoved(true);
    const x = e.touches[0].pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Animate items on mount
  useEffect(() => {
    gsap.fromTo(
      '.gallery-item-card',
      { opacity: 0, y: 30, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
      }
    );
  }, []);

  return (
    <section className="gallery">
      <div className="container">
        <h2 className="section-title">Our Gallery</h2>
        
        <div className="gallery-layout">
          {/* Featured Image */}
          <div className="gallery-featured">
            <img 
              src={images[selectedImage]} 
              alt="Featured Gallery Image"
              className="gallery-featured-image"
            />
          </div>

          {/* Thumbnail Carousel */}
          <div 
            ref={containerRef}
            className={`gallery-thumbnails-container ${isDragging ? 'dragging' : ''}`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="gallery-thumbnails-track">
              {images.map((img, index) => (
                <div 
                  key={index} 
                  className={`gallery-thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => handleThumbnailClick(index)}
                >
                  <img 
                    src={img} 
                    alt={`Thumbnail ${index + 1}`}
                    draggable={false}
                  />
                  <div className="thumbnail-overlay"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
