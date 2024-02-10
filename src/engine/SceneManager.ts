import { Application, Assets, TickerCallback } from "pixi.js";
import { Scene } from "./Scene";

export class SceneManager {
	private app: Application;
	private scenes: Map<string, Scene>;
	private currentUpdate: TickerCallback<string>;

	constructor(app: Application) {
		this.app = app;
		this.scenes = new Map();
	}

	add(key: string, scene: typeof Scene) {
		//@ts-ignore
		this.scenes.set(key, new scene(this.app));
	}

	async start(key: string) {
		const assets = await Assets.loadBundle(key);

		this.app.stage.removeChildren();
		this.app.ticker.remove(this.currentUpdate, key);

		const scene = this.scenes.get(key);

		if (scene) {
			await scene.init(assets);
			await scene.start();

			this.currentUpdate = (delta) => scene.update(delta);

			this.app.stage.addChild(scene.container);
			this.app.ticker.add(this.currentUpdate, key);
		} else {
			throw new Error(`Scene with key ${key} not found`);
		}
	}
}
