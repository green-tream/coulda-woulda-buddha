import * as PIXI from "pixi.js";
import { Scene } from "../engine/Scene";
import { app } from "../index";

export default class MainMenuScene extends Scene {
	private header: PIXI.Text;
	private background: PIXI.Graphics;

	async init(assets) {
		this.background = new PIXI.Graphics();
	}

	async start() {
		this.background.drawRect(0, 0, 800, 800);

		this.container.addChild(this.background);

		setTimeout(async () => {
			await app.scenes.start("queens");
		}, 5000);
	}

	async update(delta: number) {
		this.background.beginFill(Math.random() * 1000 * 0x000001);
		this.background.drawRect(0, 0, 800, 800);
	}
}
