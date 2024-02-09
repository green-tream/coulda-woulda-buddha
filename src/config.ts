import SplashScene from "./scenes/SplashScene";
import type { Scene } from "./engine/Scene";
import { BACKGROUND_COLOUR } from "./constants";

const view = document.querySelector("#game") as HTMLCanvasElement;

export interface IConfig {
	scenes: { [key: string]: typeof Scene };
	application: {
		view: HTMLCanvasElement;
		resizeTo: Window;
		resolution: number;
		autoDensity: boolean;
		backgroundColor: number;
	};
}

export const Config: IConfig = {
	scenes: { game: SplashScene, test: SplashScene },
	application: {
		view,
		resizeTo: window,
		resolution: window.devicePixelRatio || 1,
		autoDensity: true,
		backgroundColor: BACKGROUND_COLOUR,
	},
};
