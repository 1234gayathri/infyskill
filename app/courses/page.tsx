'use client';

import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function CoursesPage() {
  const courses = [
    { title: 'Python Programming Language', desc: 'Master the versatile Python language, covering syntax, data types, control structures, functions, and object-oriented programming.', img: '/images/python.jpeg', link: 'python%20programming%20language' },
    { title: 'Java Programming Language', desc: "Dive into Java's object-oriented principles, learning to build robust applications.", img: '/images/java.jpeg', link: 'java%20programming%20language', style: { objectFit: 'contain' as const } },
    { title: 'MySQL', desc: 'Build professional Android apps using Kotlin and Java. Learn UI design, API integration, Firebase, and publishing to Google Play Store.', img: 'https://www.freepnglogos.com/uploads/logo-mysql-png/logo-mysql-mysql-and-moodle-elearningworld-5.png', link: 'mysql', style: { objectFit: 'contain' as const } },
    { title: 'MERN Stack Web Developement', desc: 'Become a full-stack developer by mastering MongoDB, Express.js, React, and Node.js.', img: '/images/Mern.jpeg', link: 'MERN%20STACK%20WEB%20DEVELOPMENT' },
    { title: 'Data Science', desc: 'Explore data analysis, visualization, and predictive modeling.', img: 'https://plus.unsplash.com/premium_photo-1661878265739-da90bc1af051?w=400', link: 'Data%20Science' },
    { title: 'Machine Learning Using Python', desc: 'Understand supervised and unsupervised learning techniques.', img: '/images/machineLearning.jpeg', link: 'Machine%20Learning%20with%20Python' },
    { title: 'Artificial Intelligence', desc: 'Delve into AI concepts including neural networks, NLP, and computer vision.', img: 'https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?w=400', link: 'Artificial%20Intelligence%20with%20Machine%20Learning' },
    { title: 'Cloud Computing', desc: 'Gain insights into cloud service models (IaaS, PaaS, SaaS).', img: 'https://plus.unsplash.com/premium_photo-1683120968693-9af51578770e?w=400', link: 'Cloud%20Computing' },
    { title: 'Ethical Hacking', desc: 'Understand cybersecurity principles and practices.', img: 'https://images.unsplash.com/photo-1544890225-2f3faec4cd60?w=400', link: 'Ethical%20Hacking' },
    { title: 'Front-End Web Developement', desc: 'Focus on building responsive and interactive user interfaces.', img: '/images/frontend.jpeg', link: 'Frontend%20Web%20Development' },
    { title: 'UI/UX Design', desc: 'Learn the principles of user interface and user experience design.', img: 'https://plus.unsplash.com/premium_photo-1720008915560-e7e723c0bfc8?w=400', link: 'UI%2FUX' },
    { title: 'Finance', desc: 'Learn the essentials of managing money, investments, and budgeting.', img: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=400', link: 'Finance' },
    { title: 'Digital Marketing', desc: 'Master online marketing strategies like SEO, social media, content marketing.', img: 'https://images.unsplash.com/photo-1557838923-2985c318be48?w=400', link: 'Digital%20Marketing' },
    { title: 'Human Resource Management', desc: 'Understand how to hire, train, and manage people effectively.', img: 'https://plus.unsplash.com/premium_photo-1683140546178-3f52a918bc57?w=400', link: 'Human%20Resources%20Management' },
    { title: 'Stock Market', desc: 'Explore how the stock market works and make smart trading decisions.', img: 'https://plus.unsplash.com/premium_photo-1664476845274-27c2dabdd7f0?w=400', link: 'Stock%20Market' },
    { title: 'Psychology', desc: 'Dive into the human mind — learn about behavior and emotions.', img: 'https://images.unsplash.com/photo-1573511860302-28c524319d2a?w=400', link: 'Psychology' },
    { title: 'IOT', desc: 'Learn how smart devices connect and communicate.', img: 'https://images.unsplash.com/photo-1614846027182-cecfee3a427b?w=400', link: 'IoT' },
    { title: 'Embedded Systems', desc: 'Explore the core of modern electronics.', img: 'https://plus.unsplash.com/premium_photo-1714618990464-bb4ddc34c542?w=400', link: 'Embedded%20Systems' },
    { title: 'Hybrid and Electric Vehicles', desc: 'Understand the technology behind EVs.', img: 'https://plus.unsplash.com/premium_photo-1664300426217-b1131ec9612b?w=400', link: 'Hybrid%20%26%20Electric%20Vehicles' },
    { title: 'VLSI', desc: 'Learn how integrated circuits are designed.', img: 'https://plus.unsplash.com/premium_photo-1661770132071-026114fffb61?w=400', link: 'VLSI' },
    { title: 'Nano Technology', desc: 'Discover the science of the very small.', img: 'https://plus.unsplash.com/premium_photo-1681426645543-ba5027b4c6ba?w=400', link: 'Nano%20Technology' },
    { title: 'AutoCad', desc: 'Master industry-standard 2D and 3D drafting tools.', img: 'https://images.unsplash.com/photo-1720879996903-24859d1df48f?w=400', link: 'AutoCAD' },
    { title: 'Python Programming (Telugu)', desc: 'Learn Python in Telugu - Free course!', img: 'https://images.unsplash.com/photo-1649180556628-9ba704115795?w=400', link: '', free: true, youtube: 'https://youtube.com/playlist?list=PLhQd9ED25ErJW0pC6BuG0wnCXRUXoGb0T' },
    { title: 'Java Programming (Telugu)', desc: 'Learn Java in Telugu - Free course!', img: 'https://freepnglogo.com/images/all_img/java-logo-52a1.png', link: '', free: true, youtube: 'https://youtube.com/playlist?list=PLhQd9ED25ErJzaq3gVIuCFxXB579R6yTm' },
    { title: 'HTML and CSS (Telugu)', desc: 'Learn HTML & CSS in Telugu - Free!', img: '/images/free1.jpeg', link: '', free: true, youtube: 'https://youtube.com/playlist?list=PLhQd9ED25ErIzoBnYlIeDqj6TCrjtiaoP' },
    { title: 'JavaScript (Telugu)', desc: 'Master JavaScript in Telugu - Free course!', img: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400', link: '', free: true, youtube: 'https://youtube.com/playlist?list=PLhQd9ED25ErKImj5F8UOudLvoyi2uD8h6' }
  ];

  return (
    <>
      <Navbar />
      <section className="courses-hero">
        <div className="container">
          <h1>Our Courses</h1>
          <p>Industry-relevant programs designed to make you job-ready</p>
        </div>
      </section>

      <section className="courses-list">
        <div className="container">
          <div className="course-cards">
            {courses.map((c, i) => (
              <div key={i} className="course-card">
                <div className="course-img">
                  <img src={c.img} alt={c.title} style={c.style} />
                </div>
                <div className="course-content">
                  <h3>{c.title}</h3>
                  <p>{c.desc}</p>
                  <div className="course-meta">
                    {!c.free && <span><i className="fas fa-money-bill-wave"></i> </span>}
                    {c.free && <span><i className="fas fa-money-bill-wave"></i> Free</span>}
                    <a href="https://whatsapp.com/channel/0029Vb6e6PzFnSz1v98Zrd1l" style={{textDecoration:'none'}}><i className="fas fa-tv"></i> More details</a>
                  </div>
                  <a href={c.youtube || `https://wa.me/919080087187?text=Hey%2C%20I%20want%20to%20enroll%20in%20${c.link}%20course`} className="btn btn-primary">{c.free ? 'Start Learning' : 'Enroll Now'}</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="course-benefits">
        <div className="container">
          <h2 className="section-title">Why Choose Our Courses?</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon"><i className="fas fa-chalkboard-teacher"></i></div>
              <h3>Industry Experts</h3>
              <p>Learn from professionals with real-world experience in top tech companies.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon"><i className="fas fa-briefcase"></i></div>
              <h3>Placement Support</h3>
              <p>Get career guidance, resume building, and interview preparation.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon"><i className="fas fa-laptop-code"></i></div>
              <h3>Hands-on Projects</h3>
              <p>Work on real projects to build your portfolio and gain practical experience.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon"><i className="fas fa-certificate"></i></div>
              <h3>Certification</h3>
              <p>Earn recognized certificates upon course completion.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}