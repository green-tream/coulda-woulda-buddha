import { Sprite, Texture } from "pixi.js";
import Entity from "./Entity";
import { Scene } from "../engine/Scene";

export default class BackgroundObject extends Entity {
	constructor(width: number, height: number, texture: Texture, scene: Scene) {
		super(width, height, texture, scene);
	}
}
