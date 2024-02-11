import { Graphics } from "pixi.js";
import { HEIGHT, TILESIZE, WIDTH } from "./constants";
import type { Scene } from "./engine/Scene";
import { app } from ".";
import { Actions } from "pixi-actions";
import InteractableObject from "./entities/InteractableObject";
import Player from "./player/Player";

export function fadeOut(currentScene: Scene, time: number = 1) {
	const box = new Graphics();
	box.beginFill(0x000000);
	box.alpha = 0;
	box.drawRect(0, 0, WIDTH, HEIGHT);
	currentScene.addDisplayObject(box);

	return Actions.fadeIn(box, time);
}

export function fadeIn(currentScene: Scene, time: number = 1) {
	const box = new Graphics();
	box.beginFill(0x000000);
	box.alpha = 1;
	box.drawRect(0, 0, WIDTH, HEIGHT);
	currentScene.addDisplayObject(box);

	return Actions.fadeOut(box, time);
}

export function fadeInOut(currentScene: Scene, time: number = 1) {
	return Actions.sequence(fadeIn(currentScene, time), fadeOut(currentScene, time));
}

export function fadeOutToScene(currentScene: Scene, nextSceneKey: string, time: number = 1) {
	Actions.sequence(
		fadeOut(currentScene, time),
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


export function mathematicalBridge(x: number): number {
	if (x > 1315 && x < 2075) {
		const fixed = ((x - 1315) / (2075 - 1315)) * Math.PI - Math.PI / 2;
		const transformedY = Math.cos(fixed / 0.81);

		return -(2 * TILESIZE + transformedY * 100);
	} else {
		return 0;
	}
}