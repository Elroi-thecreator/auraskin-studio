import { NextResponse } from 'next/server';
import { VTO_LOOK_OPTIONS } from '@/lib/mock-data';

export async function GET() {
  return NextResponse.json({
    templates: VTO_LOOK_OPTIONS,
    total: VTO_LOOK_OPTIONS.length,
  });
}
