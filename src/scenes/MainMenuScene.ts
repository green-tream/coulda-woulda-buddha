import { Graphics } from "pixi.js";
import { app } from "..";
import { Scene } from "../engine/Scene";
import BackgroundObject from "../entities/BackgroundObject";
import ForegroundObject from "../entities/ForegroundObject";
import UIObject from "../entities/UIObject";
import { HEIGHT, WIDTH } from "../constants";
import { Actions } from "pixi-actions";
import { fadeOutToScene } from "../utils";

export default class MainMenuScene extends Scene {
	private buddha: UIObject;
	private playButton: UIObject;
	private buddhaOpen: boolean = false;

	async init(assets) {
		// background
		this.assets = assets;
		this.background = new BackgroundObject(
			assets.background_main_menu.baseTexture.width *
				(HEIGHT / assets.background_main_menu.baseTexture.height),
			HEIGHT,
			this.assets.background_main_menu,
			this
		);

		this.initViewport();

		// buddha
		this.buddha = new UIObject(
			this.assets.menu_buddha_closed.baseTexture.width,
			this.assets.menu_buddha_closed.baseTexture.height,
			this.assets.menu_buddha_closed,
			this
		);

		this.buddha.getSprite().scale.set(0.14);
		this.buddha.position(WIDTH * 0.67, HEIGHT * 0.1);

		// play button
		this.playButton = new UIObject(
			this.assets.play_button.baseTexture.width / 3,
			this.assets.play_button.baseTexture.height / 3,
			this.assets.play_button,
			this
		);

		this.playButton.position(WIDTH * 0.7, HEIGHT * 0.7);

		this.addEntity(this.background);
		this.addEntity(this.buddha);
		this.addEntity(this.playButton);
	}

	async start() {
		this.playButton.getSprite().on("click", () => {
			const audioContext = new window.AudioContext();
			const source = audioContext.createBufferSource();
			source.connect(audioContext.destination);
			fetch("soundtrack.wav")
				.then((response) => response.arrayBuffer())
				.then((buffer) => audioContext.decodeAudioData(buffer))
				.then((audioBuffer) => {
					source.buffer = audioBuffer;
					source.loop = true; // Set looping to true
					source.start(0); // Start playing the sound
				})
				.catch((error) => console.error(error));

			fadeOutToScene(this, "queens", this.viewport).play();
		});

		this.buddha.getSprite().on("click", () => {
			if (this.buddhaOpen) return;

			this.buddhaOpen = true;

			Actions.sequence(
				Actions.runFunc(() => this.buddha.setSpriteTexture(this.assets.menu_buddha_middle, 0.14)),
				Actions.delay(0.1),
				Actions.runFunc(() => this.buddha.setSpriteTexture(this.assets.menu_buddha_open, 0.14)),
				Actions.delay(1.5),
				Actions.runFunc(() => this.buddha.setSpriteTexture(this.assets.menu_buddha_middle, 0.14)),
				Actions.delay(0.1),
				Actions.runFunc(() => this.buddha.setSpriteTexture(this.assets.menu_buddha_closed, 0.14)),
				Actions.runFunc(() => (this.buddhaOpen = false))
			).play();
		});
	}

	async update(delta: number) {}
}
