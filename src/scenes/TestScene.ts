import * as PIXI from "pixi.js";
import { Scene } from "../engine/Scene";
import Player from "../Entities/Player";

export default class SplashScene extends Scene {
	private player: Player;
    private background: PIXI.Graphics


	public init(): void {
        this.background = new PIXI.Graphics();

		this.player = new Player(100, 150, 'sprites/buddha/zen.png');
        this.player.position(400, 350);
	}

	public start(): void {

		this.background.beginFill(0x404040);
		this.background.drawRect(0, 0, 800, 800);
		this.container.addChild(this.background);

		this.container.addChild(this.player.getSprite());
        document.addEventListener('keydown', event => this.player.handleInput(event))

	}

	public update(delta: number): void {}
}
