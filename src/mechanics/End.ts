import { Texture } from "pixi.js";
import ForegroundObject from "../entities/ForegroundObject";
import { Scene } from "../engine/Scene";
import Player from "../player/Player";
import Entity from "../entities/Entity";
import { TILESIZE } from "../constants";

export default class End extends Entity {
	constructor(scene: Scene, texture: Texture) {
		super(TILESIZE * 2, TILESIZE * 4, texture, scene);

		this.getSprite().scale.set(0.05);
	}

	public ifInside(player: Player) {
		if (
			player.position.x > this.getSprite().x - this.getSprite().width / 2 &&
			player.position.x < this.getSprite().x + this.getSprite().width / 2 &&
			player.position.y > this.getSprite().y - this.getSprite().height / 2 &&
			player.position.y < this.getSprite().y + this.getSprite().height / 2
		) {
			return true;
		}

		return false;
	}
}
