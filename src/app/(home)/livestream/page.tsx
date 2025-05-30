'use client';

import { useEffect, useState } from 'react';

interface FrameData {
  stream: string;
  timestamp: string;
  frame: string;
}

export default function Livestream() {
  const [frames, setFrames] = useState<FrameData[]>([]);

  useEffect(() => {
    const socket = new WebSocket('ws://192.168.0.184:8765');
    console.log('Connecting to WebSocket server at ws://192.168.0.184:8765');

    socket.onmessage = (event) => {
      try {
        const data: FrameData = JSON.parse(event.data);
        console.log('Received frame data:', data);
        setFrames((prevFrames) => [data, ...prevFrames]);
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Live Streams</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {frames.map((frame, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200"
          >
            <img
              src={`data:image/jpeg;base64,${frame.frame}`}
              alt={`Frame from ${frame.stream}`}
              className="w-full h-[240px] object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-700 truncate">{frame.stream}</h3>
              <p className="text-sm text-gray-500">{frame.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
