'use client';

import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface StreamEntry {
  rtsp: string;
  kpi: string[];
}

const KPI_OPTIONS = [
  { value: "lpr", label: "License Plate Recognition (LPR)" },
  { value: "ppe", label: "PPE Detection" },
  { value: "sspd", label: "SSPD" },
  { value: "person", label: "Person Detection" },  // Adjusted from "persondetector"
];

export default function StreamConfigPage() {
  const [streams, setStreams] = useState<StreamEntry[]>([]);
  const [newStream, setNewStream] = useState<StreamEntry>({ rtsp: '', kpi: [] });
  const wsRef = useRef<WebSocket | null>(null);
  const streamCounter = useRef(0);

  // Initialize WebSocket once
  const ensureWebSocket = () => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      wsRef.current = new WebSocket("ws://localhost:8765");
      wsRef.current.onopen = () => {
        wsRef.current?.send("__CONFIG__");
      };
      wsRef.current.onerror = (e) => console.error("WebSocket error:", e);
      wsRef.current.onmessage = (e) => console.log("Server:", e.data);
    }
  };

  const sendToServer = (stream: StreamEntry) => {
    ensureWebSocket();

    const stream_id = `stream_${streamCounter.current++}`;
    const payload = {
      action: "add_stream",
      stream_id,
      rtsp_url: stream.rtsp,
      detection_classes: stream.kpi
    };

    const send = () => {
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify(payload));
      } else {
        setTimeout(send, 200);  // Retry until open
      }
    };

    send();
  };

  const toggleKPI = (value: string) => {
    setNewStream(prev => {
      const exists = prev.kpi.includes(value);
      return {
        ...prev,
        kpi: exists ? prev.kpi.filter(k => k !== value) : [...prev.kpi, value]
      };
    });
  };

  const handleAddStream = () => {
    if (newStream.rtsp && newStream.kpi.length > 0) {
      setStreams(prev => [...prev, newStream]);
      sendToServer(newStream);
      setNewStream({ rtsp: '', kpi: [] });
    }
  };

  const handleDownloadJSON = () => {
    const jsonData = JSON.stringify(streams, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'stream_config.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Configure RTSP Streams</h1>

      <div className="max-w-2xl mx-auto space-y-4">
        <Card className="p-4 space-y-4">
          <Input
            placeholder="RTSP URL"
            value={newStream.rtsp}
            onChange={(e) => setNewStream({ ...newStream, rtsp: e.target.value })}
          />

          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Select KPI(s):</Label>
            <div className="grid grid-cols-2 gap-2">
              {KPI_OPTIONS.map(opt => (
                <div key={opt.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={opt.value}
                    checked={newStream.kpi.includes(opt.value)}
                    onCheckedChange={() => toggleKPI(opt.value)}
                  />
                  <Label htmlFor={opt.value}>{opt.label}</Label>
                </div>
              ))}
            </div>
          </div>

          <Button onClick={handleAddStream}>Add Stream</Button>
        </Card>

        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Configured Streams</h2>
          <Textarea
            className="w-full h-64 font-mono text-sm"
            value={JSON.stringify(streams, null, 2)}
            readOnly
          />
        </div>

        <Button className="w-full" onClick={handleDownloadJSON}>Download Config JSON</Button>
      </div>
    </div>
  );
}
