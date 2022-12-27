import "vite/modulepreload-polyfill";

import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { App } from "./components/App";
import "./styles/global.css";
import { BrowserRouter } from "react-router-dom";
import { AuthenticationProvider } from "~/contexts/AuthenticationContext";
import { ToasterProvider } from "~/contexts/ToasterContext";
import { Toaster } from "~/components/Toaster";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <ToasterProvider>
      <AuthenticationProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
          <Toaster />
          <ReactQueryDevtools
            position="top-right"
            panelPosition="right"
            initialIsOpen={false}
          />
        </QueryClientProvider>
      </AuthenticationProvider>
    </ToasterProvider>
  </StrictMode>
);
