import { Elysia } from "elysia";
import { versionRoutes } from "./version.route";

export const routes = new Elysia().use(versionRoutes);
