import { App } from "./engine/App";
import { Config } from "./config";

export const app = new App(Config);
await app.setup();
