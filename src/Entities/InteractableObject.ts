import { Texture } from "pixi.js";
import Entity from "./Entity";
import LevelScene from "../scenes/LevelScene";
import Player from "../player/Player";

export default abstract class InteractableObject extends Entity {
	constructor(
		width: number,
		height: number,
		texture: Texture,
		scene: LevelScene
	) {
		super(width, height, texture, scene);
	}

	abstract interact(player: Player): void;
}
