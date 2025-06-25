// Detection Types
export interface LPRDetection {
  car_id: number;
  car_bbox: [number, number, number, number];
  plate_bbox: [number, number, number, number];
  plate_score: number;
  plate_text: string;
  text_score: number;
}

export interface PPEDetection {
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

export interface PersonDetection {
  person_id: number;
  bbox: [number, number, number, number];
}

export interface SSPDetection {
  zone_id: number;
  status: string;
}

export interface FramePayload {
  stream: string;
  timestamp: string;
  task: string;
  frame: string;
  detections: any[];
}

export interface SSPDPair {
  zone_id: number;
  login?: FramePayload;
  logout?: FramePayload;
}