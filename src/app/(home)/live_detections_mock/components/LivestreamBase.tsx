// components/LivestreamBase.tsx
'use client';

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
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState, useMemo } from "react";
import { format } from "date-fns";
import { KPIFilter } from "./KPIFilter";
import { LPRDetection, VehicleDetection, PPEDetection, SSPDetection, FramePayload, PersonDetection } from "@/lib/types";

function renderDetections(task: string, detections: any[]) {
  switch (task) {
    case "lpr":
      return detections.map((det: LPRDetection, idx) => (
        <div key={idx} className="mb-2">
          <p className="text-sm text-gray-600"><strong>Car ID:</strong> {det.car_id}</p>
          <p className="text-sm text-gray-600"><strong>Plate:</strong> {det.plate_text}</p>
          <p className="text-sm text-gray-600"><strong>Confidence Score:</strong> {det.text_score.toFixed(2)}</p>
        </div>
      ));
    case "vehicledetector":
      return detections.map((det: VehicleDetection, idx) => (
        <div key={idx} className="mb-2">
          <p className="text-sm text-gray-600"><strong>Car:</strong> {det.car || 0}</p>
          <p className="text-sm text-gray-600"><strong>Truck:</strong> {det.truck || 0}</p>
          <p className="text-sm text-gray-600"><strong>Bus:</strong> {det.bus || 0}</p>
          <p className="text-sm text-gray-600"><strong>Motorcycle:</strong> {det.motorcycle || 0}</p>
        </div>
      ));
    case "ppe":
      return (
        <div className="grid grid-cols-2 gap-2">{detections.map((det: PPEDetection, idx) => (
          <div key={idx}>
            <p className="text-sm text-gray-600"><strong>Person ID:</strong> {det.person_id}</p>
            {Object.entries(det)
              .filter(([key]) => key !== 'person_id')
              .map(([key, value]) => (
                <p key={key} className="text-sm text-gray-600">{value ? `Wearing ${key.replace(/_/g, ' ')}` : null}</p>
              ))}
          </div>
        ))}</div>
      );
    case "sspd":
      return detections.map((det: any, idx) => (
        <div key={idx}>
          <p className="text-sm text-gray-600">Zone ID: {det.zone_id}</p>
          <p className="text-sm text-gray-600">Login: {det.login ?? "—"}</p>
          <p className="text-sm text-gray-600">Logout: {det.logout ?? "—"}</p>
          <p className="text-sm text-gray-600 capitalize">Person: {det.person ?? "—"}</p>
        </div>
      ));
    case "persondetector":
      return detections.map((det: PersonDetection, idx) => (
        <div key={idx}>
          <p className="text-sm text-gray-600"><strong>Person ID:</strong> {det.person_id}</p>
        </div>
      ));
    default:
      return <p className="text-sm text-gray-500">No renderer for this task</p>;
  }
}

export default function LivestreamBase({
  frames,
  sspdPairs,
  loading,
  appliedKPI,
  setAppliedKPI,
  appliedDate,
  setAppliedDate,
  appliedZone,
  setAppliedZone,
  appliedActivity,
  setAppliedActivity
}: {
  frames: FramePayload[],
  sspdPairs: any[],
  loading: boolean,
  appliedKPI: string | null,
  setAppliedKPI: (val: string | null) => void,
  appliedDate: Date | null,
  setAppliedDate: (val: Date | null) => void,
  appliedZone: string | null,
  setAppliedZone: (val: string | null) => void,
  appliedActivity: string,
  setAppliedActivity: (val: string) => void
}) {
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const [modalFrame, setModalFrame] = useState<FramePayload | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [draftKPI, setDraftKPI] = useState(appliedKPI);
  const [draftDate, setDraftDate] = useState(appliedDate);
  const [draftZone, setDraftZone] = useState(appliedZone);
  const [draftActivity, setDraftActivity] = useState(appliedActivity);
  const [showCalendar, setShowCalendar] = useState(false);

  const uniqueZoneIds = Array.from(new Set(sspdPairs.map(p => p.zone_id)));

  const filteredPairs = useMemo(() => sspdPairs.filter(pair => {
    if (appliedActivity === 'active') return pair.login && !pair.logout;
    if (appliedActivity === 'not-active') return pair.login && pair.logout;
    return true;
  }), [sspdPairs, appliedActivity]);

  const allFrames = useMemo(() => {
    const combined = [...frames];
    filteredPairs.forEach(pair => {
      const latest = pair.logout || pair.login;
      const person = pair.login?.detections?.[0]?.person || pair.logout?.detections?.[0]?.person || '-';
      combined.push({
        ...latest,
        synthetic: true,
        detections: [{
          zone_id: pair.zone_id,
          login: pair.login?.timestamp,
          logout: pair.logout?.timestamp,
          person
        }]
      } as FramePayload);
    });
    return combined;
  }, [frames, filteredPairs]);

  const filteredFrames = useMemo(() => allFrames.filter(f => {
    const byKPI = !appliedKPI || appliedKPI === 'all' || f.task === appliedKPI;
    const byDate = !appliedDate || new Date(f.timestamp).toDateString() === appliedDate.toDateString();
    const byZone = !appliedZone || (f.task === 'sspd' && f.detections?.[0]?.zone_id === appliedZone);
    return byKPI && byDate && byZone;
  }), [allFrames, appliedKPI, appliedDate, appliedZone]);

  const totalPages = Math.ceil(filteredFrames.length / itemsPerPage);
  const paginatedFrames = filteredFrames.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const currentSSPD = modalIndex !== null ? sspdPairs[modalIndex] : null;

  const renderPagination = () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem><PaginationPrevious onClick={() => setCurrentPage(p => Math.max(1, p - 1))} /></PaginationItem>
        {Array.from({ length: totalPages }, (_, i) => (
          <PaginationItem key={i + 1}>
            <PaginationLink isActive={i + 1 === currentPage} onClick={() => setCurrentPage(i + 1)}>{i + 1}</PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem><PaginationNext onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} /></PaginationItem>
      </PaginationContent>
    </Pagination>
  );

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Live Detections</h1>
      <div className="flex justify-end mb-6">
        <Button onClick={() => setFilterDialogOpen(true)}>Filter Options</Button>
      </div>

      <Dialog open={filterDialogOpen} onOpenChange={setFilterDialogOpen}>
        <DialogContent>
          <DialogTitle>Filter Options</DialogTitle>
          <div className="space-y-4">
            <KPIFilter selected={draftKPI} setSelected={setDraftKPI} />
            <div className="relative">
              <Label>Date</Label>
              <Button variant="outline" onClick={() => setShowCalendar(p => !p)}>
                {draftDate ? format(draftDate, 'PPP') : 'Select Date'}
              </Button>
              {showCalendar && (
                <div className="absolute z-50">
                  <Calendar
                    mode="single"
                    selected={draftDate ?? undefined}
                    onSelect={date => {
                      setDraftDate(date!);
                      setShowCalendar(false);
                    }}
                  />
                </div>
              )}
            </div>
            <div>
              <Label>Zone</Label>
              <Select value={draftZone ?? "all"} onValueChange={val => setDraftZone(val === 'all' ? null : val)}>
                <SelectTrigger><SelectValue placeholder="All Zones" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {uniqueZoneIds.map(zone => (
                    <SelectItem key={zone} value={zone}>{zone}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Activity</Label>
              <Select value={draftActivity} onValueChange={setDraftActivity}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="not-active">Not Active</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <Button onClick={() => {
              setAppliedKPI(draftKPI);
              setAppliedDate(draftDate);
              setAppliedZone(draftZone);
              setAppliedActivity(draftActivity);
              setFilterDialogOpen(false);
              setCurrentPage(1);
            }}>Apply</Button>
          </div>
        </DialogContent>
      </Dialog>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {Array.from({ length: itemsPerPage }).map((_, i) => (
            <div key={i} className="p-4 bg-white rounded shadow space-y-2">
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/3" />
            </div>
          ))}
        </div>
      ) : filteredFrames.length === 0 ? (
        <p className="text-center text-gray-500">No frames match the filters.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
            {paginatedFrames.map((frame, idx) => (
              <div key={idx} className="bg-white shadow rounded p-4 cursor-pointer" onClick={() => {
                if (frame.task === "sspd") {
                  const zoneId = frame.detections[0].zone_id;
                  const match = sspdPairs.findIndex(p => p.zone_id === zoneId &&
                    (p.login?.timestamp === frame.timestamp || p.logout?.timestamp === frame.timestamp));
                  if (match !== -1) setModalIndex(match);
                } else {
                  setModalFrame(frame);
                }
              }}>
                <img src={`data:image/jpeg;base64,${frame.frame}`} className="w-full h-64 object-contain mb-2" />
                <p className="text-sm"><strong>Task:</strong> {frame.task}</p>
                {renderDetections(frame.task, frame.detections)}
              </div>
            ))}
          </div>
          {totalPages > 1 && (
            <div className="mt-6 flex justify-center">{renderPagination()}</div>
          )}
        </>
      )}

      <Dialog open={modalFrame !== null} onOpenChange={() => setModalFrame(null)}>
        <DialogContent>
          {modalFrame && (
            <>
              <DialogTitle>{modalFrame.task}</DialogTitle>
              <img src={`data:image/jpeg;base64,${modalFrame.frame}`} className="w-full" />
              <div>{renderDetections(modalFrame.task, modalFrame.detections)}</div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={modalIndex !== null} onOpenChange={() => setModalIndex(null)}>
        <DialogContent>
          {currentSSPD && (
            <Carousel>
              <CarouselContent>
                {currentSSPD.login && (
                  <CarouselItem>
                    <img src={`data:image/jpeg;base64,${currentSSPD.login.frame}`} />
                    <p className="text-center">Login - {currentSSPD.login.timestamp}</p>
                  </CarouselItem>
                )}
                {currentSSPD.logout && (
                  <CarouselItem>
                    <img src={`data:image/jpeg;base64,${currentSSPD.logout.frame}`} />
                    <p className="text-center">Logout - {currentSSPD.logout.timestamp}</p>
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
