"use client";
import Logo from "./ui/Logo";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Routing, ClipboardText, UserSquare, Folder, Setting3 } from "iconsax-react";
import { BsFillGridFill } from "react-icons/bs";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CiGrid41 } from "react-icons/ci";
import { FaSortDown } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import { Collapse, Typography } from "@mui/material";
import "../styles/sidebar.css"
import { account } from "../app/appwrite"; // Import account from Appwrite
import styles from '../app/styles.module.css'

export default function Sidebar() {
  const [subSIAPPOpen, setSubSIAPPOpen] = useState(false);
  const [subReportOpen, setSubReportOpen] = useState(false);
  const [subMaterDataOpen, setSubMaterDataOpen] = useState(false);
  const [subUserOpen, setSubUserOpen] = useState(false);
  const pathName = usePathname();
  const router = useRouter();

  const [loggedInUser, setLoggedInUser] = useState<any>(null);
  const [isLogoutVisible, setIsLogoutVisible] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  // Function to check if user is already logged in
  // const checkUserSession = async () => {
  //   try {
  //     const user = await account.get(); // Get the current user
  //     setLoggedInUser(user); // If user exists, set the loggedInUser state
  //     setIsLogoutVisible(true); // Show logout button if user is logged in
  //     sessionStorage.setItem("userId", JSON.stringify(user));
  //     router.push("/dashboard"); // Redirect to vCardTable page if already logged in
  //   } catch (error) {
  //     setLoggedInUser(null); // If no user is logged in, set loggedInUser to null
  //     setIsLogoutVisible(false); // Hide logout button if no user is logged in
  //     if (pathName !== "/login") {
  //       router.push("/login"); // Redirect to login page if not logged in
  //     }
  //   }
  // };

  // useEffect(() => {
  //   checkUserSession(); // Check if user is already logged in on component mount
  //   console.log('checkuser Session');
  // }, []);

  const handleLogout = async () => {
    setShowConfirmModal(false); // Close the modal
    await account.deleteSession("current"); // Delete the current session
    setLoggedInUser(null); // Set loggedInUser to null
    setIsLogoutVisible(false); // Hide the logout button
    router.push("/login"); // Redirect to login page after logout
  };

  const toggleSubmenu = (menu: any) => {
    if (menu === "SIAPP") {
      setSubSIAPPOpen(!subSIAPPOpen);
      setSubReportOpen(false);
      setSubMaterDataOpen(false);
      setSubUserOpen(false);
    } else if (menu === "Report") {
      setSubReportOpen(!subReportOpen);
      setSubSIAPPOpen(false);
      setSubMaterDataOpen(false);
      setSubUserOpen(false);
    } else if (menu === "Master Data") {
      setSubMaterDataOpen(!subMaterDataOpen);
      setSubReportOpen(false);
      setSubSIAPPOpen(false);
      setSubUserOpen(false);
    } else if (menu === "User") {
      setSubUserOpen(!subUserOpen);
      setSubReportOpen(false);
      setSubSIAPPOpen(false);
      setSubMaterDataOpen(false);
    }
  };

  const menuList = [
    {
      group: "General",
      items: [
        {
          path: "/dashboard",
          text: "Dashboard",
          icon: <CiGrid41 size={24} />,
          iconSelected: <BsFillGridFill size={24} />,
          submenu: false,
        },
        {
          path: "#",
          text: "SIAPP",
          pathname: "siapp",
          icon: <Routing size={24} variant="Linear" />,
          iconSelected: <Routing size={24} variant="Bold" />,
          submenu: true,
          submenuItems: [
            { title: "Patrol", path: "/siapp/patrol", icon: <GoDotFill />},
            { title: "Incident", path: "/siapp/incident", icon: <GoDotFill /> },
            { title: "Manpower", path: "#", icon: <GoDotFill /> },
            { title: "Daily summary report", path: "#", icon: <GoDotFill /> },
            { title: "Monitoring report", path: "#", icon: <GoDotFill /> },
          ],
        },
        {
          path: "#",
          text: "Report",
          pathname: "report",
          icon: <ClipboardText size={22} />,
          iconSelected: <ClipboardText size={24} variant="Bold" />,
          submenu: true,
          submenuItems: [
            { title: "Daily", path: "#", icon: <GoDotFill /> },
            { title: "Monthly", path: "#", icon: <GoDotFill /> },
            { title: "Minutes of meeting", path: "#", icon: <GoDotFill /> },
          ],
        },
        {
          path: "#",
          text: "User",
          pathname: "user",
          icon: <UserSquare size={22} />,
          iconSelected: <UserSquare size={24} variant="Bold" />,
          submenu: true,
          submenuItems: [
            { title: "Users", path: "#", icon: <GoDotFill /> },
            { title: "Role & Permission", path: "#", icon: <GoDotFill /> },
          ],
        },
        {
          path: "#",
          text: "Master Data",
          pathname: "masterData",
          icon: <Folder size={22} />,
          iconSelected: <Folder size={24} variant="Bold" />,
          submenu: true,
          submenuItems: [
            {
              title: "Segment",
              path: "/masterData/segment",
              icon: <GoDotFill />,
            },
            { title: "Group", path: "#", icon: <GoDotFill /> },
            { title: "Zone", path: "#", icon: <GoDotFill /> },
            { title: "Department", path: "#", icon: <GoDotFill /> },
            { title: "Customer", path: "#", icon: <GoDotFill /> },
            { title: "Patrol", path: "#", icon: <GoDotFill /> },
            { title: "Incident Type", path: "#", icon: <GoDotFill /> },
            { title: "QR Error Reason", path: "#", icon: <GoDotFill /> },
            { title: "Department Structure", path: "#", icon: <GoDotFill /> },
            { title: "Report Header", path: "#", icon: <GoDotFill /> },
            { title: "Manage Sync Employee Department Mapping", path: "#", icon: <GoDotFill />,},
          ],
        },
        {
          path: "#",
          text: "Configuration",
          pathname: "configuration",
          icon: <Setting3 size={22} />,
          iconSelected: <Setting3 size={24} variant="Bold" />,
          submenu: false,
        },
      ],
    },
  ];

  const submenu = (option: any, optionkey: number) => {
    return option?.submenu ? (
      <div key={`option-${optionkey}`} className="flex-1">
        <CommandList style={{ overflow: "visible" }}>
          <div onClick={() => toggleSubmenu(option.text)}>
            <CommandItem
              key={optionkey}
              className={`${
                pathName.includes(option.pathname)
                  ? `font-bold ${styles.sidebarSelectedText}`
                  : `${styles.sidebarText}`
              } py-2 flex gap-2 pl-2 hover:bg-[#EBF4F6] transition-colors duration-100 ease-in-out`}
            >
              {pathName.includes(option.pathname)
                ? option.iconSelected
                : option.icon}
              {option?.text}
              <FaSortDown
                size={20}
                className={`${
                  (subSIAPPOpen && option.text === "SIAPP") ||
                  (subReportOpen && option.text === "Report") ||
                  (subMaterDataOpen && option.text === "Master Data") ||
                  (subUserOpen && option.text === "User")
                    ? "rotate-180 mt-2"
                    : "mb-2"
                } ml-auto stroke-2 text-xs`}
              />
            </CommandItem>
          </div>

          {option.text === "SIAPP" && (
            <Collapse in={subSIAPPOpen} timeout={"auto"} unmountOnExit>
              <CommandList
                className="border-b mb-1"
                style={{ overflow: "visible" }}
              >
                {option.submenuItems?.map(
                  (submenu: any, submenukey: number) => (
                    <Link key={submenukey} href={submenu.path}>
                      <CommandItem
                        key={submenukey}
                        className={`${
                          pathName === submenu?.path
                            ? `bg-accent border-r-8 font-bold ${styles.menuselected}`
                            : `${styles.sidebarText}`
                        } gap-2 px-7 py-3 leading-5 flex1 hover:bg-[#EBF4F6] transition-colors duration-100 ease-in-out`}
                      >
                        <div className={`${
                          pathName === submenu?.path ? `${styles.selectedDot}`
                            : `${styles.dot}` }`}>
                          {submenu?.icon}
                        </div>
                        {submenu?.title}
                      </CommandItem>
                    </Link>
                  )
                )}
              </CommandList>
            </Collapse>
          )}

          {option.text === "Report" && (
            <Collapse in={subReportOpen} timeout={"auto"} unmountOnExit>
              <CommandList
                style={{ overflow: "visible" }}
                className="border-b mb-1"
              >
                {option.submenuItems?.map(
                  (submenu: any, submenukey: number) => (
                    <Link key={submenukey} href={submenu.path}>
                      <CommandItem
                        key={submenukey}
                        className={`${
                          pathName === submenu?.path
                            ? `bg-accent border-r-8 font-bold ${styles.menuselected}`
                            : `${styles.sidebarText}`
                        } gap-2 px-7 py-3 leading-5 flex1 hover:bg-[#EBF4F6] transition-colors duration-100 ease-in-out`}
                      >
                        <div className={`${
                          pathName === submenu?.path ? `${styles.selectedDot}`
                            : `${styles.dot}` }`}>
                          {submenu?.icon}
                        </div>
                        {submenu?.title}
                      </CommandItem>
                    </Link>
                  )
                )}
              </CommandList>
            </Collapse>
          )}

          {option.text === "User" && (
            <Collapse in={subUserOpen} timeout={"auto"} unmountOnExit>
              <CommandList
                style={{ overflow: "visible" }}
                className="border-b mb-1"
              >
                {option.submenuItems?.map(
                  (submenu: any, submenukey: number) => (
                    <Link key={submenukey} href={submenu.path}>
                      <CommandItem
                        key={submenukey}
                        className={`${
                          pathName === submenu?.path
                            ? `bg-accent border-r-8 font-bold ${styles.menuselected}`
                            : `${styles.sidebarText}`
                        } gap-2 px-7 py-3 leading-5 flex1 hover:bg-[#EBF4F6] transition-colors duration-100 ease-in-out`}
                      >
                        <div className={`${
                          pathName === submenu?.path ? `${styles.selectedDot}`
                            : `${styles.dot}` }`}>
                          {submenu?.icon}
                        </div>
                        {submenu?.title}
                      </CommandItem>
                    </Link>
                  )
                )}
              </CommandList>
            </Collapse>
          )}

          {option.text === "Master Data" && (
            <Collapse in={subMaterDataOpen} timeout={"auto"} unmountOnExit>
              <CommandList
                style={{ overflow: "visible" }}
                className="border-b mb-1"
              >
                {option.submenuItems?.map(
                  (submenu: any, submenukey: number) => (
                    <Link key={submenukey} href={submenu.path}>
                      <CommandItem
                        key={submenukey}
                        className={`${
                          pathName === submenu?.path
                            ? `bg-accent border-r-8 font-bold ${styles.menuselected}`
                            : `${styles.sidebarText}`
                        } gap-2 px-7 py-3 leading-5 flex1 hover:bg-[#EBF4F6] transition-colors duration-100 ease-in-out`}
                      >
                        <div className={`${
                          pathName === submenu?.path ? `${styles.selectedDot}`
                            : `${styles.dot}` }`}>
                          {submenu?.icon}
                        </div>
                        {submenu?.title}
                      </CommandItem>
                    </Link>
                  )
                )}
              </CommandList>
            </Collapse>
          )}
        </CommandList>
      </div>
    ) : (
      <Link key={optionkey} href={option?.path}>
        <CommandItem
          key={optionkey}
          className={`${
            pathName === option?.path ? 
              `${styles.menuselected}` :
              `${styles.sidebarText}`
          } py-2 flex gap-2 pl-2 hover:bg-[#EBF4F6] transition-colors duration-100 ease-in-out`}
        >
          {pathName === option?.path ? option.iconSelected : option.icon}
          {option.text}
        </CommandItem>
      </Link>
    );
  };

  return (
    <div className="w-[260px] min-w-[260px] min-h-screen border-r bg-white">
      <div style={{ marginLeft: "50px", marginBottom: "-5px" }}>
        <Logo />
      </div>
      <div>
        <Command>
          <CommandList style={{ overflow: "visible" }}>
            {menuList.map((menu: any, menukey: number) => (
              <CommandGroup key={menukey} style={{ overflow: "visible" }}>
                {menu.items.map((option: any, optionKey: number) =>
                  submenu(option, optionKey)
                )}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </div>
    </div>
  );
}
