import { Actions } from "pixi-actions";
import { HEIGHT, TILESIZE, WIDTH } from "../constants";
import LevelScene from "./LevelScene";
import ForegroundObject from "../entities/ForegroundObject";
import level3 from "../map/levels/level3";
import Level from "../map/Level";
import Entity from "../entities/Entity";
import { fadeOutToScene } from "../utils";

export default class IntelLabScene extends LevelScene {
	LEVEL = "lab";
	RESPAWN = { x: TILESIZE * 5, y: TILESIZE * 14 };
	END = { x: TILESIZE * 108, y: TILESIZE * 2 };

	async init(assets) {
		const make_level = () => {
			return level3(this.viewport.worldWidth);
		};

		this.initScene(assets, make_level);
		this.setupInputs();
	}

	async start() {}

	setupInputs() {
		document.addEventListener("keydown", (event) => this.player.handleKeydown(event));
		document.addEventListener("keyup", (event) => this.player.handleKeyup(event));
	}

	public update(delta: number): void {
		if (this.switchingScenes) return;
		this.player.update(delta);

		if (this.end.ifInside(this.player)) {
			this.switchingScenes = true;
			fadeOutToScene(this, "end", this.viewport);
		}
	}
}
