import { Application } from "pixi.js";
import type { IConfig } from "../config";
import { SceneManager } from "./SceneManager";

export class App {
	private config: IConfig;
	private app: Application;
	private scenes: SceneManager;

	constructor(config: IConfig) {
		this.config = config;
		this.app = new Application(config.application);
		this.scenes = new SceneManager(this.app);

		for (const [key, scene] of Object.entries(this.config.scenes)) {
			this.scenes.add(key, scene);
		}

		this.scenes.start("game");
	}
}
