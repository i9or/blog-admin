// @ts-ignore
import { APP_ENV } from "../../env.mjs";

type EnvironmentKeys = keyof typeof APP_ENV;

type ClientEnvironment = Readonly<Record<EnvironmentKeys, string>>;

export const CLIENT_ENV = (
  window as unknown as Window & { env: ClientEnvironment }
).env;
