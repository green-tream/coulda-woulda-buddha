import { Actions } from "pixi-actions";
import { HEIGHT, WIDTH } from "../constants";
import LevelScene from "./LevelScene";
import ForegroundObject from "../entities/ForegroundObject";
import UIObject from "../entities/UIObject";

export default class QueensScene extends LevelScene {
	BACKGROUND = "background_queens";
	private buddha: ForegroundObject;

	async init(assets) {
		this.initScene(assets);

		console.log(assets);

		// buddha
		this.buddha = new UIObject(
			this.assets.buddha_closed.baseTexture.width / 7,
			this.assets.buddha_closed.baseTexture.height / 7,
			this.assets.buddha_closed,
			this
		);

		this.buddha.position(400, 400);

		this.addEntity(this.buddha);
	}

	async start() {
		this.startLevel();

		// Actions.sequence(
		// 	Actions.delay(2),
		// 	Actions.runFunc(() =>
		// 		this.buddha.setSpriteTexture(this.assets.buddha_middle)
		// 	),
		// 	Actions.delay(0.1),
		// 	Actions.runFunc(() =>
		// 		this.buddha.setSpriteTexture(this.assets.buddha_open)
		// 	),
		// 	Actions.delay(0.75),
		// 	Actions.runFunc(() =>
		// 		this.buddha.setSpriteTexture(this.assets.buddha_middle)
		// 	),
		// 	Actions.delay(0.1),
		// 	Actions.runFunc(() =>
		// 		this.buddha.setSpriteTexture(this.assets.buddha_closed)
		// 	),
		// 	Actions.delay(1),
		// 	Actions.runFunc(() =>
		// 		this.buddha.setSpriteTexture(this.assets.buddha_middle)
		// 	),
		// 	Actions.delay(0.1),
		// 	Actions.runFunc(() =>
		// 		this.buddha.setSpriteTexture(this.assets.buddha_open)
		// 	),
		// 	Actions.delay(2),
		// 	Actions.runFunc(() => this.startLevel())
		// ).play();
	}

	startLevel() {
		document.addEventListener("keydown", (event) =>
			this.player.handleKeydown(event)
		);

		document.addEventListener("keyup", (event) =>
			this.player.handleKeyup(event)
		);
	}

	public update(delta: number): void {
		this.player.update(delta);
	}
}
