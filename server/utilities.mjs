import url from "url";
import path from "path";

const __filename = url.fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

export const isProduction = () => process.env.NODE_ENV === "production";

export function html(literalSections, ...substitutions) {
  const raw = literalSections.raw;
  let result = "";

  substitutions.forEach((s, i) => {
    result += raw[i] + s;
  });

  result += raw[raw.length - 1];

  return result;
}
