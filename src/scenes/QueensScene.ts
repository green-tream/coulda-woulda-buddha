import { Actions } from "pixi-actions";
import { HEIGHT, WIDTH } from "../constants";
import LevelScene from "./LevelScene";
import ForegroundObject from "../entities/ForegroundObject";
import level1 from "../map/levels/level1";

export default class QueensScene extends LevelScene {
	BACKGROUND = "background_queens";
	private buddha: ForegroundObject;

	async init(assets) {
		this.initScene(assets, level1());

		// buddha
		this.buddha = new ForegroundObject(
			this.assets.buddha_closed.baseTexture.width / 7,
			this.assets.buddha_closed.baseTexture.height / 7,
			this.assets.buddha_closed,
			this
		);

		this.buddha.position(3200, 400);
	}

	async start() {
		document.addEventListener("keydown", (event) =>
			this.player.handleKeydown(event)
		);

		document.addEventListener("keyup", (event) =>
			this.player.handleKeyup(event)
		);

		// Actions.moveTo(this.player.mIdleSprite, 3200, 400, 10);
	}

	public update(delta: number): void {
		this.player.update(delta);
	}
}
