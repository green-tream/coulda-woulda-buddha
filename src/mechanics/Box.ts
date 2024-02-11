import { Point, Sprite } from "pixi.js";
import InteractableObject from "../entities/InteractableObject";
import Player from "../player/Player";
import LevelScene from "../scenes/LevelScene";
import Level from "../map/Level";

export default class Box {
	private respawnPos: Point;
	private position: Point;
	private interactable: boolean = true;

	private assets: any;

	private level: Level;
	private sceneName: string;
	
	constructor(assets, sceneName: string, level: Level, respawnPos: Point) {
		this.respawnPos = respawnPos; // Bottom right
		this.position = respawnPos;
		this.level = level;
		this.sceneName = sceneName;
		this.assets = assets;
		this.spawn(this.respawnPos);
	}

	spawn(point: Point): void {

		this.destroy(this.position);
		this.drawBox(point);
		this.position = point;

	}

	drawBox(point: Point) {

		const box1 = new Sprite(this.assets[`${this.sceneName}_box_1`]);
		const box2 = new Sprite(this.assets[`${this.sceneName}_box_2`]);
		const box3 = new Sprite(this.assets[`${this.sceneName}_box_3`]);
		const box4 = new Sprite(this.assets[`${this.sceneName}_box_4`]);

		this.level.addBox(point.x, point.y, box1);
		this.level.addBox(point.x + 1, point.y, box2);
		this.level.addBox(point.x, point.y + 1, box3);
		this.level.addBox(point.x + 1, point.y + 1, box4);
	}

	destroy(point: Point) {
		this.level.delete(point.x, point.y)
		this.level.delete(point.x + 1, point.y)
		this.level.delete(point.x, point.y + 1)
		this.level.delete(point.x + 1, point.y + 1)
	}

	interact(player: Player) {
		if (!this.interactable) {
			return;
		}

		// player.pickUpBox();
		this.interactable = false;
	}



}
