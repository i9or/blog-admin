import "./setup.mjs";

import { App } from "@tinyhttp/app";
import sirv from "sirv";
import pino from "pino";
import pinoHttp from "pino-http";
import path from "path";
import url from "url";

import { APP_ENV } from "./env.mjs";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProduction = () => process.env.NODE_ENV === "production";

export function html(literalSections, ...substitutions) {
  const raw = literalSections.raw;
  let result = "";

  substitutions.forEach((s, i) => {
    result += raw[i] + s;
  });

  result += raw[raw.length - 1];

  return result;
}

const logger = pino({
  level: isProduction() ? "warn" : "debug",
});
const httpLogger = pinoHttp({ logger });

const app = new App();

try {
  app
    .use(httpLogger)
    .use(
      "/public",
      sirv(path.resolve(__dirname, "./public"), {
        maxAge: 31536000, // 1Y,
        immutable: true,
      })
    )
    .get("/*", (req, res) => {
      res.type("html");
      res.send(html`<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <link
              rel="icon"
              type="image/png"
              href="/public/shell_window6-1.png"
            />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
            <script>
              window.env = {};
              window.env.API_HOST = "${APP_ENV.API_HOST}";
            </script>
            <title>Blog Ministry</title>
          </head>
          <body style="background-color: #222">
            <div id="root" class="h-full w-full"></div>
            <script type="module">
              import RefreshRuntime from "http://localhost:3500/@react-refresh";
              RefreshRuntime.injectIntoGlobalHook(window);
              window.$RefreshReg$ = () => {};
              window.$RefreshSig$ = () => (type) => type;
              window.__vite_plugin_react_preamble_installed__ = true;
            </script>

            <script
              type="module"
              src="http://localhost:3500/@vite/client"
            ></script>
            <script
              type="module"
              src="http://localhost:3500/src/main.tsx"
            ></script>
          </body>
        </html>`);
    })
    .listen(3000, () => logger.info(`🧨 Listening on http://localhost:3000`));
} catch (err) {
  logger.error(err);
}
