import { Scene } from "../engine/Scene";
import BackgroundObject from "../entities/BackgroundObject";

export default class MainMenuScene extends Scene {
	private background: BackgroundObject;

	async init(assets) {
		this.assets = assets;
		this.background = new BackgroundObject(
			1920,
			1080,
			this.assets.background_main
		);

		this.viewport.drag();
	}

	async start() {
		this.addEntity(this.background);
	}

	async update(delta: number) {}
}
