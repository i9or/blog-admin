import fs from "fs";
import path from "path";

import { html, isProduction, __dirname } from "./utilities.mjs";
import { APP_ENV } from "../env.mjs";

let _manifest = undefined;

const getManifest = () => {
  if (!_manifest) {
    const rawFileContents = fs.readFileSync(
      path.resolve(__dirname, "../dist/manifest.json"),
      "utf-8"
    );

    _manifest = JSON.parse(rawFileContents);
  }

  return _manifest;
};

const ProductionStyles = () => {
  if (!isProduction()) {
    return "";
  }

  const manifest = getManifest();
  const mainStyles = `/public/${manifest["src/main.css"].file}`;

  return html`<link rel="stylesheet" href="${mainStyles}" />`;
};

const ProductionScripts = () => {
  if (!isProduction()) {
    return "";
  }

  const manifest = getManifest();
  const entryScript = `/public/${manifest["src/main.tsx"].file}`;

  return html`<script src="${entryScript}"></script>`;
};

const DevelopmentScripts = () => {
  return isProduction()
    ? ""
    : html`<script type="module">
          import RefreshRuntime from "http://localhost:3500/public/@react-refresh";
          RefreshRuntime.injectIntoGlobalHook(window);
          window.$RefreshReg$ = () => {};
          window.$RefreshSig$ = () => (type) => type;
          window.__vite_plugin_react_preamble_installed__ = true;
        </script>

        <script
          type="module"
          src="http://localhost:3500/public/@vite/client"
        ></script>
        <script
          type="module"
          src="http://localhost:3500/public/src/main.tsx"
        ></script>`;
};

export const Layout = () => {
  return html`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/png" href="/public/shell_window6-1.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        ${ProductionStyles()}
        <script>
          window.env = {};
          window.env.API_HOST = "${APP_ENV.API_HOST}";
        </script>
        <title>Blog Ministry</title>
      </head>
      <body style="background-color: #222">
        <div id="root" class="h-full w-full"></div>
        ${DevelopmentScripts()} ${ProductionScripts()}
      </body>
    </html>`;
};
