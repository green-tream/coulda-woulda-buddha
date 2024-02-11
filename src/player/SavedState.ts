import { Point } from "pixi.js";

export default interface SavedState {
	position: Point;
	state: string;
	istate: {
		type: string;
		data: any;
	};
}
