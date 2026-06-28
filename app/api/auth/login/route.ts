export const runtime = 'nodejs'; // Prevent Edge runtime issues
import { NextRequest, NextResponse } from 'next/server';
import { resolveMx } from 'dns/promises';
import jwt, { SignOptions, Secret } from 'jsonwebtoken';
import connectDB from '@/lib/db';
import User from '@/models/User';
import { cookies } from 'next/headers';

const emailRegex = /.+@.+\..+/;

async function hasValidMailExchange(email: string): Promise<boolean> {
  const domain = email.split('@')[1]?.toLowerCase();
  if (!domain) {
    return false;
  }

  try {
    const records = await resolveMx(domain);
    return Array.isArray(records) && records.length > 0;
  } catch (error) {
    console.error('MX lookup failed', error);
    return false;
  }
}

// ✅ Generate JWT Token (Type-safe)
const generateToken = (userId: string): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET not defined in environment variables');

  const expiresIn: SignOptions['expiresIn'] =
    (process.env.JWT_EXPIRES_IN as SignOptions['expiresIn']) || '7d';

  return jwt.sign({ id: userId }, secret as Secret, { expiresIn });
};

// ✅ Login Route
export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();

    if (!emailRegex.test(normalizedEmail)) {
      return NextResponse.json({ message: 'Email is not valid' }, { status: 400 });
    }

    const deliverable = await hasValidMailExchange(normalizedEmail);
    if (!deliverable) {
      return NextResponse.json({ message: 'Email domain could not be verified. Please use a valid email.' }, { status: 400 });
    }

    const user = await User.findOne({ email: normalizedEmail }).select('+password');
    if (!user) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const token = generateToken(String(user._id));


    // ✅ Set cookie securely
    cookies().set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    });

    return NextResponse.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Login Error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
