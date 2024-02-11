import { BaseTexture, Texture } from "pixi.js";
import { Scene } from "../engine/Scene";
import Player from "../player/Player";
import Entity from "../entities/Entity";
import { TILESIZE } from "../constants";
import InteractableObject from "../entities/InteractableObject";
import LevelScene from "../scenes/LevelScene";

export default class Electrocuter extends InteractableObject {
	constructor(scene: LevelScene, texture: Texture) {
		super(texture.baseTexture.width, texture.baseTexture.height, texture, scene);

		this.getSprite().scale.set(0.325);
		this.getSprite().anchor.set(0.5);
	}

	interact(player: Player, assets) {
		const electricity = new Entity(
			TILESIZE * 6,
			TILESIZE * 1,
			assets["lab_electricity"],
			this.scene
		);

		electricity.position(this.getSprite().x + TILESIZE * 2, this.getSprite().y - TILESIZE * 3.1);
		this.scene.container.addChildAt(electricity.getSprite(), 5);

		setTimeout(() => {
			if (
				player.position.x > this.getSprite().x + TILESIZE * 2.5 &&
				player.position.x < this.getSprite().x + TILESIZE * 5.5
			) {
				// player.addMotion(0, -30);
				player.gravity = -1;
				setTimeout(() => {
					player.gravity = 1;
				}, 1000);
				player.mIdleSprite.texture = assets.lab_buddha_shocked;
			}
		}, 50);

		setTimeout(() => {
			this.scene.container.removeChild(electricity.getSprite());
			player.mIdleSprite.texture = assets.lab_idle_sprite;
		}, 1000);
	}
}
