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

export default function Login() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  if (loggedInUser) {
    return (
      <div className='container mx-auto p-4 flex flex-col items-center justify-center'>
        <Sidebar/>
        <Homepage />
      </div>
    );
  }

  return (
    <div className='flex h-screen bg-slate-900 items-center justify-center'>
      <div className='flex w-1/2 h-screen shadow-lg'>
        <img src='./image-2.png' alt='bg' />
      </div>
      <div className='flex w-1/2 justify-center'>
        <Box
          className={"bg-gray-700"}
          sx={{
            boxShadow: 3,
            borderRadius: 3,
            p: 5,
            width: "100%",
            maxWidth: 400,
            textAlign: "center",
            color: 'white'
          }}>
          <Typography variant='h4' sx={{ fontWeight: "bold", mb: 2 }}>
            Welcome
          </Typography>
          <Typography variant='subtitle1' sx={{ mb: 4 }}>
            Enter your details to continue
          </Typography>
          <form noValidate> {/*onSubmit={handleLogin}*/}
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  variant='outlined'
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl variant='outlined' fullWidth required>
                  <InputLabel>Password</InputLabel>
                  <OutlinedInput
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          onClick={handleClickShowPassword}
                        //   onMouseDown={handleMouseDownPassword}
                          edge='end'>
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label='Password'
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  sx={{
                    color: "black",
                    backgroundColor: "#f2c9ea",
                    fontWeight: "bold",
                    py: 1.5,
                    "&:hover": {
                      backgroundColor: "#45a049",
                    },
                    borderRadius: "8px",
                  }}>
                  Log In
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </div>
    </div>
  );
}
