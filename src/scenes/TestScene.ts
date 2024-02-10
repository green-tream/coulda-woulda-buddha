import { Graphics, Assets } from "pixi.js";
import { Scene } from "../engine/Scene";
import Player from "../Entities/Player";
import EnviromentObject from "../Entities/EnviromentObject";

export default class TestScene extends Scene {
	private player: Player;
	private background: EnviromentObject;

	async init(assets) {
		this.background = new EnviromentObject(800, 800, "./background_dummy.png");

		this.player = new Player(100, 150, assets);
		this.player.position(400, 350);
	}

	async start() {
		this.container.addChild(this.background.getSprite());

		this.container.addChild(this.player.getSprite());
		document.addEventListener("keydown", (event) =>
			this.player.handleInput(event)
		);
	}

	public update(delta: number): void {}
}
