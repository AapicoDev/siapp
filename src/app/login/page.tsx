/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Homepage from "../(auth)/dashboard/page";
//import { login } from "../appwrite";
import {
  Box,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Header from "../../components/Header";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import { login } from "../appwrite";

export default function Login() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [email, setEmail] = useState("demo@demo.com");
  const [password, setPassword] = useState("12345678");
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  //   const handleMouseDownPassword = (event) => {
  //     event.preventDefault();
  //   };

  //   const handleLogin = async (e) => {
  //     e.preventDefault();
  //     try {
  //       const user = await login(email, password);
  //       setLoggedInUser(user);
  //     } catch (error) {
  //       alert("Login failed. Please check your credentials and try again.");
  //     }
  //   };

  // if (loggedInUser) {
  //   return (
  //     <div className='container mx-auto p-4 flex flex-col items-center justify-center'>
  //       <Sidebar/>
  //       <Homepage />
  //     </div>
  //   );
  // }
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-800 to-teal-500 flex items-center justify-center p-4">
      <div className="flex h-auto w-full">
        <div className="flex my-auto w-2/3 justify-center">
          <img
            src="./ASM-Logo-WhiteTransparent 1.png"
            width="200px"
            height="100px"
            alt="log"
          />
        </div>
        <div className="flex flex-col justify-center mr-16 bg-white rounded-lg shadow-xl p-16 w-[500px] h-[500px]">
          <h2 className="text-2xl font-semibold text-blue-900 mb-6 mx-auto">
            Data Management
            <br />
            &amp; Executive View
          </h2>
          <form>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              onClick={async (e) => {
                e.preventDefault();
                console.log("click");
                const loginResult = await login(email, password);
                if (loginResult) {
                  router.push("dashboard");
                } else {
                  alert("Login failed");
                }
              }}
              className="w-full bg-gradient-to-r from-blue-600 to-teal-400 text-white font-semibold py-2 px-4 rounded-md hover:from-blue-700 hover:to-teal-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Log in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
