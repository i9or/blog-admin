import "./setup.mjs";

import { App } from "@tinyhttp/app";
import sirv from "sirv";
import pino from "pino";
import pinoHttp from "pino-http";
import path from "path";

import { isProduction, __dirname } from "./utilities.mjs";

import { APP_ENV } from "../env.mjs";
import { Layout } from "./templates.mjs";

const logger = pino({
  level: isProduction() ? "warn" : "debug",
});
const httpLogger = pinoHttp({ logger });

const app = new App();

const publicFolder = isProduction()
  ? path.resolve(__dirname, "../dist")
  : path.resolve(__dirname, "../public");

try {
  app
    .use(httpLogger)
    .use(
      "/public",
      sirv(publicFolder, {
        maxAge: 31536000, // 1Y,
        immutable: true,
      })
    )
    .get("/*", (req, res) => {
      res.type("html");
      res.send(Layout());
    })
    .listen(APP_ENV.ADMIN_PORT, () =>
      logger.info(`🧨 Listening on http://localhost:${APP_ENV.ADMIN_PORT}`)
    );
} catch (err) {
  logger.error(err);
}
