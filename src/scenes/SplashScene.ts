import * as PIXI from "pixi.js";
import { Scene } from "./Scene";

export default class SplashScene extends Scene {
	private header: PIXI.Text;

	public init(): void {
		this.header = new PIXI.Text("My Game Studio");
		this.header.x = this.app!.screen.width / 2;
		this.header.y = this.app!.screen.height / 2;
		this.header.anchor.set(0.5);
	}

	public start(): void {
		this.header.angle = 0;
		setTimeout(() => {
			console.log("hi!");
		}, 5000);
	}

	public update(delta: number): void {
		this.header.angle += (delta / 1000) * 45;
	}
}
