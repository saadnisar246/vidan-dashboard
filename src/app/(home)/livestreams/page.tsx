// 'use client';

// import { useEffect, useState } from 'react';
// import { Skeleton } from "@/components/ui/skeleton";

// interface FrameData {
//   stream: string;
//   timestamp: string;
//   frame: string; // base64 JPEG
// }

// export default function LiveVideosPage() {
//   const [latestFrames, setLatestFrames] = useState<Record<string, string>>({});
//   const [loading, setLoading] = useState(true);
//   const [timedOut, setTimedOut] = useState(false);

//   useEffect(() => {
//     const WS_URL = `ws://192.168.0.188:8865`;
//     console.log('Attempting WebSocket connect to:', WS_URL);

//     const socket = new WebSocket(WS_URL);
//     const timeout = setTimeout(() => {
//       if (Object.keys(latestFrames).length === 0) {
//         setLoading(false);
//         setTimedOut(true);
//         socket.close();
//       }
//     }, 10000); // 10 seconds timeout

//     socket.onopen = () => {
//       console.log('WebSocket onopen fired ✅');
//     };

//     socket.onmessage = (event) => {
//       try {
//         const data: FrameData = JSON.parse(event.data);
//         setLatestFrames((prev) => ({
//           ...prev,
//           [data.stream]: data.frame,
//         }));
//         setLoading(false);
//         clearTimeout(timeout);
//       } catch (err) {
//         console.error('Failed to parse incoming message:', err);
//       }
//     };

//     socket.onerror = (err) => {
//       console.error('WebSocket encountered error:', err);
//     };

//     socket.onclose = (ev) => {
//       console.warn('WebSocket closed:', ev);
//     };

//     return () => {
//       clearTimeout(timeout);
//       socket.close();
//     };
//   }, []);

//   const streamNames = Object.keys(latestFrames).sort();

//   return (
//     <div className="min-h-screen bg-gray-100 py-8 px-4">
//       <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
//         Live Video Feeds
//       </h1>

//       <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6">
//         {loading ? (
//           Array.from({ length: 4 }).map((_, idx) => (
//             <div key={idx} className="p-4 space-y-4 bg-white shadow rounded">
//               <Skeleton className="h-72 w-full" />
//               <Skeleton className="h-4 w-1/2" />
//             </div>
//           ))
//         ) : streamNames.length > 0 ? (
//           streamNames.map((streamKey) => {
//             const b64 = latestFrames[streamKey];
//             return (
//               <div
//                 key={streamKey}
//                 className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200"
//               >
//                 <img
//                   src={`data:image/jpeg;base64,${b64}`}
//                   alt={`Live feed: ${streamKey}`}
//                   className="w-full h-72 object-cover bg-black"
//                 />
//                 <div className="p-2">
//                   <h3 className="text-md font-semibold text-gray-700 truncate">
//                     {streamKey}
//                   </h3>
//                 </div>
//               </div>
//             );
//           })
//         ) : timedOut ? (
//           <div className="col-span-full text-center text-red-500">
//             ❌ No live streams detected after waiting. Please check the server.
//           </div>
//         ) : (
//           <div className="col-span-full text-center text-gray-500">
//             Awaiting video streams…
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
'use client';

import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const STREAM_NAMES = ['ppe', 'sspd', 'lpr']; // Add more stream names here if needed
const MEDIAMTX_HOST = '192.168.0.188:8889';

export default function LiveVideosPage() {
  const [loading, setLoading] = useState(true);
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
      setTimedOut(true);
    }, 10000); // 10 seconds

    // Simulate load done
    const preloadCheck = setTimeout(() => {
      setLoading(false);
    }, 1000); // Simulate brief load for UI feedback

    return () => {
      clearTimeout(timeout);
      clearTimeout(preloadCheck);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Live WebRTC Feeds
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6">
        {loading ? (
          Array.from({ length: STREAM_NAMES.length }).map((_, idx) => (
            <div key={idx} className="p-4 space-y-4 bg-white shadow rounded">
              <Skeleton className="h-72 w-full" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))
        ) : STREAM_NAMES.length > 0 ? (
          STREAM_NAMES.map((name) => (
            <div
              key={name}
              className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200"
            >
              <iframe
                src={`http://${MEDIAMTX_HOST}/${name}`}
                title={`Stream ${name}`}
                // allow="autoplay; fullscreen"
                className="w-full h-72 bg-black object-cover"
              ></iframe>
              <div className="p-2">
                <h3 className="text-md font-semibold text-gray-700 truncate">
                  {name}
                </h3>
              </div>
            </div>
          ))
        ) : timedOut ? (
          <div className="col-span-full text-center text-red-500">
            ❌ No live streams detected after waiting. Please check the server.
          </div>
        ) : (
          <div className="col-span-full text-center text-gray-500">
            Awaiting video streams…
          </div>
        )}
      </div>
    </div>
  );
}
