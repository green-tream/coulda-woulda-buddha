import { Graphics } from "pixi.js";
import { app } from "..";
import { Scene } from "../engine/Scene";
import BackgroundObject from "../entities/BackgroundObject";
import ForegroundObject from "../entities/ForegroundObject";
import UIObject from "../entities/UIObject";
import { HEIGHT, WIDTH } from "../constants";
import { Actions } from "pixi-actions";
import { fadeOutToScene } from "../utils";

export default class EndScene extends Scene {
	async init(assets) {
		console.log(assets);

		// background
		this.assets = assets;
		this.background = new BackgroundObject(
			assets.end_background.baseTexture.width * (HEIGHT / assets.end_background.baseTexture.height),
			HEIGHT,
			this.assets.end_background,
			this
		);

		this.initViewport();

		this.addEntity(this.background);
	}

	async start() {}

	async update(delta: number) {}
}
