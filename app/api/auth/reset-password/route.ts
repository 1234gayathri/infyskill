import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'crypto';
import connectDB from '@/lib/db';
import User from '@/models/User';

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const { token, password, confirmPassword } = await req.json();

    if (!token || typeof token !== 'string') {
      return NextResponse.json({ message: 'Reset token is required' }, { status: 400 });
    }

    if (!password || typeof password !== 'string') {
      return NextResponse.json({ message: 'Password is required' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ message: 'Password must be at least 6 characters long' }, { status: 400 });
    }

    if (password !== confirmPassword) {
      return NextResponse.json({ message: 'Passwords do not match' }, { status: 400 });
    }

    const hashedToken = createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: new Date() },
    }).select('+password +resetPasswordToken +resetPasswordExpires');

    if (!user) {
      return NextResponse.json({ message: 'Reset token is invalid or has expired' }, { status: 400 });
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    return NextResponse.json({ message: 'Password has been reset successfully' });
  } catch (error) {
    console.error('Reset password error', error);
    return NextResponse.json({ message: 'Unable to reset password right now.' }, { status: 500 });
  }
}
