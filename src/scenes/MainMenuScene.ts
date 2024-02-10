import * as PIXI from "pixi.js";
import { Scene } from "../engine/Scene";
import { app } from "../index";
import BackgroundObject from "../entities/BackgroundObject";

export default class MainMenuScene extends Scene {
	async init(assets) {
		this.assets = assets;
		this.background = new PIXI.Graphics();
	}

	async start() {
		this.background.drawRect(0, 0, 800, 800);

		this.container.addChild(this.background);

		setTimeout(async () => {
			await app.scenes.start("queens");
		}, 5000);
	}

	async update(delta: number) {}
}
