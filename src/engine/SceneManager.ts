import { Application, Assets, TickerCallback } from "pixi.js";
import { Scene } from "./Scene";
import { Viewport } from "pixi-viewport";

export class SceneManager {
	private viewport: Viewport;
	private app: Application;
	private scenes: Map<string, Scene>;
	private currentUpdate: TickerCallback<string>;

	constructor(app: Application, viewport: Viewport) {
		this.viewport = viewport;
		this.app = app;
		this.scenes = new Map();
	}

	add(key: string, scene: typeof Scene) {
		//@ts-ignore
		this.scenes.set(key, new scene(this.app, this.viewport));
	}

	async start(key: string) {
		const assets = await Assets.loadBundle(key);

		this.viewport.removeChildren();
		this.app.ticker.remove(this.currentUpdate, key);

		for (const scene of this.viewport.children) {
			scene.destroy();
			this.viewport.removeChild(scene);
		}

		const scene = this.scenes.get(key);

		if (scene) {
			await scene.init(assets);
			await scene.start();

			this.currentUpdate = (delta) => scene.update(delta);

			this.viewport.addChild(scene.container);
			this.app.ticker.add(this.currentUpdate, key);
		} else {
			throw new Error(`Scene with key ${key} not found`);
		}
	}
}
