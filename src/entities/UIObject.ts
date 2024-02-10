import { Texture } from "pixi.js";
import Entity from "./Entity";

export default class UIObject extends Entity {
	constructor(width: number, height: number, texture: Texture) {
		super(width, height, texture);
		this.getSprite().eventMode = "static";
	}
}
