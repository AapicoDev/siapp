"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
//import { account } from "../app/appwrite"; // Import account from Appwrite
import { usePathname, useRouter } from "next/navigation";
import { Chip, Typography } from "@mui/material";

const Header = () => {
  const router = useRouter();
  const pathName = usePathname();
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isLogoutVisible, setIsLogoutVisible] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  console.log(pathName);

  const label = 'Master Data';
  const subMenu = 'Segment';

  return (
    <>
      <header>
        <nav className='container mx-auto px-6 py-3' style={{display: 'flex'}}>
          <div className='flex justify-between items-center'>
            <Typography className='text-base font-bold'>
            <Chip label={label} /> {subMenu}
            </Typography>
          </div>
          <div className='flex justify-between items-center'>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
