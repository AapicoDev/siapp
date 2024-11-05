"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "iconsax-react";
import { DateRange, SelectRangeEventHandler } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/buttons/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Typography } from "@mui/material";

interface DatePickerWithRangeProps {
  className: any; //React.HTMLAttributes<HTMLDivElement>;
  dateRange: DateRange | undefined;
  setDateRange: (value: any) => void;
}

export function DatePickerWithRange({
  className, dateRange, setDateRange
}: DatePickerWithRangeProps) {
  // [date, setDate] = React.useState<DateRange | undefined>({
    // from: new Date(2022, 0, 20),
    // to: addDays(new Date(2022, 0, 20), 20),
    //from, to
  //})

  // React.useEffect(() => {
  //   setDate({ from, to });
  // }, [from, to]);

  const handleChange = (e :DateRange | undefined) => {
    setDateRange(e);
  }

  return (
    <div className={cn("grid gap-2 relative", className)}>
      <Popover>
      <div className="relative w-full">
      <Typography
        className="absolute -top-2 left-3 px-1 bg-white text-[#2C5079]"
        sx={{ fontSize:"14px", lineHeight: "1rem", fontWeight: "700" }}
      >
        Period
          </Typography>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-center text-center font-normal rounded-lg border-[#1D7A9B] text-[#1D7A9B]",
              !dateRange && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-5 w-5 text-[#83A2AD]" />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "dd/MM/yyyy")} -{" "}
                  {format(dateRange.to, "dd/MM/yyyy")}
                </>
              ) : (
                format(dateRange.from, "dd/MM/yyyy")
              )
            ) : (
              <span className="text-[#83A2AD]">Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        </div>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={(e) => handleChange(e)}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
