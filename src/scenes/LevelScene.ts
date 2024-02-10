import Player from "../entities/Player";
import { Scene } from "../engine/Scene";
import InteractableObject from "../entities/InteractableObject";
import { closerObject, fadeInScene } from "../utils";
import BackgroundObject from "../entities/BackgroundObject";
import { Texture } from "pixi.js";
import { HEIGHT, WIDTH } from "../constants";

export default abstract class LevelScene extends Scene {
	private objects: InteractableObject[];
	private checkpoints: Checkpoint[];
	private background: BackgroundObject;
	public player: Player;
	abstract BACKGROUND: string;

	playerInteract() {
		const closestObject = this.objects
			// .filter((o) => o.isInteractable())
			// .filter((o) => o.isWithinThreshold());
			.toSorted((a, b) => closerObject(this.player, a, b))[0];

		closestObject.interact(this.player);
	}

	initScene(assets) {
		this.assets = assets;

		this.background = new BackgroundObject(
			WIDTH,
			HEIGHT,
			assets[this.BACKGROUND] as Texture,
			this
		);

		this.player = new Player(100, 150, assets, this);
		this.player.position = { x: 400, y: 400 };

		this.addEntity(this.background);
		this.player.addToScene(this);

		this.viewport.follow(this.player.mIdleSprite, {
			speed: 1,
			acceleration: 0.1,
		});

		fadeInScene(this);
	}
}
