import { CssBaseline, ThemeProvider } from "@mui/material";
import { SnackbarProvider } from "material-ui-snackbar-provider";
import React from "react";
import { Provider } from "react-redux";
import { lazyImportModule, ModuleType } from "../../services/import";
import { DefaultSuspense } from "../../services/import/default-suspense";
import { store } from "../../services/store";
import { theme } from "../../services/theme";

const Router = lazyImportModule(ModuleType.Service, "router");

export const Root = () => {
  return (
    <DefaultSuspense>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <SnackbarProvider
            SnackbarProps={{
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "center",
              },
              autoHideDuration: 5_000,
            }}
          >
            <CssBaseline />
            <Router />
          </SnackbarProvider>
        </ThemeProvider>
      </Provider>
    </DefaultSuspense>
  );
};
