"use client";
import { Box } from "@mui/material/";
import MenuDrawer from "@/components/MenuDrawer";
import Header from "@/components/Header";
import SegmentTable from "@/components/materData/SegmentTable";
import Navbar from "@/components/Navbar";

export default function Segment() {
  return (
    <div>
      <Navbar menu={'Master Data'} submenu={'Segment'} />
      <SegmentTable/>
    </div>
  );
}