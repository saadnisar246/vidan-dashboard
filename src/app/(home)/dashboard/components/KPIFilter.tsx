"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandGroup,
  CommandEmpty,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

const options = [
  { label: "Face Detection", value: "face_detection" },
  { label: "Weapon Detection", value: "weapon" },
  { label: "Number Plate Detection", value: "number_plate" },
  { label: "Face Recognition", value: "face_recognition" },
  { label: "Fire and Smoke Detection", value: "fire_smoke_detection" },
];

type KPIFilterProps = {
  selected: string | null;
  setSelected: (value: string) => void;
};

export function KPIFilter({ selected, setSelected }: KPIFilterProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-base font-medium text-gray-700 mb-1">
          Select KPI
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-[300px] justify-between cursor-pointer",
                !selected && "text-muted-foreground"
              )}
            >
              {selected
                ? options.find((opt) => opt.value === selected)?.label
                : "Choose option"}
              <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search KPI..." />
              <CommandList>
                <CommandEmpty>No match found.</CommandEmpty>
                <CommandGroup>
                  {options.map((opt) => (
                    <CommandItem
                      key={opt.value}
                      value={opt.label}
                      onSelect={() => setSelected(opt.value)}
                      className="cursor-pointer"
                    >
                      {opt.label}
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4",
                          selected === opt.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        {/* <Button
          onClick={() => console.log("Selected:", selected)}
          className="ml-2 cursor-pointer bg-blue-500 hover:bg-blue-500/80"
        >
          Submit
        </Button> */}
      </div>
    </div>
  );
}
