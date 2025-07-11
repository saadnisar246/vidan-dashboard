"use client";

import { Check } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

type KPIFilterProps = {
  selected: string | null;
  setSelected: (value: string | null) => void;
};

const options = [
  { label: "All KPIs", value: null },
  { label: "Face Detection", value: "fd" },
  { label: "Vehicle Detection", value: "vehicledetector" },
  { label: "License Plate Recognition", value: "lpr" },
  { label: "Face Recognition", value: "fr" },
  { label: "Personal Protective Equipment Detection", value: "ppe" },
  { label: "SiddiqSons Person Detection", value: "sspd" },
];

export function KPIFilter({ selected, setSelected }: KPIFilterProps) {
  return (
    <div className="space-y-2">
      <Label className="text-base font-medium text-gray-700">Select KPI</Label>
      <Select
        onValueChange={(val) => setSelected(val === "null" ? null : val)}
        value={selected ?? "null"}
      >
        <SelectTrigger className="w-[320px] bg-white border-gray-300">
          <SelectValue placeholder="Choose option" />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.label} value={opt.value ?? "null"}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
