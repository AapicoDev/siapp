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
    MuiTab: {
      styleOverrides: {
        root: {
          color: "#2c5079", 
          fontWeight: 400,
          textTransform: "none",
          fontSize: "16px",
          '&.Mui-selected': {
            color: "#1D7A9B",
            fontWeight: 700,
            borderBottom: "3px solid #1D7A9B",
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: 'transparent',
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        toolbar: {
          fontSize: "14px", // Customize toolbar font size
        },
        selectLabel: {
          fontSize: "16px", // Customize "Rows per page" label font size
        },
        displayedRows: {
          fontSize: "16px", // Customize "1-10 of X" text font size
        },
        select: {
          fontSize: "16px", // Customize dropdown font size
          paddingRight: "32px",
          paddingTop: "8px"
        },
        selectIcon: {
          left: "20px", // Adjust the dropdown icon position
        },
        actions: {
          "& .MuiSvgIcon-root": {
            fontSize: "2rem", // Customize icon size
          },
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
