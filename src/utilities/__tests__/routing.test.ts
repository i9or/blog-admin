import { test, expect } from "vitest";
import { toFromPath } from "~/utilities/routing";

test("toFromPath should add leading forward slash to the path", () => {
  expect(toFromPath("hello")).toBe("/hello");
  expect(toFromPath("")).toBe("/");
});
