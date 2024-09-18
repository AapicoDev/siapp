"use client";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { useMemo } from "react";

// Create a theme instance
const theme = createTheme({
  palette: {
    //mode: "dark", // or 'dark'
  },
  typography: {
    fontFamily: 'Kanit, sans-serif',
    // Customize your typography here if needed
  }
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
