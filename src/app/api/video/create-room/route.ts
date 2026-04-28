import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const DAILY_API_KEY = process.env.DAILY_API_KEY;

    if (!DAILY_API_KEY) {
      return NextResponse.json({ error: 'Daily.co API Key is missing' }, { status: 500 });
    }

    // Generate a unique 1-on-1 meeting room
    const response = await fetch('https://api.daily.co/v1/rooms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${DAILY_API_KEY}`,
      },
      body: JSON.stringify({
        properties: {
          exp: Math.floor(Date.now() / 1000) + 86400, // Expires in 24 hours
          eject_at_room_exp: true,
          enable_knocking: true, // Requires counselor to admit student
          enable_screenshare: true,
          enable_chat: true,
        },
      }),
    });

    const room = await response.json();

    if (!response.ok) {
      throw new Error(room.error || 'Failed to create room');
    }

    // room.url is the magic link that instantly opens the secure video call
    return NextResponse.json({ roomUrl: room.url });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Error creating Daily.co room:', err);
    return NextResponse.json({ error: err.message || 'Server Error' }, { status: 500 });
  }
}
