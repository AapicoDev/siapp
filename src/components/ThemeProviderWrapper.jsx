"use client";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { useMemo } from "react";
// import '@fontsource/poppins'; 
// import '@fontsource/bai-jamjuree'; 

// Create a theme instance
const theme = createTheme({
  palette: {
    mode: "dark", // or 'dark'
  },
  typography: {
    fontFamily: 'sans-serif, Poppins, Bai jamjuree',
    // Customize your typography here if needed
  },
  // Add other MUI theme customizations here if needed
});

const ThemeProviderWrapper = ({ children }) => {
  const themeMemo = useMemo(() => theme, []);
  return (
    <ThemeProvider theme={themeMemo}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default ThemeProviderWrapper;
