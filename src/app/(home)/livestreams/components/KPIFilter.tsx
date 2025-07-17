"use client";

import { Check } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

// type KPIFilterProps = {
//   selected: string | null;
//   setSelected: (value: string | null) => void;
// };
type KPIFilterProps = {
  selected: { label: string; value: string } | null;
  setSelected: (value: { label: string; value: string } | null) => void;
};

const options = [
  { label: "Siddiq Sons Camera 1", value: "sspd" },
  // { label: "License Plate Recognition Stream", value: "lpr" },
  // { label: "Face Detection Stream", value: "fd" },
  // { label: "Vehicle Detection Stream", value: "vehicledetector" },
  // { label: "Face Recognition Stream", value: "fr" },
  // { label: "Personal Protective Equipment Detection Stream", value: "ppe" },
];

export function KPIFilter({ selected, setSelected }: KPIFilterProps) {
  return (
    <div className="space-y-2">
      <Label className="text-base font-medium text-gray-700">Select Stream</Label>
      <Select
        onValueChange={(val) => {
          if (val === "null") {
            setSelected(null);
          } else {
            const selectedOption = options.find(opt => opt.value === val) || null;
            setSelected(selectedOption);
          }
        }}
        value={selected?.value ?? "null"}
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
