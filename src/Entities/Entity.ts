import { Sprite, Texture } from "pixi.js";
import { Scene } from "../engine/Scene";

export default class Entity {
	private width: number;
	private height: number;
	private sprite: Sprite;
	public scene: Scene;

	constructor(width: number, height: number, texture: Texture, scene: Scene) {
		this.width = width;
		this.height = height;
		this.sprite = new Sprite(texture);
		this.scene = scene;

		this.sprite.width = width;
		this.sprite.height = height;
	}

	position(posx: number, posy: number): void {
		this.sprite.x = posx;
		this.sprite.y = posy;
	}

	getSprite(): Sprite {
		return this.sprite;
	}

	moveSprite(x: number, y: number): void {
		this.sprite.x += x;
		this.sprite.y += y;
	}

	setSpriteTexture(texture: Texture, scale): void {
		this.sprite.texture = texture;
		this.sprite.scale.set(scale);
	}
}
