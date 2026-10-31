import { NextRequest, NextResponse } from 'next/server';
import { YouCamClient } from '@/lib/youcam-client';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { image, personaId } = body;

    // Check for client-provided API key override header
    const customApiKey = req.headers.get('x-youcam-api-key') || undefined;

    const client = new YouCamClient({
      apiKey: customApiKey,
    });

    const result = await client.analyzeSkin(image || '', personaId);

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Error in /api/youcam/analyze:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to analyze skin' },
      { status: 500 }
    );
  }
}
