import type { Scene } from "./engine/Scene";
import { BACKGROUND_COLOUR } from "./constants";

import MainMenuScene from "./scenes/MainMenuScene";
import QueensScene from "./scenes/QueensScene";
import KingsParadeScene from "./scenes/KingsParadeScene";
import IntelLabScene from "./scenes/IntelLabScene";

const view = document.querySelector("#canvas") as HTMLCanvasElement;

export interface IConfig {
	scenes: { [key: string]: typeof Scene };
	application: {
		view: HTMLCanvasElement;
		resizeTo: HTMLElement;
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
		resizeTo: document.querySelector("#view") as HTMLDivElement,
		autoDensity: true,
		backgroundColor: BACKGROUND_COLOUR,
	},
};
