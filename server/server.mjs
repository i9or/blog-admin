import "./setup.mjs";

import { App } from "@tinyhttp/app";
import sirv from "sirv";
import pino from "pino";
import pinoHttp from "pino-http";
import path from "path";
import fs from "fs";
import https from "https";

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
  });

try {
  if (process.env.SECURE_SERVER) {
    const httpsOptions = {
      key: fs.readFileSync(
        path.resolve(__dirname, "../keys/localhost-private-key.pem")
      ),
      cert: fs.readFileSync(
        path.resolve(__dirname, "../keys/localhost-cert.pem")
      ),
    };
    const httpsServer = https.createServer(httpsOptions);

    httpsServer.on("request", app.attach).listen(3001);
  } else {
    app.listen(APP_ENV.ADMIN_PORT, () =>
      logger.info(`🧨 Listening on http://localhost:${APP_ENV.ADMIN_PORT}`)
    );
  }
} catch (err) {
  logger.error(err);
}
