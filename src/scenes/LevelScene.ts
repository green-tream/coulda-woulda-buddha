import Player from "../entities/Player";
import { Scene } from "../engine/Scene";
import InteractableObject from "../entities/InteractableObject";
import { closerObject, fadeInScene } from "../utils";
import BackgroundObject from "../entities/BackgroundObject";
import { Graphics, Rectangle, TextStyle, Texture } from "pixi.js";
import { HEIGHT, WIDTH } from "../constants";
import Level from "../map/Level";

import { Text } from "pixi.js";

export default abstract class LevelScene extends Scene {
	private objects: InteractableObject[];
	private checkpoints: Checkpoint[];
	public player: Player;
	abstract BACKGROUND: string;

	playerInteract() {
		const closestObject = this.objects
			// .filter((o) => o.isInteractable())
			// .filter((o) => o.isWithinThreshold());
			.toSorted((a, b) => closerObject(this.player, a, b))[0];

		closestObject.interact(this.player);
	}

	initScene(assets: any, make_level: () => Level) {
		this.assets = assets;

		this.background = new BackgroundObject(
			assets[this.BACKGROUND].baseTexture.width *
				(HEIGHT / assets[this.BACKGROUND].baseTexture.height),
			HEIGHT,
			assets[this.BACKGROUND] as Texture,
			this
		);

		this.initViewport();
		console.log(this.viewport.worldWidth);

		const level: Level = make_level();

		this.player = new Player(0.4, assets, level);
		this.player.position = { x: WIDTH * 0.1, y: HEIGHT * 0.4 };

		this.addEntity(this.background);
		this.player.addToScene(this);

		const g: Graphics = new Graphics();
		g.beginFill(0x000000, 0.2);
		for (let j = 0; j < this.player.level.height; j++) {
			for (let i = 0; i < this.player.level.width; i++) {
				if (this.player.level.map[j][i] != null) {
					g.drawRect(
						this.player.level.squareSize * i,
						this.player.level.squareSize * j,
						this.player.level.squareSize,
						this.player.level.squareSize
					);
				} else {
					const text = new TextStyle({
						fill: "black",
						fontSize: 8,
					});

					const t = new Text(`${i},${j}`, text);
					t.position.x = i * this.player.level.squareSize;
					t.position.y = j * this.player.level.squareSize;

					this.addDisplayObject(t);
				}
			}
		}
		this.addDisplayObject(g);

		this.viewport.follow(this.player.mIdleSprite, {
			speed: 1,
			acceleration: 3,
		});

		fadeInScene(this);
	}
}
