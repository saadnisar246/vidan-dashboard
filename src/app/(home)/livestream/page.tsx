// 'use client';

// import { useEffect, useState } from 'react';
// import { KPIFilter } from "./components/KPIFilter";

// // Detection Types

// interface LPRDetection {
//   car_id: number;
//   car_bbox: [number, number, number, number];
//   plate_bbox: [number, number, number, number];
//   plate_score: number;
//   plate_text: string;
//   text_score: number;
// }

// interface PPEDetection {
//   person_id: number;
//   bbox: [number, number, number, number];
//   ear: boolean;
//   ear_mufs: boolean;
//   face: boolean;
//   face_guard: boolean;
//   face_mask: boolean;
//   foot: boolean;
//   tool: boolean;
//   glasses: boolean;
//   gloves: boolean;
//   helmet: boolean;
//   hands: boolean;
//   head: boolean;
//   medical_suit: boolean;
//   shoes: boolean;
//   safety_suit: boolean;
//   safety_vest: boolean;
// }

// interface SSPDetection {
//   zone_id: number
//   status: string; 
// }

// // Base FramePayload (generic for multiple tasks)
// interface FramePayload {
//   stream: string;
//   timestamp: string;
//   task: string;
//   frame: string;
//   detections: any[]; // will be cast dynamically
// }

// function renderDetections(task: string, detections: any[]) {
//   switch (task) {
//     case "lpr":
//       return detections.map((det: LPRDetection, idx) => (
//         <div key={idx} className="mb-2">
//           <p className="text-sm text-gray-600">Car ID: {det.car_id}</p>
//           <p className="text-sm text-gray-600">Plate: {det.plate_text}</p>
//           <p className="text-sm text-gray-600">
//             Confidence Score: {det.plate_score.toFixed(2)}
//           </p>
//         </div>
//       ));
//     case "ppe":
//       return detections.map((det: PPEDetection, idx) => (
//         <div key={idx} className="mb-2 grid grid-cols-3 gap-2">
//           <p className="text-sm text-gray-600 col-span-3 font-bold">Person ID: {det.person_id}</p>
//           <p className={`text-sm text-gray-600 ${det.ear ? "font-bold" : ""}`}>Ear: {det.ear ? "Yes" : "No"}</p>
//           <p className={`text-sm text-gray-600 ${det.ear_mufs ? "font-bold" : ""}`}>Ear Mufs: {det.ear_mufs ? "Yes" : "No"}</p>
//           <p className={`text-sm text-gray-600 ${det.face ? "font-bold" : ""}`}>Face: {det.face ? "Yes" : "No"}</p>
//           <p className={`text-sm text-gray-600 ${det.face_guard ? "font-bold" : ""}`}>Face Guard: {det.face_guard ? "Yes" : "No"}</p>
//           <p className={`text-sm text-gray-600 ${det.face_mask ? "font-bold" : ""}`}>Face Mask: {det.face_mask ? "Yes" : "No"}</p>
//           <p className={`text-sm text-gray-600 ${det.foot ? "font-bold" : ""}`}>Foot: {det.foot ? "Yes" : "No"}</p>
//           <p className={`text-sm text-gray-600 ${det.tool ? "font-bold" : ""}`}>Tool: {det.tool ? "Yes" : "No"}</p>
//           <p className={`text-sm text-gray-600 ${det.glasses ? "font-bold" : ""}`}>Glasses: {det.glasses ? "Yes" : "No"}</p>
//           <p className={`text-sm text-gray-600 ${det.gloves ? "font-bold" : ""}`}>Gloves: {det.gloves ? "Yes" : "No"}</p>
//           <p className={`text-sm text-gray-600 ${det.helmet ? "font-bold" : ""}`}>Helmet: {det.helmet ? "Yes" : "No"}</p>
//           <p className={`text-sm text-gray-600 ${det.hands ? "font-bold" : ""}`}>Hands: {det.hands ? "Yes" : "No"}</p>
//           <p className={`text-sm text-gray-600 ${det.head ? "font-bold" : ""}`}>Head: {det.head ? "Yes" : "No"}</p>
//           <p className={`text-sm text-gray-600 ${det.medical_suit ? "font-bold" : ""}`}>Medical Suit: {det.medical_suit ? "Yes" : "No"}</p>
//           <p className={`text-sm text-gray-600 ${det.shoes ? "font-bold" : ""}`}>Shoes: {det.shoes ? "Yes" : "No"}</p>
//           <p className={`text-sm text-gray-600 ${det.safety_suit ? "font-bold" : ""}`}>Safety Suit: {det.safety_suit ? "Yes" : "No"}</p>
//           <p className={`text-sm text-gray-600 ${det.safety_vest ? "font-bold" : ""}`}>Safety Vest: {det.safety_vest ? "Yes" : "No"}</p>
//         </div>
//       ));
//     case "sspd":
//       return detections.map((det: SSPDetection, idx) => (
//         <div key={idx} className="mb-2">
//           <p className="text-sm text-gray-600">Zone ID: {det.zone_id}</p>
//           <p className="text-sm text-gray-600">Status: {det.status}</p>
//         </div>
//       ));

//     default:
//       return <p className="text-sm text-gray-500">No renderer for this task</p>;
//   }
// }

// export default function Livestream() {
//   const [selectedKPI, setSelectedKPI] = useState<string | null>(null);
//   const [frames, setFrames] = useState<FramePayload[]>([]);

//   useEffect(() => {
//     const socket = new WebSocket('ws://192.168.0.188:8765');
//     console.log('Connecting to WebSocket server at ws://192.168.0.188:8765');

//     socket.onmessage = (event) => {
//       try {
//         const data: FramePayload = JSON.parse(event.data);
//         console.log('Received frame data:', {
//           ...data,
//           frame: data.frame?.substring(0, 30) + '...', // Avoid flooding console
//         });
//         setFrames((prevFrames) => [data, ...prevFrames]);
//       } catch (error) {
//         console.error('Error parsing message:', error);
//       }
//     };

//     return () => {
//       socket.close();
//     };
//   }, []);

//   const filteredFrames = selectedKPI
//     ? frames.filter((frame) => frame.task === selectedKPI)
//     : frames;

//   return (
//     <div className="min-h-screen bg-gray-100 py-8 px-4">
//       <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Live Detections</h1>

//       <div className="lg:px-6">
//         <KPIFilter selected={selectedKPI} setSelected={setSelectedKPI} />
//       </div>

//       {filteredFrames.length === 0 ? (
//         <p className="text-center text-gray-500 mt-10">No frames yet for selected KPI.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
//           {filteredFrames.map((frame, idx) => (
//             <div
//               key={`${frame.timestamp}-${frame.stream}-${idx}`}
//               className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200"
//             >
//               <img
//                 src={`data:image/jpeg;base64,${frame.frame}`}
//                 alt={`Frame from ${frame.stream}`}
//                 className="w-full h-[320px] object-contain"
//               />
//               <div className="p-4">
//                 <h3 className="text-lg font-semibold text-gray-700 truncate">{frame.stream}</h3>
//                 <p className="text-sm text-gray-500">{frame.timestamp}</p>
//                 <div className="mt-2">
//                   <p className="text-base text-gray-600">Task: {frame.task.toUpperCase()}</p>
//                   {/* <p className="text-base text-gray-600">Task Detections: {frame.detections}</p> */}
//                   {frame.detections.length > 0 ? (
//                     renderDetections(frame.task, frame.detections)
//                   ) : (
//                     <p className="text-sm text-gray-500">No detections</p>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }


'use client';

import { useEffect, useState } from 'react';
import { KPIFilter } from "./components/KPIFilter";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

// Detection Types
interface LPRDetection {
  car_id: number;
  car_bbox: [number, number, number, number];
  plate_bbox: [number, number, number, number];
  plate_score: number;
  plate_text: string;
  text_score: number;
}

interface PPEDetection {
  person_id: number;
  bbox: [number, number, number, number];
  ear: boolean;
  ear_mufs: boolean;
  face: boolean;
  face_guard: boolean;
  face_mask: boolean;
  foot: boolean;
  tool: boolean;
  glasses: boolean;
  gloves: boolean;
  helmet: boolean;
  hands: boolean;
  head: boolean;
  medical_suit: boolean;
  shoes: boolean;
  safety_suit: boolean;
  safety_vest: boolean;
}

interface SSPDetection {
  zone_id: number;
  status: string;
}

interface FramePayload {
  stream: string;
  timestamp: string;
  task: string;
  frame: string;
  detections: any[];
}

interface SSPDPair {
  zone_id: number;
  login?: FramePayload;
  logout?: FramePayload;
}

function renderDetections(task: string, detections: any[]) {
  switch (task) {
    case "lpr":
      return detections.map((det: LPRDetection, idx) => (
        <div key={idx} className="mb-2">
          <p className="text-sm text-gray-600">Car ID: {det.car_id}</p>
          <p className="text-sm text-gray-600">Plate: {det.plate_text}</p>
          <p className="text-sm text-gray-600">
            Confidence Score: {det.plate_score.toFixed(2)}
          </p>
        </div>
      ));
    case "ppe":
      return detections.map((det: PPEDetection, idx) => (
        <div key={idx} className="mb-2 grid grid-cols-3 gap-2">
          <p className="text-sm text-gray-600 col-span-3 font-bold">Person ID: {det.person_id}</p>
          {Object.entries(det).filter(([key]) => key !== 'person_id' && typeof det[key as keyof PPEDetection] === 'boolean').map(([key, value]) => (
            <p key={key} className={`text-sm text-gray-600 ${value ? "font-bold" : ""}`}>{key.replace("_", " ")}: {value ? "Yes" : "No"}</p>
          ))}
        </div>
      ));
    case "sspd":
      return detections.map((det: SSPDetection, idx) => (
        <div key={idx} className="mb-2">
          <p className="text-sm text-gray-600">Zone ID: {det.zone_id}</p>
          <p className="text-sm text-gray-600">Status: {det.status}</p>
        </div>
      ));
    default:
      return <p className="text-sm text-gray-500">No renderer for this task</p>;
  }
}

export default function Livestream() {
  const [selectedKPI, setSelectedKPI] = useState<string | null>(null);
  const [frames, setFrames] = useState<FramePayload[]>([]);
  const [sspdPairs, setSspdPairs] = useState<SSPDPair[]>([]);
  const [modalIndex, setModalIndex] = useState<number | null>(null);

  useEffect(() => {
    const socket = new WebSocket('ws://192.168.0.188:8765');
    console.log('Connecting to WebSocket server at ws://192.168.0.188:8765');

    socket.onmessage = (event) => {
      try {
        const data: FramePayload = JSON.parse(event.data);
        console.log('Received frame data:', {
          ...data,
          frame: data.frame?.substring(0, 30) + '...', // Avoid flooding console
        });
        if (data.task === "sspd") {
          const det = data.detections[0] as SSPDetection;
          setSspdPairs(prev => {
            const updated = [...prev];
            // Look for incomplete pair
            console.log('Creating card logic');
            let pair = updated.find(p => p.zone_id === det.zone_id && !p.logout);
            console.log('Found pair:', pair);
            if (!pair || (pair.login && pair.logout)) {
              // Start new pair

              updated.unshift({ zone_id: det.zone_id, [det.status.toLowerCase()]: data });
              console.log('Creating new pair:', updated[0]);
            } else {
              pair[det.status.toLowerCase() as 'login' | 'logout'] = data;
              console.log('Updated existing pair:', pair);
            }
            return updated;
          });
        } else {
          setFrames(prev => [data, ...prev]);
        }
      } catch (err) {
        console.error("Failed to parse websocket frame", err);
      }
    };
    return () => socket.close();
  }, []);

  const allFrames = [
    ...frames,
    ...sspdPairs.flatMap(pair => [pair.login, pair.logout].filter(Boolean) as FramePayload[])
  ];

  const filteredFrames = selectedKPI && selectedKPI !== "all"
    ? allFrames.filter(f => f.task === selectedKPI)
    : allFrames;

  const currentSSPD = modalIndex !== null ? sspdPairs[modalIndex] : null;

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Live Detections</h1>
      <div className="lg:px-6">
        <KPIFilter selected={selectedKPI} setSelected={setSelectedKPI} />
      </div>

      {filteredFrames.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">No frames yet for selected KPI.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {filteredFrames.map((frame, idx) => (
            <div
              key={`${frame.timestamp}-${frame.stream}-${idx}`}
              className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 cursor-pointer"
              onClick={() => {
                if (frame.task === "sspd") {
                  const zone_id = frame.detections[0].zone_id;
                  const index = sspdPairs.findIndex(pair => pair.zone_id === zone_id && (pair.login?.timestamp === frame.timestamp || pair.logout?.timestamp === frame.timestamp));
                  if (index !== -1) setModalIndex(index);
                }
              }}
            >
              <img
                src={`data:image/jpeg;base64,${frame.frame}`}
                alt={`Frame from ${frame.stream}`}
                className="w-full h-auto object-contain"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-700 truncate">{frame.stream}</h3>
                <p className="text-sm text-gray-500">{frame.timestamp}</p>
                <div className="mt-2">
                  <p className="text-base text-gray-600">Task: {frame.task.toUpperCase()}</p>
                  {frame.detections.length > 0 ? renderDetections(frame.task, frame.detections) : <p className="text-sm text-gray-500">No detections</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={modalIndex !== null} onOpenChange={() => setModalIndex(null)}>
        <DialogContent className="max-w-4xl w-full p-6">
          <DialogTitle>SSPD Frame Viewer</DialogTitle>
          <DialogDescription>Slide between Login and Logout frames for selected Zone.</DialogDescription>
          {/* <button className="absolute top-4 right-4 text-gray-600 hover:text-black" onClick={() => setModalIndex(null)}>
            <X className="w-6 h-6" />
          </button> */}
          {currentSSPD && (
            <Carousel>
              <CarouselContent>
                {currentSSPD.login && (
                  <CarouselItem>
                    <img src={`data:image/jpeg;base64,${currentSSPD.login.frame}`} alt="Login Frame" className="w-full h-auto object-contain" />
                    <p className="text-center mt-2 font-medium">Login - {currentSSPD.login.timestamp}</p>
                  </CarouselItem>
                )}
                {currentSSPD.logout && (
                  <CarouselItem>
                    <img src={`data:image/jpeg;base64,${currentSSPD.logout.frame}`} alt="Logout Frame" className="w-full h-auto object-contain" />
                    <p className="text-center mt-2 font-medium">Logout - {currentSSPD.logout.timestamp}</p>
                  </CarouselItem>
                )}
              </CarouselContent>
            </Carousel>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
