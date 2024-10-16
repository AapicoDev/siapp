"use client";
 
import * as React from "react";
import { Clock } from "lucide-react";
import { Label } from "@/components/ui/label"
import { TimePickerInput } from "./timePickerInput"
 
interface TimePickerDemoProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  theme?: any;
}
 
export function TimePicker({ date, setDate, theme="green"}: TimePickerDemoProps) {
  const minuteRef = React.useRef<HTMLInputElement>(null);
  const hourRef = React.useRef<HTMLInputElement>(null);
  const secondRef = React.useRef<HTMLInputElement>(null);
 
  return (
    <div className={`flex items-center justify-center ${theme === "green" ? 'bg-[#D9F0EC] text-[#1D7A9B]' : 'bg-[white] text-[#2C5079]'} rounded-lg w-full`}>
    <div className="flex h-[34px] items-center">
        <Clock className="ml-2 h-[18px] w-[18px]" />
      </div>
      <div className="grid text-center">
        {/* <Label htmlFor="hours" className="text-xs">
          Hours
        </Label> */}
        <TimePickerInput
          picker="hours"
          date={date}
          setDate={setDate}
          ref={hourRef}
          onRightFocus={() => minuteRef.current?.focus()}
        />
      </div>
      <Label className="text-base h-[34px] pt-[6px]">
          :
        </Label>
      <div className="grid text-center">
        {/* <Label htmlFor="minutes" className="text-xs">
          Minutes
        </Label> */}
        <TimePickerInput
          picker="minutes"
          date={date}
          setDate={setDate}
          ref={minuteRef}
          onLeftFocus={() => hourRef.current?.focus()}
          onRightFocus={() => secondRef.current?.focus()}
        />
      </div>
      {/* <div className="grid gap-1 text-center">
        <Label htmlFor="seconds" className="text-xs">
          Seconds
        </Label>
        <TimePickerInput
          picker="seconds"
          date={date}
          setDate={setDate}
          ref={secondRef}
          onLeftFocus={() => minuteRef.current?.focus()}
        />
      </div> */}
      
    </div>
  );
}