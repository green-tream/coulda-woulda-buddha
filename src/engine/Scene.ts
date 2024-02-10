import { Container } from "pixi.js";
import Entity from "../entities/Entity";
import { Viewport } from "pixi-viewport";

export abstract class Scene {
	public viewport: Viewport;
	public container: Container;
	public assets: any;

	constructor(viewport: Viewport) {
		this.viewport = viewport;
		this.container = new Container();
	}

	addEntity(entity: Entity) {
		this.container.addChild(entity.getSprite());
	}

	public abstract init(assets: any): void;
	public abstract start(): void;
	public abstract update(delta: number): void;
}
