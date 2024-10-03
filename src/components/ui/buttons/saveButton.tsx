"use client";

import * as React from "react";
import { Button } from "@/components/ui/buttons/button";

interface SaveButtonProps {
    onSaveBtnClick: (index: number) => void;
    index: number;
  }

export function SaveButton({ onSaveBtnClick, index }: SaveButtonProps) {
  return (
    <Button
      className="w-[84px] bg-[#4C9BF5] hover:bg-[white] hover:text-[#4C9BF5] hover:border-[#4C9BF5] hover:border-2 font-bold"
      onClick={() => {
        onSaveBtnClick(index);
      }}
    >
      Save
    </Button>
  );
}
