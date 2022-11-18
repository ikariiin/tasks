import { createTheme, experimental_sx as sx } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#070707",
      paper: "#0D0611",
    },
    primary: {
      main: "#E0FB4A",
    },
    secondary: {
      main: "#C17182",
    },
    text: {
      primary: "#FCF7F1",
    },
  },
  typography: {
    fontFamily: [
      "InterVariable",
      "Inter",
      "SF Pro Text",
      "SF Pro Display",
      "system-ui",
      "-apple-system",
      "BlinkMacSystemFont",
      "Segoe UI",
      "Roboto",
      "Helvetica Neue",
      "Arial",
      "Noto Sans",
      "sans-serif",
    ].join(","),
    allVariants: {
      letterSpacing: "-0.015em",
      fontWeight: 500,
    },
    h1: {
      letterSpacing: "-0.05em",
      fontSize: "4.5rem",
      fontWeight: 600,
    },
    h2: {
      letterSpacing: "-0.05em",
      fontWeight: 600,
    },
    h3: {
      letterSpacing: "-0.05em",
      fontWeight: 600,
    },
    // We'll get to the rest when we need them
    h6: {
      fontWeight: 400,
      letterSpacing: "-0.02em",
    },
    fontSize: 14,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          WebkitFontSmoothing: "auto",
        },
      },
    },
    // Make the border for outlined textfields 2px wide
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: sx({
          borderWidth: 2,
          borderColor: `action.active`,
        }),
      },
    },
    // Similarly, make the border for outlined buttons 2px wide
    MuiButton: {
      styleOverrides: {
        outlined: {
          borderWidth: 2,
          "&:hover": {
            borderWidth: 2,
          },
        },
      },
    },
  },
  shape: {
    borderRadius: 8,
  },
});
