import * as PIXI from "pixi.js";
import { Scene } from "../engine/Scene";
import { app } from "../index";

export default class SplashScene extends Scene {
	private header: PIXI.Text;

	public init(): void {
		this.header = new PIXI.Text("My Game Studio", {
			fontFamily: "GloriaHallelujah",
			fill: "white",
			fontSize: 64,
		});
		this.header.x = this.app!.screen.width / 2;
		this.header.y = this.app!.screen.height / 2;
		this.header.anchor.set(0.5);
	}

	public start(): void {
		this.header.angle = 0;
		setTimeout(() => {
			app.scenes.start("game");
		}, 5000);
		this.container.addChild(this.header);
	}

	public update(delta: number): void {
		this.header.angle += (delta / 100) * 45;
	}
}
