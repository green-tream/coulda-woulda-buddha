import { Texture } from "pixi.js";
import Entity from "./Entity";
import { Scene } from "../engine/Scene";

export default class UIObject extends Entity {
	constructor(width: number, height: number, texture: Texture, scene: Scene) {
		super(width, height, texture, scene);
		this.getSprite().eventMode = "static";
		this.getSprite().cursor = "pointer";
	}
}
