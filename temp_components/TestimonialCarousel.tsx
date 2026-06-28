'use client';

export default function TestimonialCarousel() {
  const testimonials = [
    '/images/testimonial1.webp',
    '/images/testimonial2.webp',
    '/images/testimonial3.webp',
    '/images/testimonial4.webp',
    '/images/testimonial5.webp',
    '/images/testimonial6.webp',
  ];

  return (
    <div className="testimonial-carousel">
      <div className="testimonial-track">
        {[...testimonials, ...testimonials].map((img, index) => (
          <div key={index} className="testimonial-slide">
            <img src={img} alt="Student Testimonial" />
          </div>
        ))}
      </div>
    </div>
  );
}