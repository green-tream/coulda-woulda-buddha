import { App } from "./engine/App";
import { Config } from "./config";
import { HEIGHT, WIDTH } from "./constants";

(document.querySelector("#view") as HTMLDivElement).style.height = `${HEIGHT}px`;
(document.querySelector("#view") as HTMLDivElement).style.width = `${WIDTH}px`;

export const app = new App(Config);
await app.setup();
