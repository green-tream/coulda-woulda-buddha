import { Graphics } from "pixi.js";
import { HEIGHT, WIDTH } from "./constants";
import type { Scene } from "./engine/Scene";
import { app } from ".";
import { Actions } from "pixi-actions";
import InteractableObject from "./entities/InteractableObject";
import Player from "./player/Player";
import { Viewport } from "pixi-viewport";

export function fadeOut(currentScene: Scene, viewport: Viewport, time: number = 1) {
	const box = new Graphics();
	box.beginFill(0x000000);
	box.alpha = 0;
	box.drawRect(viewport.corner.x, viewport.corner.y, WIDTH, HEIGHT);
	currentScene.addDisplayObject(box);

	return Actions.fadeIn(box, time);
}

export function fadeIn(currentScene: Scene, viewport: Viewport, time: number = 1) {
	const box = new Graphics();
	box.beginFill(0x000000);
	box.alpha = 1;
	box.drawRect(viewport.corner.x, viewport.corner.y, WIDTH, HEIGHT);
	currentScene.addDisplayObject(box);

	return Actions.fadeOut(box, time);
}

export function fadeInOut(currentScene: Scene, viewport: Viewport, time: number = 1) {
	return Actions.sequence(
		fadeIn(currentScene, viewport, time),
		fadeOut(currentScene, viewport, time)
	);
}

export function fadeOutToScene(
	currentScene: Scene,
	nextSceneKey: string,
	viewport: Viewport,
	time: number = 1
) {
	Actions.sequence(
		fadeOut(currentScene, viewport, time),
		Actions.runFunc(() => app.scenes.start(nextSceneKey))
	).play();
}

export function closerObject(player: Player, a: InteractableObject, b: InteractableObject) {
	const { x, y } = player.position;

	const distanceA = Math.pow(a.getSprite().x - x, 2) + Math.pow(a.getSprite().y - y, 2);
	const distanceB = Math.pow(b.getSprite().x - x, 2) + Math.pow(b.getSprite().y - y, 2);

	return distanceA - distanceB;
}

export function sleep(time: number) {
	return new Promise((resolve) => setTimeout(resolve, time));
}
