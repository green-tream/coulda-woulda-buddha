import { Application, Container } from "pixi.js";
import Entity from "../entities/Entity";

export abstract class Scene {
	public app: Application;
	public container: Container;
	public assets: any;

	constructor(app: Application) {
		this.app = app;
		this.container = new Container();
	}

	addEntity(entity: Entity) {
		this.container.addChild(entity.getSprite());
	}

	public abstract init(assets: any): void;
	public abstract start(): void;
	public abstract update(delta: number): void;
}
