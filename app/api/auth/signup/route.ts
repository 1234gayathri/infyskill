import { NextRequest, NextResponse } from 'next/server';
import { resolveMx } from 'dns/promises';
import connectDB from '@/lib/db';
import User from '@/models/User';

export const runtime = 'nodejs';

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

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { name, email, password, confirmPassword } = await req.json();

    if (!name || !email || !password || !confirmPassword) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();

    if (name.length < 2) {
      return NextResponse.json({ message: 'Name must be at least 2 characters long' }, { status: 400 });
    }

    if (!/.+@.+\..+/.test(normalizedEmail)) {
      return NextResponse.json({ message: 'Email is not valid' }, { status: 400 });
    }

    const deliverable = await hasValidMailExchange(normalizedEmail);
    if (!deliverable) {
      return NextResponse.json({ message: 'Email domain could not be verified. Please use a valid email.' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ message: 'Password must be at least 6 characters long' }, { status: 400 });
    }

    if (password !== confirmPassword) {
      return NextResponse.json({ message: 'Passwords do not match' }, { status: 400 });
    }

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return NextResponse.json({ message: 'Email already registered' }, { status: 409 });
    }

    await User.create({ name, email: normalizedEmail, password });

    return NextResponse.json({ message: 'Signup successful' }, { status: 201 });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ 
      message: 'Server error', 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}