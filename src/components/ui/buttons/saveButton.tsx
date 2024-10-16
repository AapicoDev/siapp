"use client";

import * as React from "react";
import { Button } from "@/components/ui/buttons/button";

interface SaveButtonProps {
    onSaveBtnClick: (index: number) => void;
    index?: number;
  }

export function SaveButton({ onSaveBtnClick, index=0 }: SaveButtonProps) {
  return (
    <Button
      className="min-w-[84px] w-full bg-[#4C9BF5] hover:bg-[white] hover:text-[#4C9BF5] hover:border-[#4C9BF5] hover:border-2 font-bold"
      onClick={() => {
        onSaveBtnClick(index);
      }}
    >
      Save
    </Button>
  );
}
