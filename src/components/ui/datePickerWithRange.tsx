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
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-center text-center font-normal text-[#1D7A9B]",
              !dateRange && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-5 w-5" />
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
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
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
