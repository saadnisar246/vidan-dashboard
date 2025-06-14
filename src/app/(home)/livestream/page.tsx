'use client';

import { useEffect, useState } from 'react';

interface Detection {
  car_id: number;
  car_bbox: [number, number, number, number]; // [x1, y1, x2, y2]
  plate_bbox: [number, number, number, number]; // [x1, y1, x2, y2]
  plate_score: number;
  plate_text: string;
  text_score: number;
}
interface FramePayload {
  stream: string;
  timestamp: string;
  frame: string; // base64-encoded image
  detections: Detection[];
}

export default function Livestream() {
  const [frames, setFrames] = useState<FramePayload[]>([]);

  useEffect(() => {
    const socket = new WebSocket('ws://192.168.0.188:8765');
    console.log('Connecting to WebSocket server at ws://192.168.0.188:8765');

    socket.onmessage = (event) => {
      try {
        const data: FramePayload = JSON.parse(event.data);
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
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Live Detections</h1>
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
              <div className="mt-2">
                {frame.detections.length > 0 ? frame.detections.map((det, idx) => (
                  <div key={idx} className="mb-2">
                    <p className="text-sm text-gray-600">Car ID: {det.car_id}</p>
                    <p className="text-sm text-gray-600">
                      Plate: {det.plate_text} 
                    </p>
                    <p className="text-sm text-gray-600">
                      Confidence Score: {det.plate_score.toFixed(2)}
                    </p>
                  </div>
                )): (
                  <p className="text-sm text-gray-500">No detections</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
