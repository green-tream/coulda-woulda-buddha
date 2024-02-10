import { Graphics } from "pixi.js";
import { app } from "..";
import { Scene } from "../engine/Scene";
import BackgroundObject from "../entities/BackgroundObject";
import ForegroundObject from "../entities/ForegroundObject";
import UIObject from "../entities/UIObject";
import { HEIGHT, WIDTH } from "../constants";
import { Actions } from "pixi-actions";
import { fadeToScene } from "../utils";

export default class MainMenuScene extends Scene {
	private background: BackgroundObject;
	private buddha: UIObject;
	private playButton: UIObject;
	private buddhaOpen: boolean = false;

	async init(assets) {
		// background
		this.assets = assets;
		this.background = new BackgroundObject(
			1600,
			900,
			this.assets.background_main_menu
		);

		// buddha
		this.buddha = new UIObject(
			this.assets.buddha_closed.baseTexture.width / 7,
			this.assets.buddha_closed.baseTexture.height / 7,
			this.assets.buddha_closed
		);

		this.buddha.position(1060, 250);
		this.buddha.getSprite().cursor = "pointer";

		// play button
		this.playButton = new UIObject(
			this.assets.play_button.baseTexture.width / 2,
			this.assets.play_button.baseTexture.height / 2,
			this.assets.play_button
		);

		this.playButton.position(1050, 650);
		this.playButton.getSprite().cursor = "pointer";
	}

	async start() {
		this.addEntity(this.background);
		this.addEntity(this.buddha);
		this.addEntity(this.playButton);

		this.playButton.getSprite().on("click", () => fadeToScene(this, "queens"));
		this.buddha.getSprite().on("click", () => {
			if (this.buddhaOpen) return;

			this.buddhaOpen = true;

			Actions.sequence(
				Actions.runFunc(
					() => (this.buddha.getSprite().texture = this.assets.buddha_middle)
				),
				Actions.delay(0.1),
				Actions.runFunc(
					() => (this.buddha.getSprite().texture = this.assets.buddha_open)
				),
				Actions.delay(1.5),
				Actions.runFunc(
					() => (this.buddha.getSprite().texture = this.assets.buddha_middle)
				),
				Actions.delay(0.1),
				Actions.runFunc(
					() => (this.buddha.getSprite().texture = this.assets.buddha_closed)
				),
				Actions.runFunc(() => (this.buddhaOpen = false))
			).play();
		});
	}

	async update(delta: number) {}
}
