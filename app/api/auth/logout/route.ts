import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    cookies().set('token', '', {
      httpOnly: true,
      expires: new Date(0),
      path: '/',
    });

    return NextResponse.json({ message: 'Logged out' });
  } catch (error) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
