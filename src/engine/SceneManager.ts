import { Application } from "pixi.js";
import { Scene } from "../scenes/Scene";

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

	start(key: string) {
		this.app.stage.removeChildren();

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
