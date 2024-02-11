import { Sprite } from "pixi.js";
import Block from "./block";

export default class BoxBlock extends Block {
	private sprite: Sprite;
	public interactable: boolean;

	constructor(i: number, j: number, size: number, sprite: Sprite, interactable: boolean) {
		super(i, j, size);
		this.sprite = sprite;
		this.interactable = interactable;
	}

	getSprite(): Sprite {
		return this.sprite;
	}
}
