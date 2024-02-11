import { Actions } from "pixi-actions";
import { HEIGHT, TILESIZE, WIDTH } from "../constants";
import LevelScene from "./LevelScene";
import ForegroundObject from "../entities/ForegroundObject";
import level1 from "../map/levels/level1";
import Level from "../map/Level";
import Entity from "../entities/Entity";
import { fadeOutToScene, mathematicalBridge } from "../utils";
import Box from "../mechanics/Box";

export default class QueensScene extends LevelScene {
	LEVEL = "queens";
	RESPAWN = { x: TILESIZE * 5, y: TILESIZE * 14 };
	END = { x: TILESIZE * 108.5, y: TILESIZE * 1 };
	private buddha: ForegroundObject;
	private bridge: ForegroundObject;

	async init(assets) {
		const make_level = () => {
			return level1(this.viewport.worldWidth);
		};

		this.initScene(assets, make_level);
		this.player.mIdleSprite.alpha = 0;

		// buddha
		this.buddha = new ForegroundObject(
			this.assets.queens_buddha_closed.baseTexture.width * 0.0475,
			this.assets.queens_buddha_closed.baseTexture.height * 0.0475,
			this.assets.queens_buddha_closed,
			this
		);

		this.buddha.position(this.RESPAWN.x, this.RESPAWN.y + TILESIZE);
		this.addEntity(this.buddha);

		this.bridge = new ForegroundObject(
			assets.queens_bridge.baseTexture.width * (HEIGHT / assets.queens_bridge.baseTexture.height),
			HEIGHT,
			this.assets.queens_bridge,
			this
		);

		this.bridge.getSprite().anchor.set(0, 1);
		this.bridge.position(1090, HEIGHT);
		this.addEntity(this.bridge);

		const ledge = new ForegroundObject(
			assets.queens_ledge.baseTexture.width * (HEIGHT / assets.queens_ledge.baseTexture.height),
			HEIGHT,
			this.assets.queens_ledge,
			this
		);

		ledge.getSprite().anchor.set(0, 0);
		ledge.position(0, 0);
		this.addEntity(ledge);

		this.player.canMove = false;

		Actions.sequence(
			Actions.delay(2),
			Actions.runFunc(() => this.buddha.setSpriteTexture(this.assets.queens_buddha_middle, 0.0475)),
			Actions.delay(0.1),
			Actions.runFunc(() => this.buddha.setSpriteTexture(this.assets.queens_buddha_open, 0.0475)),
			Actions.delay(1),
			Actions.runFunc(() => this.buddha.setSpriteTexture(this.assets.queens_buddha_middle, 0.0475)),
			Actions.delay(0.1),
			Actions.runFunc(() => this.buddha.setSpriteTexture(this.assets.queens_buddha_closed, 0.0475)),
			Actions.delay(1),
			Actions.runFunc(() => this.buddha.setSpriteTexture(this.assets.queens_buddha_middle, 0.0475)),
			Actions.delay(0.1),
			Actions.runFunc(() => this.buddha.setSpriteTexture(this.assets.queens_buddha_open, 0.0475)),
			Actions.delay(1),
			this.player.popUpText([
				"oh no!",
				"i'm late for the\ngame jam results!",
				"better get to the\nintel lab quick!",
			]),
			Actions.parallel(
				Actions.fadeOut(this.buddha.getSprite(), 1),
				Actions.fadeIn(this.player.mIdleSprite, 1)
			),
			Actions.runFunc(() => this.setupInputs()),
			Actions.runFunc(() => (this.player.canMove = true)),
			Actions.delay(2),
			Actions.runFunc(() => this.player.popUpText(["'q' to interact\n\n"]).play())
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

		this.player.yOffset = mathematicalBridge(this.player.position.x);

		if (this.switchingScenes) return;

		if (this.end.ifInside(this.player)) {
			this.switchingScenes = true;
			fadeOutToScene(this, "kings", this.viewport).play();
		}
	}
}
