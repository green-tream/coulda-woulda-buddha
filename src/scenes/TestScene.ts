import * as PIXI from "pixi.js";
import { Scene } from "../engine/Scene";
import Player from "../Entities/Player";

export default class SplashScene extends Scene {
	private player: Player;

	public init(): void {
		this.player = new Player('sprites/buddha/zen_1.png');
	}

	public start(): void {
		setTimeout(() => {
			console.log("Loading Assest Test");
		}, 5000);
		this.container.addChild(this.player.getSprite());
	}

	public update(delta: number): void {}
}
