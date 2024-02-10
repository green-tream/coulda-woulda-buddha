import { Application, Assets } from "pixi.js";
import type { IConfig } from "../config";
import { SceneManager } from "./SceneManager";
import * as ASSETS from "../manifest.json";
import { Viewport } from "pixi-viewport";

export class App {
	private config: IConfig;
	private app: Application;
	public scenes: SceneManager;
	public viewport: Viewport;

	constructor(config: IConfig) {
		this.config = config;
		this.app = new Application(config.application);

		this.viewport = new Viewport({
			screenWidth: window.innerWidth,
			screenHeight: window.innerHeight,
			worldWidth: 1920,
			worldHeight: 1080,
			events: this.app.renderer.events,
		});

		this.scenes = new SceneManager(this.app, this.viewport);
	}

	async setup() {
		await Assets.init({ manifest: ASSETS });
		await Assets.backgroundLoadBundle(
			ASSETS.bundles.map((bundle) => bundle.name)
		);

		for (const [key, scene] of Object.entries(this.config.scenes)) {
			this.scenes.add(key, scene);
		}

		this.app.stage.addChild(this.viewport);

		await this.scenes.start("queens");
	}
}
