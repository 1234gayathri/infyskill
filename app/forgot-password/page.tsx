'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' | '' }>({ message: '', type: '' });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFeedback({ message: 'Sending reset link...', type: '' });

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || 'Unable to process request');
      }

      setFeedback({ message: data?.message || 'If an account exists, password reset instructions have been sent.{Check spam mail}', type: 'success' });
    } catch (error: any) {
      setFeedback({ message: error?.message || 'Unable to process request right now.', type: 'error' });
    }
  };

  return (
    <>
      <Navbar />
      <section className="auth-hero">
        <div className="container">
          <div className="auth-card">
            <h1>Reset your password</h1>
            <p>Enter the email linked to your account and we will help you set a new password.</p>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="resetEmail">Email</label>
                <input
                  type="email"
                  id="resetEmail"
                  name="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary btn-full">
                Send reset link
              </button>
            </form>
            {feedback.message && (
              <div className={`auth-feedback ${feedback.type}`}>{feedback.message}</div>
            )}
            <div className="auth-meta">
              <a href="/">Back to home</a>
            </div>
          </div>
          <div className="auth-side">
            <img src="/images/home.webp" alt="Forgot password" />
            <div className="auth-side-content">
              <h2>Secure account recovery</h2>
              <p>Reset your credentials quickly and get back to building your future.</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
