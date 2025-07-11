'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSSPDStore } from '@/store/sspdStore';
import { FramePayload } from '@/lib/types';
import LivestreamBase from './components/LivestreamBase'; // Extract the shared UI logic to this file if needed

export default function LivestreamMock() {
  const [frames, setFrames] = useState<FramePayload[]>([]);
  const [loading, setLoading] = useState(true);
  const [appliedKPI, setAppliedKPI] = useState<string | null>(null);
  const [appliedDate, setAppliedDate] = useState<Date | null>(null);
  const [appliedZone, setAppliedZone] = useState<string | null>(null);
  const [appliedActivity, setAppliedActivity] = useState<string>('all');

  const [sspdPairs, setSSPDPairs] = useState<any[]>([]);

  useEffect(() => {
    // Mock SSPD login/logout detection data
    const dummyPairs = [
        
      {
        zone_id: 'A1',
        login: {
          timestamp: new Date().toISOString(),
          frame: '', // base64 image string here
          task: 'sspd',
          detections: [{ zone_id: 'A1', person: 'Person Alpha' }]
        },
      },
      {
        zone_id: 'B2',
        login: {
          timestamp: new Date().toISOString(),
          frame: '', // base64 image string here
          task: 'sspd',
          detections: [{ zone_id: 'B2', person: 'Person Beta' }]
        },
        logout: null
      },
      {
        zone_id: 'A1',
        login: {
          timestamp: new Date().toISOString(),
          frame: '', // base64 image string here
          task: 'sspd',
          detections: [{ zone_id: 'A1', person: 'Person Alpha' }]
        },
        logout: {
          timestamp: new Date(Date.now() + 5000).toISOString(),
          frame: '', // base64 image string here
          task: 'sspd',
          detections: [{ zone_id: 'A1', person: 'Person Alpha' }]
        }
      },
      
    ];

    setSSPDPairs(dummyPairs);
    setLoading(false);
  }, []);

  return (
    <LivestreamBase
      frames={frames}
      sspdPairs={sspdPairs}
      loading={loading}
      appliedKPI={appliedKPI}
      setAppliedKPI={setAppliedKPI}
      appliedDate={appliedDate}
      setAppliedDate={setAppliedDate}
      appliedZone={appliedZone}
      setAppliedZone={setAppliedZone}
      appliedActivity={appliedActivity}
      setAppliedActivity={setAppliedActivity}
    />
  );
}
