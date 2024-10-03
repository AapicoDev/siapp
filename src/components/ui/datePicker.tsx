"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "iconsax-react";

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/buttons/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DatePicker() {
  const [date, setDate] = React.useState<Date>()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[140px] h-8 justify-start text-left font-normal bg-[#D9F0EC] text-[#1D7A9B]",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-5 w-5 text-[#1D7A9B]" />
          {date ? format(date, "dd/MM/yyyy") : <span className="text-[#1D7A9B]">dd/mm/yyyy</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}