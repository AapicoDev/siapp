"use client";
import { Box } from "@mui/material/";
import MenuDrawer from "@/components/MenuDrawer";
import Header from "@/components/Header";
import SegmentTable from "@/components/materData/SegmentTable";

export default function Segment() {
  return (
    <div className="p-2">
      <Header/>
      <SegmentTable/>
    </div>
  );
}