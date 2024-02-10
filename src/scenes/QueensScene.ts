import { Graphics, Assets, Texture } from "pixi.js";
import { Scene } from "../engine/Scene";
import Player from "../entities/Player";
import BackgroundObject from "../entities/BackgroundObject";
import LevelScene from "./LevelScene";

export default class QueensScene extends LevelScene {
	BACKGROUND = "background_queens";

	async start() {
		// this.container.addChild(this.background.getSprite());

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

	public update(delta: number): void {
		this.player.update(delta);
	}
}
