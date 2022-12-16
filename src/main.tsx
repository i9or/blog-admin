import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { App } from "./components/App";
import "./styles/global.css";
import { BrowserRouter } from "react-router-dom";
import { AuthenticationProvider } from "~/contexts/AuthenticationContext/AuthenticationContext";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthenticationProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
        <ReactQueryDevtools
          position="top-right"
          panelPosition="right"
          initialIsOpen={false}
        />
      </QueryClientProvider>
    </AuthenticationProvider>
  </React.StrictMode>
);
