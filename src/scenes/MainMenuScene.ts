import * as PIXI from "pixi.js";
import { Scene } from "../engine/Scene";
import { app } from "../index";
import BackgroundObject from "../entities/BackgroundObject";

export default class MainMenuScene extends Scene {
	async init(assets) {
		console.log(assets);
		new BackgroundObject(1920, 1080, "background");
	}

	async start() {}

	async update(delta: number) {}
}
