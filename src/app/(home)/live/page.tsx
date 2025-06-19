// app/live-videos/page.tsx (or wherever you mount your component)
'use client';
import { useEffect, useState } from 'react';

interface FrameData {
  stream: string;
  timestamp: string;
  frame: string; // base64 JPEG
}

export default function LiveVideosPage() {
  const [latestFrames, setLatestFrames] = useState<Record<string, string>>({});

  useEffect(() => {   
    // ← Replace “localhost” with your Ubuntu IP:
    const WS_URL = `ws://192.168.0.188:8865`;
    console.log('Attempting WebSocket connect to:', WS_URL);

    const socket = new WebSocket(WS_URL);
    // console.log(socket);
    // console.log("WS readyState:", socket.readyState);

    socket.onopen = () => {
      console.log('WebSocket onopen fired ✅');
    };

    socket.onmessage = (event) => {
      try {
        const data: FrameData = JSON.parse(event.data);
        setLatestFrames((prev) => ({
          ...prev,
          [data.stream]: data.frame,
        }));
      } catch (err) {
        console.error('Failed to parse incoming message:', err);
      }
    };

    socket.onerror = (err) => {
      console.error('WebSocket encountered error:', err);
    };

    socket.onclose = (ev) => {
      console.warn('WebSocket closed:', ev);
      // You could try reconnecting here if desired.
    };

    return () => {
      socket.close();
    };
  }, []);

  const streamNames = Object.keys(latestFrames).sort();

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Live Video Feeds
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6">
        {streamNames.map((streamKey) => {
          const b64 = latestFrames[streamKey];
          return (
            <div
              key={streamKey}
              className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200"
            >
              <img
                src={`data:image/jpeg;base64,${b64}`}
                alt={`Live feed: ${streamKey}`}
                className="w-full h-72 object-cover bg-black"
              />
              <div className="p-2">
                <h3 className="text-md font-semibold text-gray-700 truncate">
                  {streamKey}
                </h3>
              </div>
            </div>
          );
        })}

        {streamNames.length === 0 && (
          <div className="col-span-full text-center text-gray-500">
            Awaiting video streams…
          </div>
        )}
      </div>
    </div>
  );
}
