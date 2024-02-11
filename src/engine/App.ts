import { Application, Assets, Point } from "pixi.js";
import type { IConfig } from "../config";
import { SceneManager } from "./SceneManager";
import * as ASSETS from "../manifest.json";
import { Viewport } from "pixi-viewport";
import { HEIGHT, WIDTH } from "../constants";
import { Actions } from "pixi-actions";

export class App {
	private config: IConfig;
	private app: Application;
	public scenes: SceneManager;
	public viewport: Viewport;

	constructor(config: IConfig) {
		this.config = config;
		this.app = new Application(config.application);

		this.viewport = new Viewport({
			screenWidth: WIDTH,
			screenHeight: HEIGHT,
			worldWidth: WIDTH,
			worldHeight: HEIGHT,
			events: this.app.renderer.events,
		});

		this.scenes = new SceneManager(this.app, this.viewport);
	}

	async setup() {
		await Assets.init({ manifest: ASSETS });
		await Assets.backgroundLoadBundle(ASSETS.bundles.map((bundle) => bundle.name));

		for (const [key, scene] of Object.entries(this.config.scenes)) {
			this.scenes.add(key, scene);
		}

		this.app.stage.addChild(this.viewport);
		this.viewport.clamp({ direction: "all" }).decelerate();

		this.app.ticker.maxFPS = 60;
		this.app.ticker.add((delta) => Actions.tick(delta / 60));

		await this.scenes.start("mainMenu");
	}
}
