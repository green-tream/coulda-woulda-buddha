import { Graphics } from "pixi.js";
import { HEIGHT, WIDTH } from "./constants";
import type { Scene } from "./engine/Scene";
import { app } from ".";
import { Actions } from "pixi-actions";

export function fadeToScene(
	currentScene: Scene,
	nextSceneKey: string,
	time: number = 1.5
) {
	console.log("test");

	const fadeInBox = new Graphics();
	fadeInBox.beginFill(0x000000);
	fadeInBox.alpha = 0;
	fadeInBox.drawRect(0, 0, WIDTH, HEIGHT);
	currentScene.addDisplayObject(fadeInBox);

	Actions.fadeIn(fadeInBox, time).play();

	setTimeout(() => app.scenes.start(nextSceneKey), time * 1000);
}
