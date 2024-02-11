import { Point, Sprite } from "pixi.js";
import InteractableObject from "../entities/InteractableObject";
import Player from "../player/Player";
import LevelScene from "../scenes/LevelScene";
import Level from "../map/Level";
import { HEIGHT } from "../constants";

export default class Box {
	public position: Point;
	public original: Point;
	public interactable: boolean = true;

	public memoryFrames: number = 9999999;

	private assets: any;

	private level: Level;
	private sceneName: string;

	public box_sprite: Sprite;

	private box1: Sprite;
	private box2: Sprite;
	private box3: Sprite;
	private box4: Sprite;
	
	constructor(assets, sceneName: string, level: Level, position: Point) {
		this.original = position;
		this.position = position;
		this.level = level;
		this.sceneName = sceneName;
		this.assets = assets;

		this.box_sprite = new Sprite(this.assets[`${this.sceneName}_box`])

		this.box1 = new Sprite(this.assets[`${this.sceneName}_box_1`]);
		this.box2 = new Sprite(this.assets[`${this.sceneName}_box_2`]);
		this.box3 = new Sprite(this.assets[`${this.sceneName}_box_3`]);
		this.box4 = new Sprite(this.assets[`${this.sceneName}_box_4`]);

		this.spawn(this.position);
	}

	spawn(point: Point): void {

		this.destroy(this.position)
		this.drawBox(point);
		this.position = point;

	}

	drawBox(point: Point) {

		if (!this.interactable) {
			this.box1.alpha = 0.2;
			this.box2.alpha = 0.2;
			this.box3.alpha = 0.2;
			this.box4.alpha = 0.2;
		}

		this.level.addBox(point.x, point.y, this.box1, this.interactable);
		this.level.addBox(point.x + 1, point.y, this.box2, this.interactable);
		this.level.addBox(point.x, point.y + 1, this.box3, this.interactable);
		this.level.addBox(point.x + 1, point.y + 1, this.box4, this.interactable);
	}

	destroy(point: Point) {

		// this.box1.alpha = 0;
		// this.box2.alpha = 0;
		// this.box3.alpha = 0;
		// this.box4.alpha = 0;

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
		const dy = Math.pow(HEIGHT - worldPos.y - player.position.y, 2);
		if (Math.pow(dx + dy, 0.5) > 140) 	{
			return;
		}
		if (player.pickupBox(this)) {
			this.interactable = false;
			this.destroy(this.position);
		}
	}



}
