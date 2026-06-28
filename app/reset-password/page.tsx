'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' | '' }>({ message: '', type: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const value = searchParams.get('token');
    if (!value) {
      setFeedback({ message: 'Reset link is invalid. Request a new one.', type: 'error' });
    }
    setToken(value || '');
  }, [searchParams]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!token) {
      setFeedback({ message: 'Reset token is missing. Please request a new link.', type: 'error' });
      return;
    }

    setIsSubmitting(true);
    setFeedback({ message: 'Resetting password...', type: '' });

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password, confirmPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || 'Unable to reset password');
      }

      setFeedback({ message: data?.message || 'Password reset successfully. Redirecting to home...', type: 'success' });

      setTimeout(() => {
        router.push('/');
      }, 1500);
    } catch (error: any) {
      setFeedback({ message: error?.message || 'Unable to reset password right now.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <section className="auth-hero">
        <div className="container">
          <div className="auth-card">
            <h1>Create a new password</h1>
            <p>Enter a strong password that you haven&apos;t used before for this account.</p>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="newPassword">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  name="password"
                  required
                  minLength={6}
                  placeholder="Enter new password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  required
                  minLength={6}
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary btn-full" disabled={isSubmitting}>
                {isSubmitting ? 'Resetting...' : 'Reset Password'}
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
            <img src="/images/home.webp" alt="Reset password" />
            <div className="auth-side-content">
              <h2>Secure your account</h2>
              <p>Use a unique password to keep your InfySkill account safe.</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordContent />
    </Suspense>
  );
}
