import { Point, Sprite } from "pixi.js";
import InteractableObject from "../entities/InteractableObject";
import Player from "../player/Player";
import LevelScene from "../scenes/LevelScene";
import Level from "../map/Level";

export default class Box {
	private position: Point;
	private interactable: boolean = true;

	private assets: any;

	private level: Level;
	private sceneName: string;

	private box1: Sprite;
	private box2: Sprite;
	private box3: Sprite;
	private box4: Sprite;
	
	constructor(assets, sceneName: string, level: Level, position: Point) {
		this.position = position;
		this.level = level;
		this.sceneName = sceneName;
		this.assets = assets;

		this.box1 = new Sprite(this.assets[`${this.sceneName}_box_1`]);
		this.box2 = new Sprite(this.assets[`${this.sceneName}_box_2`]);
		this.box3 = new Sprite(this.assets[`${this.sceneName}_box_3`]);
		this.box4 = new Sprite(this.assets[`${this.sceneName}_box_4`]);

		this.spawn(this.position);
	}

	spawn(point: Point): void {

		this.drawBox(point);

	}

	drawBox(point: Point) {

		this.level.addBox(point.x, point.y, this.box1);
		this.level.addBox(point.x + 1, point.y, this.box2);
		this.level.addBox(point.x, point.y + 1, this.box3);
		this.level.addBox(point.x + 1, point.y + 1, this.box4);
	}

	destroy(point: Point) {

		this.box1.visible = false;
		this.box2.visible = false;
		this.box3.visible = false;
		this.box4.visible = false;

		this.level.delete(point.x, point.y);
		this.level.delete(point.x + 1, point.y);
		this.level.delete(point.x, point.y + 1);
		this.level.delete(point.x + 1, point.y + 1);
	}

	interact(player: Player) {
		if (!this.interactable) {
			return;
		}
		const worldPos = this.level.localToWorld(this.position);
		const dx = Math.pow(worldPos.x - player.position.x, 2);
		const dy = Math.pow(worldPos.y - player.position.y, 2);
		if (Math.pow(dx + dy, 0.5) > 1000) 	{
			return;
		}
		if (player.pickupBox() == true) {
			this.interactable = false;
			this.destroy(this.position);
		}
	}



}
