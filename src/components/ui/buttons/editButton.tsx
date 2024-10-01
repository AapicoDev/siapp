"use client";

import * as React from "react";
import { Button } from "@/components/ui/buttons/button";
import { Edit2 } from "iconsax-react";

interface EditButtonProps {
    onEditBtnClick: (index: number) => void;
    index: number;
  }

export function EditButton({ onEditBtnClick, index }: EditButtonProps) {
  return (
    <Button
      style={{
        border: "1px solid #37B7C3",
        fontWeight: "bold",
      }}
      className="w-[84px] text-[#37B7C3] bg-white hover:bg-[#37B7C3] hover:text-white"
      onClick={() => {
        onEditBtnClick(index);
      }}
    >
      <Edit2 variant="Bold"/>
      Edit
    </Button>
  );
}
