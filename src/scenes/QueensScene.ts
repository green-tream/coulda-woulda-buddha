import { Graphics, Assets } from "pixi.js";
import { Scene } from "../engine/Scene";
import Player from "../Entities/Player";
import BackgroundObject from "../Entities/BackgroundObject";

export default class QueensScene extends Scene {
	private player: Player;
	private background: BackgroundObject;

	async init(assets) {
		this.background = new BackgroundObject(800, 800, assets["background_queens"]);

		this.player = new Player(100, 150, assets);
		// this.player.position(400, 350);
	}

	async start() {
		this.container.addChild(this.background.getSprite());

		for (const sprite of this.player.getSprites()) {
			this.container.addChild(sprite);
		}
		document.addEventListener("keydown", (event) =>
			this.player.handleKeydown(event)
		);
		document.addEventListener("keyup", (event) =>
			this.player.handleKeyup(event)
		);
	}

	public update(delta: number): void {}
}
