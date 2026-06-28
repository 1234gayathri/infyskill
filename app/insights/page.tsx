'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface CertificateData {
  Certificateid: string;
  Name: string;
  Workshopname: string;
  Designation: string;
  Duration: string;
}

export default function InsightsPage() {
  const [certificateId, setCertificateId] = useState('');
  const [verificationResult, setVerificationResult] = useState<CertificateData | null>(null);
  const [isInvalid, setIsInvalid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gsap && window.ScrollTrigger) {
      const gsap = window.gsap;
      const ScrollTrigger = window.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      gsap.utils.toArray('.reason-card').forEach((card: any) => {
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

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setVerificationResult(null);
    setIsInvalid(false);

    const trimmedId = certificateId.trim();

    try {
      const res = await fetch("https://opensheet.elk.sh/1qBC88TxFjuINhXS14C3_e_3-yvushF0F6dr1lZfuD3s/Sheet1");
      const data: CertificateData[] = await res.json();
      const match = data.find(item => item.Certificateid?.trim() === trimmedId);

      if (match) {
        setVerificationResult(match);
        setIsInvalid(false);
      } else {
        setVerificationResult(null);
        setIsInvalid(true);
      }
    } catch (error) {
      console.error('Error:', error);
      setVerificationResult(null);
      setIsInvalid(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      
      {/* Verify Hero */}
      <section className="verify-hero">
        <div className="container">
          <h1>Verify Certificate</h1>
          <p>Check the authenticity of InfySkill certificates</p>
        </div>
      </section>

      {/* Verification Form */}
      <section className="verification-form">
        <div className="container">
          <div className="form-container">
            <form id="certificateForm" onSubmit={handleVerify}>
              <div className="form-group">
                <label htmlFor="certificateId">Certificate ID</label>
                <input 
                  type="text" 
                  id="certificateId" 
                  name="certificateId"
                  value={certificateId}
                  onChange={(e) => setCertificateId(e.target.value)}
                  placeholder="Enter your certificate ID" 
                  required 
                />
              </div>
              <button type="submit" className="btn btn-primary" disabled={isLoading}>
                {isLoading ? 'Verifying...' : 'Verify Certificate'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Verification Result */}
      {verificationResult && (
        <section className="verification-result" id="verificationResult">
          <div className="container">
            <div className="result-container">
              <div className="result-header">
                <h2>Certificate Verified Successfully</h2>
                <p>The certificate is authentic and issued by InfySkill</p>
              </div>
              <div className="certificate-details">
                <div className="certificate-image">
                  <div className="certificate-details">
                    <div className="info-item">
                      <strong>Certificate ID:</strong><br />
                      <span id="resultId">{verificationResult.Certificateid || 'N/A'}</span>
                    </div>
                    <div className="info-item">
                      <strong>Name:</strong><br />
                      <span id="resultName">{verificationResult.Name || 'N/A'}</span>
                    </div>
                    <div className="info-item">
                      <strong>Course Domain:</strong><br />
                      <span id="resultCourse">{verificationResult.Workshopname || 'N/A'}</span>
                    </div>
                    <div className="info-item">
                      <strong>Designation:</strong><br />
                      <span id="resultDesignation">{verificationResult.Designation || 'N/A'}</span>
                    </div>
                    <div className="info-item">
                      <strong>Duration:</strong><br />
                      <span id="resultDate">{verificationResult.Duration || 'N/A'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Invalid Result */}
      {isInvalid && (
        <section className="verification-result invalid" id="invalidResult">
          <div className="container">
            <div className="result-container">
              <div className="result-header">
                <h2>Certificate Not Found</h2>
                <p>The certificate ID you entered is not valid</p>
              </div>
              <div className="certificate-info">
                <p>Please check the certificate ID and try again. If you believe this is an error, please contact our support team.</p>
                <a href="/contact" className="btn btn-secondary">Contact Support</a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Why Verify Section */}
      <section className="why-verify">
        <div className="container">
          <h2 className="section-title">Why Verify Certificates?</h2>
          <div className="reasons-grid">
            <div className="reason-card">
              <div className="reason-icon">
                <i className="fas fa-shield-alt" aria-hidden="true"></i>
              </div>
              <h3>Authenticity Check</h3>
              <p>Ensure the certificate is genuine and issued by InfySkill.</p>
            </div>
            <div className="reason-card">
              <div className="reason-icon">
                <i className="fas fa-user-tie" aria-hidden="true"></i>
              </div>
              <h3>Employer Verification</h3>
              <p>Employers can verify candidate credentials during hiring.</p>
            </div>
            <div className="reason-card">
              <div className="reason-icon">
                <i className="fas fa-graduation-cap" aria-hidden="true"></i>
              </div>
              <h3>Academic Records</h3>
              <p>Educational institutions can validate course completion.</p>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .certificate-details {
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-size: 15px;
        }

        .info-item {
          padding: 4px 0;
          line-height: 1.4;
        }

        .info-item strong {
          font-weight: 600;
          color: #222;
        }

        .info-item span {
          color: #444;
        }
      `}</style>

      <Footer />
    </>
  );
}