"use client";
import { Box } from '@mui/material/';

export default function Homepage(){
    return (
        <Box
          sx={{
            flexGrow: 1,
            height: "100vh",
            margin: "20px",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "transparent",
          }}>
        <div className='container w-screen p-4 flex flex-col items-center justify-center'>
            <Box sx={{ p: 3, mx: "auto" }}>
                Homepage
            </Box>
        </div>
        </Box>
    );
}