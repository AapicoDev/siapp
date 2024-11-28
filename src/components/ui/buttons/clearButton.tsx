"use client";

import * as React from "react";
import { Button } from "@/components/ui/buttons/button";
import { SmsTracking } from "iconsax-react";

interface ClearButtonProps {
    onBtnClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void; // Button click handler
  disable: boolean;
  icon: any;
  content: string;
}

export function ClearButtton({
    onBtnClick,
    disable, icon, content
}: ClearButtonProps) {
  return (
    <Button
      onClick={(event) => {
        //event.stopPropagation(); // Prevent event propagation
        onBtnClick(event); // Call the click handler passed as prop
      }}
      style={{ fontWeight: "bold" }}
      className="w-full bg-white text-[#4c9bf5] border-[1px] border-[#4c9bf5] hover:text-white hover:bg-[#4c9bf5]"
      disabled={disable}
    >
      {icon}
      {content}
    </Button>
  );
}
