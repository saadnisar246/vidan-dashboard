'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MultiSelectDropdown } from './components/MultiSelectDropdown';
import { useRouter } from "next/navigation";

interface StreamEntry {
  rtsp: string;
  kpi: string[];
}

const KPI_OPTIONS = [
  { value: "lpr", label: "License Plate Recognition (LPR)" },
  { value: "ppe", label: "PPE Detection" },
  { value: "sspd", label: "SSPD" },
  { value: "person", label: "Person Detection" },
];

export default function StreamConfigPage() {
  const router = useRouter();
  
  const [formList, setFormList] = useState<StreamEntry[]>([
    { rtsp: '', kpi: [] }
  ]);
  const [finalJson, setFinalJson] = useState('');
  const wsRef = useRef<WebSocket | null>(null);

  // --- WebSocket Setup ---
  useEffect(() => {
    wsRef.current = new WebSocket("ws://192.168.0.188:8765");
    wsRef.current.onopen = () => {
      console.log("✅ WebSocket connected");
      wsRef.current?.send("__CONFIG__");
    };
    wsRef.current.onerror = (e) => console.error("❌ WebSocket error:", e);
    wsRef.current.onmessage = (e) => console.log("📨 Server:", e.data);

    return () => {
      wsRef.current?.close();
    };
  }, []);

  // useEffect(() => {
  //   const socket = new WebSocket("ws://192.168.0.188:8765");
  //   wsRef.current = socket;

  //   socket.onopen = () => {
  //     console.log("✅ WebSocket connected");
  //     socket.send("__CONFIG__");
  //   };

  //   socket.onerror = (e) => console.error("❌ WebSocket error:", e);

  //   return () => {
  //     console.log("🛑 WebSocket closing...");
  //     socket.close(); // Make sure this runs before navigating
  //   };
  // }, []);


  const updateFormField = (index: number, field: keyof StreamEntry, value: any) => {
    const updated = [...formList];
    updated[index][field] = value;
    setFormList(updated);
  };

  const addNewFormBlock = () => {
    setFormList(prev => [...prev, { rtsp: '', kpi: [] }]);
  };

  const sendStreamToServer = (index: number, stream: StreamEntry) => {
    const stream_id = index.toString().padStart(2, '0');
    const payload = {
      action: "add_stream",
      stream_id: `stream_${stream_id}`,
      rtsp_url: stream.rtsp,
      detection_classes: stream.kpi,
    };

    const send = () => {
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify(payload));
      } else {
        setTimeout(send, 200);
      }
    };

    send();
  };

  const handleSubmitStreams = () => {
    const validStreams = formList.filter(f => f.rtsp && f.kpi.length > 0);
    const configJson = validStreams.map((stream, idx) => ({
      stream_id: idx.toString().padStart(2, '0'),
      rtsp_url: stream.rtsp,
      detection_classes: stream.kpi
    }));

    setFinalJson(JSON.stringify(configJson, null, 2));

    validStreams.forEach((stream, i) => {
      sendStreamToServer(i, stream);
    });
    
    setTimeout(() => {
      router.push("/live_detections");
    }, 500); // Redirect after 0.5 seconds
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Configure RTSP Streams</h1>

      <div className="max-w-3xl mx-auto space-y-6">
        {formList.map((stream, idx) => (
          <Card key={idx} className="p-4 space-y-4">
            <Label>RTSP URL:</Label>
            <Input
              placeholder="e.g. rtsp://localhost:8554/stream"
              value={stream.rtsp}
              onChange={(e) => updateFormField(idx, 'rtsp', e.target.value)}
            />

            <Label>Select KPI(s):</Label>
            <MultiSelectDropdown
              selected={stream.kpi}
              options={KPI_OPTIONS}
              onChange={(kpis) => updateFormField(idx, 'kpi', kpis)}
            />
          </Card>
        ))}

        <Button variant="secondary" className="cursor-pointer" onClick={addNewFormBlock}>➕ Add Another Stream</Button>

        <Button className="w-full cursor-pointer" onClick={handleSubmitStreams}>✅ Add Streams</Button>

        {finalJson && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2 text-gray-700">Generated JSON:</h2>
            <Textarea
              className="w-full h-64 font-mono text-sm"
              value={finalJson}
              readOnly
            />
          </div>
        )}
      </div>
    </div>
  );
}
