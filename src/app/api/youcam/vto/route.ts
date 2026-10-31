import { NextRequest, NextResponse } from 'next/server';
import { YouCamClient } from '@/lib/youcam-client';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { image, lookId, personaId } = body;

    const customApiKey = req.headers.get('x-youcam-api-key') || undefined;

    const client = new YouCamClient({
      apiKey: customApiKey,
    });

    const result = await client.applyLookVto(image || '', lookId || 'clean-girl', personaId);

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Error in /api/youcam/vto:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to apply Look VTO' },
      { status: 500 }
    );
  }
}
