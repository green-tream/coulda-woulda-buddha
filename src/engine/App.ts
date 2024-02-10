import { Application, Assets } from "pixi.js";
import type { IConfig } from "../config";
import { SceneManager } from "./SceneManager";
import * as ASSETS from "../manifest.json";

export class App {
	private config: IConfig;
	private app: Application;
	public scenes: SceneManager;

	constructor(config: IConfig) {
		this.config = config;
		this.app = new Application(config.application);
		this.scenes = new SceneManager(this.app);
	}

	async setup() {
		await Assets.init({ manifest: ASSETS });
		await Assets.backgroundLoadBundle(
			ASSETS.bundles.map((bundle) => bundle.name)
		);

		for (const [key, scene] of Object.entries(this.config.scenes)) {
			this.scenes.add(key, scene);
		}

		await this.scenes.start("mainMenu");
	}
}
