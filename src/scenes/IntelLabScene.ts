import { Actions } from "pixi-actions";
import { HEIGHT, TILESIZE, WIDTH } from "../constants";
import LevelScene from "./LevelScene";
import ForegroundObject from "../entities/ForegroundObject";
import level3 from "../map/levels/level3";
import Level from "../map/Level";
import Entity from "../entities/Entity";
import { fadeOutToScene } from "../utils";
import Electrocuter from "../mechanics/Electrocuter";

export default class IntelLabScene extends LevelScene {
	LEVEL = "lab";
	RESPAWN = { x: TILESIZE * 2, y: TILESIZE * 18 };
	END = { x: TILESIZE * 59.5, y: TILESIZE * 3 };
	private elc1: Electrocuter;
	private elc2: Electrocuter;

	async init(assets) {
		const make_level = () => {
			return level3(this.viewport.worldWidth);
		};

		this.initScene(assets, make_level);

		this.elc1 = new Electrocuter(this, this.assets.lab_electrocuter);
		this.elc1.getSprite().anchor.set(0, 1);
		this.elc1.position(200, HEIGHT - TILESIZE);
		this.addEntity(this.elc1);

		this.elc2 = new Electrocuter(this, this.assets.lab_electrocuter);
		this.elc2.getSprite().anchor.set(0, 1);
		this.elc2.position(820, HEIGHT - TILESIZE);
		this.addEntity(this.elc2);

		this.objects = [this.elc1, this.elc2];

		this.setupInputs();
	}

	async start() {}

	setupInputs() {
		document.addEventListener("keydown", (event) => this.player.handleKeydown(event));
		document.addEventListener("keyup", (event) => this.player.handleKeyup(event));
	}

	public update(delta: number): void {
		this.player.update(delta);

		if (this.switchingScenes) return;

		if (this.end.ifInside(this.player)) {
			this.switchingScenes = true;
			fadeOutToScene(this, "end", this.viewport).play();
		}
	}
}
