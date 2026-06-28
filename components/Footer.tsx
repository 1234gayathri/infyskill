import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <h3>InfySkill</h3>
            <p>Empowering students with industry-relevant skills to build successful careers in technology.</p>
            <div className="social-links">
              <a href="https://www.facebook.com/share/18pPpK4Fqe/"><i className="fab fa-facebook-f"></i></a>
              <a href="https://whatsapp.com/channel/0029VaLkBaU3LdQdb07EJs2D"><i className="fa-brands fa-whatsapp"></i></a>
              <a href="https://www.linkedin.com/company/infyskill-edutech/"><i className="fab fa-linkedin-in"></i></a>
              <a href="https://www.instagram.com/infyskill_edutech?igsh=MmNzMWRzeGMxaHA3"><i className="fab fa-instagram"></i></a>
              <a href="https://youtube.com/@infyskill_edutech?si=cP0JuKxSKuO-zLFF"><i className="fab fa-youtube"></i></a>
            </div>
          </div>
          <div className="footer-col">
            <h3>Quick Links</h3>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/courses">Courses</Link></li>
              <li><Link href="/projects">Projects</Link></li>
              <li><Link href="/careers">Careers</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h3>Support</h3>
            <ul>
              <li><Link href="/contact">Contact Us</Link></li>
              <li><Link href="/insights">Verify Certificate</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h3>Contact Info</h3>
            <ul>
              <li><i className="fas fa-map-marker-alt"></i> P822+6W9 Visakhapatnam, Andhra Pradesh</li>
              <li><i className="fas fa-phone"></i> +91 9080087187</li>
              <li><i className="fas fa-phone"></i> +91 9347140822</li>
              <li><i className="fas fa-envelope"></i> infyskilledutech@gmail.com</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 InfySkill. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}