import { Actions } from "pixi-actions";
import { HEIGHT, TILESIZE, WIDTH } from "../constants";
import LevelScene from "./LevelScene";
import ForegroundObject from "../entities/ForegroundObject";
import level1 from "../map/levels/level1";
import Level from "../map/Level";

export default class QueensScene extends LevelScene {
	BACKGROUND = "background_queens";
	RESPAWN = { x: TILESIZE * 4, y: TILESIZE * 14 };
	private buddha: ForegroundObject;

	async init(assets) {
		const make_level = () => {
			return level1(this.viewport.worldWidth);
		};

		this.initScene(assets, make_level);
		this.player.setVisible(false);

		// buddha
		this.buddha = new ForegroundObject(
			this.assets.buddha_closed.baseTexture.width / 7,
			this.assets.buddha_closed.baseTexture.height / 7,
			this.assets.buddha_closed,
			this
		);

		this.buddha.position(WIDTH * 0.2, HEIGHT * 0.2);
	}

	async start() {
		document.addEventListener("keydown", (event) => this.player.handleKeydown(event));
		document.addEventListener("keyup", (event) => this.player.handleKeyup(event));

		// Actions.moveTo(this.player.mIdleSprite, 3200, 400, 10);
	}

	public update(delta: number): void {
		this.player.update(delta);
	}
}
