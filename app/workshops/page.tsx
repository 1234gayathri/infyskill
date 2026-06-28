'use client';

import { useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function WorkshopsPage() {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gsap && window.ScrollTrigger) {
      const gsap = window.gsap;
      const ScrollTrigger = window.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      gsap.utils.toArray('.past-workshop-card').forEach((card: any) => {
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

  const pastWorkshops = [
    {
      title: 'Web Development with HTML, CSS & JS',
      topics: [
        'HTML5 structure',
        'CSS styling & layouts',
        'JavaScript basics for interactivity'
      ]
    },
    {
      title: 'Python Programming for Beginners',
      topics: [
        'Python syntax, data types, conditionals',
        'Functions & loops',
        'Taking user input and displaying output'
      ]
    },
    {
      title: 'Machine Learning with Python',
      topics: [
        'Introduction to ML and scikit-learn',
        'Data preprocessing with pandas',
        'Linear Regression model'
      ]
    },
    {
      title: 'Data Science with Python',
      topics: [
        'Data cleaning with pandas',
        'Data visualization with matplotlib & seaborn'
      ]
    },
    {
      title: 'Android App Development (No Code or Basic Code)',
      topics: [
        'Intro to Android Studio or MIT App Inventor',
        'Designing UI',
        'Storing and displaying data'
      ]
    },
    {
      title: 'Cybersecurity Basics',
      topics: [
        'Cybersecurity concepts & tools',
        'Password cracking (wordlist method)',
        'Basic Linux commands'
      ]
    },
    {
      title: 'Artificial Intelligence with Python',
      topics: [
        'NLP basics',
        'Chatbot logic flow',
        'Python NLTK or ChatGPT API basics'
      ]
    },
    {
      title: 'Internet of Things (IoT) with Arduino',
      topics: [
        'Arduino basics',
        'Working with sensors',
        'Controlling appliances using smartphone'
      ]
    },
    {
      title: 'Blockchain Basics',
      topics: [
        'What is Blockchain?',
        'Hashing, mining, and chaining blocks'
      ]
    },
    {
      title: 'UI/UX Design with Figma',
      topics: [
        'UX Research basics',
        'Figma UI tools',
        'Prototyping and feedback'
      ]
    }
  ];

  return (
    <>
      <Navbar />
      
      {/* Workshops Hero */}
      <section className="workshops-hero">
        <div className="container">
          <h1>Our Workshops</h1>
          <p>Hands-on learning experiences to boost your skills in a short time</p>
        </div>
      </section>

      {/* Past Workshops */}
      <section className="past-workshops">
        <div className="container">
          <h2 className="section-title">Past Workshops</h2>
          <div className="past-workshop-grid">
            {pastWorkshops.map((workshop, index) => (
              <div key={index} className="past-workshop-card">
                <div className="past-workshop-content">
                  <h3>{workshop.title}</h3>
                  <p className="workshop-meta">
                    <i className="fas fa-calendar-alt"></i> Topics Covered:
                  </p>
                  <p>
                    {workshop.topics.map((topic, i) => (
                      <span key={i}>
                        - {topic}
                        {i < workshop.topics.length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workshop Benefits */}
      <section className="workshop-benefits">
        <div className="container">
          <h2 className="section-title">Why Attend Our Workshops?</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">
                <i className="fas fa-laptop-code"></i>
              </div>
              <h3>Hands-on Learning</h3>
              <p>Practical exercises and real-world projects to reinforce concepts.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">
                <i className="fas fa-chalkboard-teacher"></i>
              </div>
              <h3>Expert Instructors</h3>
              <p>Learn from industry professionals with years of experience.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">
                <i className="fas fa-certificate"></i>
              </div>
              <h3>Benefits</h3>
              <p>Enhances skills, builds network, boosts resume.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">
                <i className="fas fa-users"></i>
              </div>
              <h3>Networking</h3>
              <p>Connect with like-minded peers and industry experts.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}