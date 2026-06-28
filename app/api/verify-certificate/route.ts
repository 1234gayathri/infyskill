import { NextRequest, NextResponse } from 'next/server';

const SPREADSHEET_URL = 'https://opensheet.elk.sh/1qBC88TxFjuINhXS14C3_e_3-yvushF0F6dr1lZfuD3s/Sheet1';

export async function POST(req: NextRequest) {
  try {
    const { certificateId } = await req.json();

    if (!certificateId) {
      return NextResponse.json({ message: 'Certificate ID is required' }, { status: 400 });
    }

    const res = await fetch(SPREADSHEET_URL);
    if (!res.ok) {
      throw new Error('Failed to fetch certificate data');
    }

    const data = await res.json();
    const match = data.find((item: any) => item.Certificateid?.trim() === certificateId.trim());

    if (match) {
      return NextResponse.json({ certificate: match });
    } else {
      return NextResponse.json({ message: 'Certificate not found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
