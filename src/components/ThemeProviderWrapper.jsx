"use client";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { useMemo } from "react";
import { Kanit } from "next/font/google";

const kanit = Kanit({
  weight: ["300", "400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

// Create a theme instance
const theme = createTheme({
  palette: {
    //mode: "dark", // or 'dark'
  },
  typography: {
    fontFamily: kanit.style.fontFamily,
    // Customize your typography here if needed
  },
  // Add other MUI theme customizations here if needed
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          color: "#2C5079",
          borderBottom: "none",
          padding: "10px 10px 10px 20px",
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "#C7D4D7", // Default color
          "&.Mui-checked": {
            color: "#1D7A9B", // Customize the checked color
          },
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fontSize: "3rem", // Customize the size of the check sign
        },
      },
    },
  },
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
