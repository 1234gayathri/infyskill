'use client';

import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('infyskill_token');

    const fetchUser = async () => {
      if (!token) {
        setUser({ name: 'Guest Developer', email: 'guest@infyskill.com' });
        return;
      }

      try {
        const response = await fetch('/api/user/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error('Unauthorized');
        }

        const data = await response.json();
        setUser(data.user);
      } catch (error) {
        setUser({ name: 'Guest Developer', email: 'guest@infyskill.com' });
      }
    };

    fetchUser();
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'GET',
        credentials: 'include'
      });
    } catch (error) {}

    localStorage.removeItem('infyskill_token');
    localStorage.removeItem('infyskill_user');
    router.push('/');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      
      <section className="dashboard">
        <div className="container">
          <div className="dashboard-header">
            <div>
              <h1>Welcome, <span id="dashboardName">{user.name}</span></h1>
              <p>Your personalized learning space.</p>
            </div>
            <button id="logoutBtn" className="btn btn-secondary" onClick={handleLogout}>
              Logout
            </button>
          </div>
          <div className="dashboard-grid">
            <div className="dashboard-card">
              <h2>Profile</h2>
              <div className="profile-info">
                <div className="profile-row">
                  <span>Name</span>
                  <strong id="profileName">{user.name}</strong>
                </div>
                <div className="profile-row">
                  <span>Email</span>
                  <strong id="profileEmail">{user.email}</strong>
                </div>
              </div>
            </div>
            <div className="dashboard-card">
              <h2>Quick Links</h2>
              <div className="quick-links">
                <a href="/courses" className="quick-link">
                  <i className="fas fa-book-open"></i>
                  <div>
                    <h3>Browse Courses</h3>
                    <p>Discover programs curated by industry experts.</p>
                  </div>
                </a>
                <a href="/create-resume" className="quick-link">
                  <i className="fas fa-file-alt"></i>
                  <div>
                    <h3>Build Resume</h3>
                    <p>Create a professional resume in minutes.</p>
                  </div>
                </a>
                <a href="/contact" className="quick-link">
                  <i className="fas fa-headset"></i>
                  <div>
                    <h3>Get Support</h3>
                    <p>Reach out to mentors and career advisors.</p>
                  </div>
                </a>
              </div>
            </div>
            <div className="dashboard-card">
              <h2>Your Progress</h2>
              <div className="progress-list">
                <div className="progress-item">
                  <div>
                    <h3>Onboarding</h3>
                    <p>Complete your profile to unlock tailored content.</p>
                  </div>
                  <span className="progress-tag">In Progress</span>
                </div>
                <div className="progress-item">
                  <div>
                    <h3>Course Completion</h3>
                    <p>Enroll in your first course to start learning.</p>
                  </div>
                  <span className="progress-tag">0%</span>
                </div>
              </div>
            </div>
            <div className="dashboard-card">
              <h2>Upcoming Events</h2>
              <div className="events-list">
                <div className="event-item">
                  <span className="event-date">Nov 10</span>
                  <div>
                    <h3>Resume Masterclass</h3>
                    <p>Build an ATS-friendly resume with recruiters.</p>
                  </div>
                </div>
                <div className="event-item">
                  <span className="event-date">Nov 14</span>
                  <div>
                    <h3>Tech Interview Clinic</h3>
                    <p>Mock interviews with industry mentors.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}