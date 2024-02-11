import { Actions } from "pixi-actions";
import { HEIGHT, TILESIZE, WIDTH } from "../constants";
import LevelScene from "./LevelScene";
import ForegroundObject from "../entities/ForegroundObject";
import level1 from "../map/levels/level1";
import Level from "../map/Level";
import Entity from "../entities/Entity";

export default class QueensScene extends LevelScene {
	LEVEL = "queens";
	RESPAWN = { x: TILESIZE * 5, y: TILESIZE * 14 };
	private buddha: ForegroundObject;

	async init(assets) {
		const make_level = () => {
			return level1(this.viewport.worldWidth);
		};

		this.initScene(assets, make_level);
		this.player.setVisible(false);

		// buddha
		this.buddha = new ForegroundObject(
			this.assets.queens_buddha_closed.baseTexture.width * 0.055,
			this.assets.queens_buddha_closed.baseTexture.height * 0.055,
			this.assets.queens_buddha_closed,
			this
		);

		this.buddha.position(this.RESPAWN.x, this.RESPAWN.y);
		this.addEntity(this.buddha);

		Actions.sequence(
			Actions.delay(2),
			Actions.runFunc(() => this.buddha.setSpriteTexture(this.assets.queens_buddha_middle, 0.055)),
			Actions.delay(0.1),
			Actions.runFunc(() => this.buddha.setSpriteTexture(this.assets.queens_buddha_open, 0.055)),
			Actions.delay(1),
			Actions.runFunc(() => this.buddha.setSpriteTexture(this.assets.queens_buddha_middle, 0.055)),
			Actions.delay(0.1),
			Actions.runFunc(() => this.buddha.setSpriteTexture(this.assets.queens_buddha_closed, 0.055)),
			Actions.delay(1),
			Actions.runFunc(() => this.buddha.setSpriteTexture(this.assets.queens_buddha_middle, 0.055)),
			Actions.delay(0.1),
			Actions.runFunc(() => this.buddha.setSpriteTexture(this.assets.queens_buddha_open, 0.055)),
			Actions.delay(1),
			Actions.fadeOut(this.buddha.getSprite(), 1),
			Actions.runFunc(() => this.player.setVisible(true)),
			Actions.runFunc(() => this.setupInputs())
		).play();
	}

	async start() {
		// Actions.moveTo(this.player.mIdleSprite, 3200, 400, 10);
	}

	setupInputs() {
		document.addEventListener("keydown", (event) => this.player.handleKeydown(event));
		document.addEventListener("keyup", (event) => this.player.handleKeyup(event));
	}

	public update(delta: number): void {
		this.player.update(delta);
	}
}
