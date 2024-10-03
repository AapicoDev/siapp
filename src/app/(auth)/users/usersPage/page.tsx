"use client";

import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Users() {
  return (
    <div>
      <div>
        <Navbar menu={"Users"} submenu={"Users"} />
      </div>
      <div className="flex h-screen items-center justify-center">
        <Image src={"/NoData.png"} alt="No Data" width={200} height={200} />
      </div>
    </div>
  );
}
