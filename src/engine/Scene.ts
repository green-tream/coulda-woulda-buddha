import { Application, Container, DisplayObject } from "pixi.js";
import Entity from "../entities/Entity";
import { Viewport } from "pixi-viewport";

export abstract class Scene {
	public viewport: Viewport;
	public app: Application;
	public container: Container;
	public assets: any;

	constructor(app: Application, viewport: Viewport) {
		this.viewport = viewport;
		this.app = app;
		this.container = new Container();
	}

	addEntity(entity: Entity) {
		this.container.addChild(entity.getSprite());
	}

	addDisplayObject(object: DisplayObject) {
		this.container.addChild(object);
	}

	public abstract init(assets: any): void;
	public abstract start(): void;
	public abstract update(delta: number): void;
}
