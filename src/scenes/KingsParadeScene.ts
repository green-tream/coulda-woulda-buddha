import { Actions } from "pixi-actions";
import { HEIGHT, TILESIZE, WIDTH } from "../constants";
import LevelScene from "./LevelScene";
import ForegroundObject from "../entities/ForegroundObject";
import level2 from "../map/levels/level2";
import { fadeOutToScene } from "../utils";

export default class KingsParadeScene extends LevelScene {
	LEVEL = "kings";
	END = { x: TILESIZE * 33, y: TILESIZE * 14 };
	RESPAWN = { x: TILESIZE * 2, y: TILESIZE * 17 };
	private buddha: ForegroundObject;

	async init(assets) {
		const make_level = () => {
			return level2(this.viewport.worldWidth);
		};

		this.initScene(assets, make_level);

		// buddha
		this.buddha = new ForegroundObject(
			this.assets[`${this.LEVEL}_buddha_closed`].baseTexture.width / 7,
			this.assets[`${this.LEVEL}_buddha_closed`].baseTexture.height / 7,
			this.assets[`${this.LEVEL}_buddha_closed`],
			this
		);

		this.buddha.position(WIDTH * 0.2, HEIGHT * 0.4);
	}

	async start() {
		document.addEventListener("keydown", (event) => this.player.handleKeydown(event));

		document.addEventListener("keyup", (event) => this.player.handleKeyup(event));

		// Actions.moveTo(this.player.mIdleSprite, 3200, 400, 10);
	}

	public update(delta: number): void {
		this.player.update(delta);

		if (this.switchingScenes) return;

		if (this.end.ifInside(this.player)) {
			this.switchingScenes = true;
			fadeOutToScene(this, "lab", this.viewport).play();
		}
	}
}
