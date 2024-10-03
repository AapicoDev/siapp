"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProfileDropdown from "./ProfileDropdown";
import { Profile } from "iconsax-react";
import NotificationDropDown from "./NotificationDropDown";
import SettingDropdown from "./SettingDropDown";
import { Input } from "@/components/ui/textboxs/input"
import { SearchTextbox } from "./ui/textboxs/searchTextbox";

const Navbar = ({ menu, submenu }: any) => {
  const router = useRouter();
  const [isDisplaySearhBox, setIsDisplaySearhBox] = useState('none');
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if(submenu==='Segment'){
      setIsDisplaySearhBox("");
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchValue(value);
  };
  
  return (
    <nav className="bg-[#EBF4F6] w-full">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <div className="bg-[#37B7c3] text-white text-xs font-medium px-2 py-1 rounded-lg mr-2">
              {menu}
            </div>
            <span className="text-[#2C5079] text-2xl font-semibold">{submenu}</span>
          </div>
          <div className="flex items-center space-x-2 ">
            <Input
              type="text"
              placeholder="Search..."
              style={{display: `${isDisplaySearhBox}`, 
                      boxShadow: "0px 5px 12px rgba(29, 122, 155, 0.1)",
                      borderRadius: "10px",}}
              className="border-none bg-white p-4 mr-2 min-w-80 custom-placeholder"
            />
            {/* <SearchTextbox style={{display: `${isDisplaySearhBox}`}} name="searchNav" inputType="type" placeHolder="Search..." handleChange={handleChange} /> */}
            {/* <button className="p-2 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 bg-white">
              <span className="sr-only">View settings</span>
              <Setting2 variant="Bold"/>
            </button> */}
            <SettingDropdown/>
            {/* <button className="p-2 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 bg-white">
              <span className="sr-only">View notifications</span>
              <Notification variant="Bold"/>
            </button> */}
            <NotificationDropDown/>
            <button
              className="p-2 rounded-full text-gray-400 hover:bg-accent hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 bg-white"
              onClick={(e) => {
                e.preventDefault();
                router.push("/login");
              }}
            >
              <span className="sr-only">View profile</span>
              <Profile variant="Bold" size={20}/>
            </button>
            {/* <ProfileDropdown/> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
