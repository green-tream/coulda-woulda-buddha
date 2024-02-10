import type { Scene } from "./engine/Scene";
import { BACKGROUND_COLOUR } from "./constants";

import MainMenuScene from "./scenes/MainMenuScene";
import QueensScene from "./scenes/QueensScene";
import KingsParadeScene from "./scenes/KingsParadeScene";
import IntelLabScene from "./scenes/IntelLabScene";

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
	scenes: {
		mainMenu: MainMenuScene,
		queens: QueensScene,
		kings: KingsParadeScene,
		lab: IntelLabScene,
	},
	application: {
		view,
		resizeTo: window,
		resolution: window.devicePixelRatio || 1,
		autoDensity: true,
		backgroundColor: BACKGROUND_COLOUR,
	},
};
