import { Application, Container } from "pixi.js";

export abstract class Scene {
	public app: Application;
	public container: Container;

	constructor(app: Application) {
		this.app = app;
		this.container = new Container();
	}

	public abstract init(assets: any): void;
	public abstract start(assets: any): void;
	public abstract update(delta: number, assets: any): void;
}
