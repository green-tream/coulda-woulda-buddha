import { Texture } from "pixi.js";
import Entity from "./Entity";
import LevelScene from "../scenes/LevelScene";
import Player from "../player/Player";

export default abstract class InteractableObject extends Entity {
	private interactable: boolean = true;

	constructor(width: number, height: number, texture: Texture, scene: LevelScene) {
		super(width, height, texture, scene);
	}

	public isInteractable(): boolean {
		return this.interactable;
	}

	public isWithinThreshold(player: Player): boolean {
		const { x, y } = player.position;

		const distance = Math.pow(this.getSprite().x - x, 2) + Math.pow(this.getSprite().y - y, 2);

		return distance < 100 ** 2;
	}

	abstract interact(player: Player, assets: any): void;
}
