import "./style.css";
import { FILL_COLOR } from "./constants";
import { Application } from "pixi.js";

const view = document.getElementById("game") as HTMLCanvasElement;
const resizeTo = window;
const resolution = window.devicePixelRatio || 1;
const autoDensity = true;
const backgroundColor = FILL_COLOR;

const application = new Application({
	resizeTo,
	resolution,
	autoDensity,
	backgroundColor,
	view,
});
