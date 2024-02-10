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
			WIDTH / 3,
			HEIGHT,
			this.assets.background_main_menu,
			this
		);

		// buddha
		this.buddha = new UIObject(
			this.assets.menu_buddha_closed.baseTexture.width / 7,
			this.assets.menu_buddha_closed.baseTexture.height / 7,
			this.assets.menu_buddha_closed,
			this
		);

		this.buddha.position(1060, 250);

		// play button
		this.playButton = new UIObject(
			this.assets.play_button.baseTexture.width / 2,
			this.assets.play_button.baseTexture.height / 2,
			this.assets.play_button,
			this
		);

		this.playButton.position(1050, 650);

		this.addEntity(this.background);
		this.addEntity(this.buddha);
		this.addEntity(this.playButton);
	}

	async start() {
		this.playButton.getSprite().on("click", () => fadeToScene(this, "queens"));

		this.buddha.getSprite().on("click", () => {
			if (this.buddhaOpen) return;

			this.buddhaOpen = true;

			Actions.sequence(
				Actions.runFunc(() =>
					this.buddha.setSpriteTexture(this.assets.menu_buddha_middle)
				),
				Actions.delay(0.1),
				Actions.runFunc(() =>
					this.buddha.setSpriteTexture(this.assets.menu_buddha_open)
				),
				Actions.delay(1.5),
				Actions.runFunc(() =>
					this.buddha.setSpriteTexture(this.assets.menu_buddha_middle)
				),
				Actions.delay(0.1),
				Actions.runFunc(() =>
					this.buddha.setSpriteTexture(this.assets.menu_buddha_closed)
				),
				Actions.runFunc(() => (this.buddhaOpen = false))
			).play();
		});
	}

	async update(delta: number) {}
}
