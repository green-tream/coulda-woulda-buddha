import Player from "../player/Player";
import { Scene } from "../engine/Scene";
import InteractableObject from "../entities/InteractableObject";
import { closerObject, fadeIn } from "../utils";
import BackgroundObject from "../entities/BackgroundObject";
import { Graphics, Point, Rectangle, TextStyle, Texture } from "pixi.js";
import { HEIGHT, TILESIZE, WIDTH } from "../constants";
import Level from "../map/Level";

import { Text } from "pixi.js";
import End from "../mechanics/End";
import BoxBlock from "../map/BoxBlock";
import Box from "../mechanics/Box";

export default abstract class LevelScene extends Scene {
	public objects: InteractableObject[];
	public switchingScenes: boolean = false;
	public player: Player;
	public end: End;
	abstract LEVEL: string;
	abstract RESPAWN: { x: number; y: number };
	abstract END: { x: number; y: number };

	playerInteract(): InteractableObject | null {
		const closestObject = this.objects
			.filter((o) => o.isInteractable())
			.filter((o) => o.isWithinThreshold(this.player))
			.toSorted((a, b) => closerObject(this.player, a, b))[0];

		if (closestObject) {
			closestObject.interact(this.player, this.assets);
			return closestObject;
		} else {
			return null;
		}
	}

	initScene(assets: any, make_level: () => Level) {
		this.assets = assets;
		this.objects = [];

		const assetName = this.LEVEL + "_background";
		this.background = new BackgroundObject(
			assets[assetName].baseTexture.width * (HEIGHT / assets[assetName].baseTexture.height),
			HEIGHT,
			assets[assetName] as Texture,
			this
		);
		this.addEntity(this.background);

		this.initViewport();
		const level: Level = make_level();

		this.end = new End(this, assets[this.LEVEL + "_end"]);
		this.end.position(this.END.x, this.END.y);
		this.addEntity(this.end);

		this.player = new Player(0.05, assets, level, this.RESPAWN, this, this.LEVEL);
		this.player.addToScene(this);

		// NOW RENDERS BOX
		// const g: Graphics = new Graphics();
		// g.beginFill(0x000000, 0.5);
		for (let j = 0; j < this.player.level.height; j++) {
			for (let i = 0; i < this.player.level.width; i++) {
				if (this.player.level.map[j][i] instanceof BoxBlock) {
					this.addDisplayObject((this.player.level.map[j][i] as BoxBlock).getSprite());
				}
				// if (this.player.level.map[j][i] != null) {
				// 	g.drawRect(
				// 		this.player.level.squareSize * i,
				// 		this.player.level.squareSize * j,
				// 		this.player.level.squareSize,
				// 		this.player.level.squareSize
				// 	);
				// } else {
				// 	const text = new TextStyle({
				// 		fill: "black",
				// 		fontSize: 8,
				// 	});

				// 	const t = new Text(`${i},${j}`, text);
				// 	t.position.x = i * this.player.level.squareSize;
				// 	t.position.y = j * this.player.level.squareSize;

				// 	this.addDisplayObject(t);
				// }
			}
		}
		// this.addDisplayObject(g);

		this.viewport.follow(this.player.mIdleSprite, {
			speed: 5,
			acceleration: 1,
			radius: 75,
		});

		fadeIn(this, this.viewport).play();
	}
}
