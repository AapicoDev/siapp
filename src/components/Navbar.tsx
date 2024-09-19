"use client";
import React from "react";
import { Bell, Settings, User } from "lucide-react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  return (
    <nav className="bg-[#EBF4F6] w-full">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <div className="bg-teal-500 text-white text-xs font-bold px-2 py-1 rounded mr-2">
              SIAPP
            </div>
            <span className="text-gray-900 text-xl font-semibold">Patrol</span>
          </div>
          <div className="flex items-center space-x-2 ">
            <button className="p-2 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 bg-white">
              <span className="sr-only">View settings</span>
              <Settings className="h-6 w-6 " />
            </button>
            <button className="p-2 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 bg-white">
              <span className="sr-only">View notifications</span>
              <Bell className="h-6 w-6" />
            </button>
            <button
              className="p-2 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 bg-white"
              onClick={(e) => {
                e.preventDefault();
                router.push("/login");
              }}
            >
              <span className="sr-only">View profile</span>
              <User className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
