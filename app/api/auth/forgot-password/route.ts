import { NextRequest, NextResponse } from 'next/server';
import { randomBytes, createHash } from 'crypto';
import nodemailer from 'nodemailer';
import connectDB from '@/lib/db';
import User from '@/models/User';

export const runtime = 'nodejs';

async function createTransporter() {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !port || !user || !pass) {
    throw new Error('SMTP configuration is missing. Please set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS.');
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

async function sendResetEmail(to: string, resetUrl: string) {
  const from = process.env.EMAIL_FROM;
  if (!from) {
    throw new Error('EMAIL_FROM is not configured.');
  }

  const transporter = await createTransporter();

  await transporter.sendMail({
    from,
    to,
    subject: 'InfySkill Password Reset',
    html: `
      <p>We received a request to reset your InfySkill password.</p>
      <p><a href="${resetUrl}" style="display:inline-block;padding:10px 20px;background:#4338ca;color:#fff;text-decoration:none;border-radius:6px;">Reset your password</a></p>
      <p>If the button doesn\'t work, copy and paste this link into your browser:</p>
      <p>${resetUrl}</p>
      <p>This link will expire in 10 minutes. If you didn\'t request this change, feel free to ignore this message.</p>
    `,
  });
}

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const { email } = await req.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ message: 'A valid email is required' }, { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail }).select('+resetPasswordToken +resetPasswordExpires');

    if (!user) {
      return NextResponse.json({ message: 'If an account exists, password reset instructions have been sent.' });
    }

    const resetToken = randomBytes(32).toString('hex');
    const hashedToken = createHash('sha256').update(resetToken).digest('hex');

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = new Date(Date.now() + 10 * 60 * 1000);
    await user.save({ validateBeforeSave: false });

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
    if (!baseUrl) {
      throw new Error('NEXT_PUBLIC_APP_URL is not configured.');
    }

    const resetUrl = `${baseUrl.replace(/\/$/, '')}/reset-password?token=${resetToken}`;

    await sendResetEmail(normalizedEmail, resetUrl);

    return NextResponse.json({ message: 'If an account exists, password reset instructions have been sent.' });
  } catch (error) {
    console.error('Forgot password error', error);
    return NextResponse.json({ message: 'Unable to process the request right now.' }, { status: 500 });
  }
}
