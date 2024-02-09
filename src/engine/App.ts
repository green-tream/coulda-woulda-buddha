import { Application, Assets } from "pixi.js";
import type { IConfig } from "../config";
import { SceneManager } from "./SceneManager";
import * as ASSETS from "../../public/manifest.json";

export class App {
	private config: IConfig;
	private app: Application;
	public scenes: SceneManager;

	constructor(config: IConfig) {
		this.config = config;
		this.app = new Application(config.application);
		this.scenes = new SceneManager(this.app);

		// Load all assets
		Assets.init({ manifest: "manifest.json" });
		Assets.backgroundLoadBundle(ASSETS.bundles.map((bundle) => bundle.name));

		for (const [key, scene] of Object.entries(this.config.scenes)) {
			this.scenes.add(key, scene);
		}

		this.scenes.start("game");
	}
}
