import * as PIXI from "pixi.js";
import { Scene } from "../engine/Scene";
import Player from "../Entities/Player";

export default class SplashScene extends Scene {
	private player: Player;
    private background: PIXI.Graphics


	public init(): void {
        this.background = new PIXI.Graphics();

		this.player = new Player('sprites/buddha/zen_1.png');
	}

	public start(): void {

		this.background.beginFill(0x404040);
		this.background.drawRect(0, 0, 800, 800);

		this.container.addChild(this.background);

		setTimeout(() => {
			console.log("Loading Assest Test");
		}, 5000);
		this.container.addChild(this.player.getSprite());

        document.addEventListener('keydown', this.player.handleInput)

	}

	public update(delta: number): void {}
}
