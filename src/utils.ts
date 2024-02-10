import { Graphics } from "pixi.js";
import { HEIGHT, WIDTH } from "./constants";
import type { Scene } from "./engine/Scene";
import { app } from ".";
import { Actions } from "pixi-actions";
import InteractableObject from "./entities/InteractableObject";
import Player from "./entities/Player";

export function fadeToScene(
	currentScene: Scene,
	nextSceneKey: string,
	time: number = 1
) {
	const box = new Graphics();
	box.beginFill(0x000000);
	box.alpha = 0;
	box.drawRect(0, 0, WIDTH, HEIGHT);
	currentScene.addDisplayObject(box);

	Actions.fadeIn(box, time).play();

	setTimeout(() => app.scenes.start(nextSceneKey), time * 1000);
}

export function fadeInScene(currentScene: Scene, time: number = 1) {
	const box = new Graphics();
	box.beginFill(0x000000);
	box.alpha = 1;
	box.drawRect(0, 0, WIDTH, HEIGHT);
	currentScene.addDisplayObject(box);

	Actions.fadeOut(box, time).play();
}

export function closerObject(
	player: Player,
	a: InteractableObject,
	b: InteractableObject
) {
	const { x, y } = player.getPosition();

	const distanceA =
		Math.pow(a.getSprite().x - x, 2) + Math.pow(a.getSprite().y - y, 2);

	const distanceB =
		Math.pow(b.getSprite().x - x, 2) + Math.pow(b.getSprite().y - y, 2);

	return distanceA - distanceB;
}
