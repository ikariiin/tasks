import { CssBaseline, ThemeProvider } from "@mui/material";
import { SnackbarProvider } from "material-ui-snackbar-provider";
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { lazyImportModule, ModuleType } from "../../services/import";
import { DefaultSuspense } from "../../services/import/default-suspense";
import { persistor, store } from "../../services/store";
import { theme } from "../../services/theme";

const Router = lazyImportModule(ModuleType.Service, "router");

export const Root = () => {
  return (
    <React.StrictMode>
      <DefaultSuspense>
        <Provider store={store}>
          <PersistGate loading="Loading..." persistor={persistor}>
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
          </PersistGate>
        </Provider>
      </DefaultSuspense>
    </React.StrictMode>
  );
};
