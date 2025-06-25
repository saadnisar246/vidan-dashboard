'use client';

import { useEffect, useState } from 'react';
import { KPIFilter } from "./components/KPIFilter";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";

import { useSSPDStore } from "@/store/sspdStore";
import { LPRDetection, PPEDetection, SSPDetection, FramePayload, SSPDPair, PersonDetection } from "@/lib/types";

function renderDetections(task: string, detections: any[]) {
  switch (task) {
    case "lpr":
      return detections.map((det: LPRDetection, idx) => (
        <div key={idx} className="mb-2">
          <p className="text-sm text-gray-600"><span className="font-semibold">Car ID:</span> {det.car_id}</p>
          <p className="text-sm text-gray-600"><span className="font-semibold">Plate:</span> {det.plate_text}</p>
          <p className="text-sm text-gray-600"><span className="font-semibold">Confidence Score:</span> {det.plate_score.toFixed(2)}</p>
        </div>
      ));
    case "ppe":
      return (
        <div className="grid grid-cols-2 gap-2">{detections.map((det: PPEDetection, idx) => (
          <div key={idx} className="mb-2">
            <p className="text-sm text-gray-600"><span className="font-semibold">Person ID:</span> {det.person_id}</p>
            {Object.entries(det)
              .filter(([key]) => key !== 'person_id' && typeof det[key as keyof PPEDetection] === 'boolean')
              .map(([key, value]) => (
                <p key={key} className={`text-sm text-gray-600 ${value ? "font-semibold" : ""}`}>
                  {value && `Wearing ${key.replaceAll("_", " ")}`}
                </p>
              ))}
          </div>
        ))}</div>
      );
    case "sspd":
      return detections.map((det: any, idx) => (
        <div key={idx} className="mb-2">
          <p className="text-sm text-gray-600">Zone ID: {det.zone_id}</p>
          <p className="text-sm text-gray-600">Login: {det.login ?? "—"}</p>
          <p className="text-sm text-gray-600">Logout: {det.logout ?? "—"}</p>
        </div>
      ));
    case "persondetector":
      return detections.map((det: PersonDetection, idx) => (
        <div key={idx} className="mb-2">
          <p className="text-sm text-gray-600"><span className="font-semibold">Person ID:</span> {det.person_id}</p>
        </div>
      ));
    default:
      return <p className="text-sm text-gray-500">No renderer for this task</p>;
  }
}

export default function Livestream() {
  const [selectedKPI, setSelectedKPI] = useState<string | null>(null);
  const [frames, setFrames] = useState<FramePayload[]>([]);
  const sspdPairs = useSSPDStore((state) => state.pairs);
  const addOrUpdatePair = useSSPDStore((state) => state.addOrUpdatePair);
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const [modalFrame, setModalFrame] = useState<FramePayload | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 6;

  useEffect(() => {
    const socket = new WebSocket('ws://192.168.0.188:8765');
    socket.onmessage = (event) => {
      try {
        const data: FramePayload = JSON.parse(event.data);
        setLoading(false);
        console.log("Received frame:", data);
        if (data.task === "sspd") {
          const det = data.detections[0] as SSPDetection;
          addOrUpdatePair({
            zone_id: det.zone_id,
            [det.status.toLowerCase()]: data,
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
    ...sspdPairs.map(pair => {
      const latest = pair.logout || pair.login;
      return {
        ...latest,
        detections: [{
          zone_id: pair.zone_id,
          login: pair.login?.timestamp,
          logout: pair.logout?.timestamp
        }],
        synthetic: true
      } as FramePayload;
    })
  ];

  const filteredFrames = selectedKPI && selectedKPI !== "all"
    ? allFrames.filter(f => f.task === selectedKPI)
    : allFrames;

  const totalPages = Math.ceil(filteredFrames.length / itemsPerPage);
  const paginatedFrames = filteredFrames.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const currentSSPD = modalIndex !== null ? sspdPairs[modalIndex] : null;

  const renderPagination = () => {
    const pageLinks = [];
    const range = 2;
    const start = Math.max(1, currentPage - range);
    const end = Math.min(totalPages, currentPage + range);

    if (start > 1) {
      pageLinks.push(<PaginationItem key={1}><PaginationLink href="#" onClick={() => setCurrentPage(1)} className="cursor-pointer">1</PaginationLink></PaginationItem>);
      if (start > 2) pageLinks.push(<PaginationItem key="ellipsis-start"><PaginationEllipsis /></PaginationItem>);
    }

    for (let i = start; i <= end; i++) {
      pageLinks.push(
        <PaginationItem key={i}>
          <PaginationLink href="#" isActive={i === currentPage} onClick={() => setCurrentPage(i)} className="cursor-pointer">{i}</PaginationLink>
        </PaginationItem>
      );
    }

    if (end < totalPages) {
      if (end < totalPages - 1) pageLinks.push(<PaginationItem key="ellipsis-end"><PaginationEllipsis /></PaginationItem>);
      pageLinks.push(
        <PaginationItem key={totalPages}><PaginationLink href="#" onClick={() => setCurrentPage(totalPages)} className="cursor-pointer">{totalPages}</PaginationLink></PaginationItem>
      );
    }

    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem><PaginationPrevious onClick={() => setCurrentPage(p => Math.max(1, p - 1))} className="cursor-pointer" /></PaginationItem>
          {pageLinks}
          <PaginationItem><PaginationNext onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} className="cursor-pointer" /></PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Live Detections</h1>
      <div className="lg:px-6">
        <KPIFilter selected={selectedKPI} setSelected={setSelectedKPI} />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {Array.from({ length: itemsPerPage }).map((_, idx) => (
            <div key={idx} className="p-4 space-y-4 bg-white shadow rounded">
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
        </div>
      ) : filteredFrames.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">No frames yet for selected KPI.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
            {paginatedFrames.map((frame, idx) => (
              <div key={`${frame.timestamp}-${frame.stream}-${idx}`} className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 cursor-pointer" onClick={() => {
                if (frame.task === "sspd") {
                  const zone_id = frame.detections[0].zone_id;
                  const index = sspdPairs.findIndex(pair => pair.zone_id === zone_id && (pair.login?.timestamp === frame.timestamp || pair.logout?.timestamp === frame.timestamp));
                  if (index !== -1) setModalIndex(index);
                } else {
                  setModalFrame(frame);
                }
              }}>
                <img src={`data:image/jpeg;base64,${frame.frame}`} alt={`Frame from ${frame.stream}`} className="w-full h-auto object-contain" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-700 truncate">{frame.stream}</h3>
                  <div className="mt-2">
                    <p className="text-base text-gray-600"><span className="font-semibold">Task:</span> {frame.task.toUpperCase()}</p>
                    {frame.detections.length > 0 ? renderDetections(frame.task, frame.detections) : <p className="text-sm text-gray-500">No detections</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              {renderPagination()}
            </div>
          )}
        </>
      )}

      <Dialog open={modalIndex !== null} onOpenChange={() => setModalIndex(null)}>
        <DialogContent className="max-w-4xl w-full p-6">
          <DialogTitle>SSPD Frame Viewer</DialogTitle>
          <DialogDescription>Slide between Login and Logout frames for selected Zone.</DialogDescription>
          {!currentSSPD ? (
            <Skeleton className="w-full h-80" />
          ) : (
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

      <Dialog open={modalFrame !== null} onOpenChange={() => setModalFrame(null)}>
        <DialogContent className="max-w-3xl w-full p-6">
          {!modalFrame ? (
            <Skeleton className="w-full h-80" />
          ) : (
            <>
              <DialogTitle>Detection - {modalFrame.task.toUpperCase()}</DialogTitle>
              <img src={`data:image/jpeg;base64,${modalFrame.frame}`} alt="Detection Frame" className="w-full mt-4 rounded-lg" />
              <div className="mt-4">{renderDetections(modalFrame.task, modalFrame.detections)}</div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
