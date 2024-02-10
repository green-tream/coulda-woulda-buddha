import * as PIXI from "pixi.js";
import { Scene } from "../engine/Scene";
import { app } from "../index";

export default class SplashScene extends Scene {
	private header: PIXI.Text;
	private background: PIXI.Graphics;

	async init(assets) {
		console.log(assets);

		this.background = new PIXI.Graphics();

		this.header = new PIXI.Text("My Game Studio", {
			fontFamily: assets["gloria-hallelujah"].family,
			fill: "white",
			fontSize: 64,
		});
		this.header.x = this.app!.screen.width / 2;
		this.header.y = this.app!.screen.height / 2;
		this.header.anchor.set(0.5);
	}

	async start() {
		this.background.beginFill(0x404040);
		this.background.drawRect(0, 0, 800, 800);

		this.container.addChild(this.background);

		this.header.angle = 0;
		setTimeout(async () => {
			await app.scenes.start("test");
		}, 5000);
		this.container.addChild(this.header);
	}

	public update(delta: number): void {
		this.header.angle += (delta / 100) * 45;
	}
}
