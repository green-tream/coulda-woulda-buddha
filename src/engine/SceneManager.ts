import { Application, Assets } from "pixi.js";
import { Scene } from "./Scene";

export class SceneManager {
	private app: Application;
	private scenes: Map<string, Scene>;

	constructor(app: Application) {
		this.app = app;
		this.scenes = new Map();
	}

	add(key: string, scene: typeof Scene) {
		//@ts-ignore
		this.scenes.set(key, new scene(this.app));
	}

	async start(key: string) {
		await Assets.loadBundle(key);

		this.app.stage.removeChild();

		const scene = this.scenes.get(key);

		if (scene) {
			scene.init();
			scene.start();

			this.app.stage.addChild(scene.container);
			this.app.ticker.add((delta) => scene.update(delta));
		} else {
			throw new Error(`Scene with key ${key} not found`);
		}
	}
}
