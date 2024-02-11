import { Point } from "pixi.js";

export default interface SavedState {
	position: Point;
	state: {
		type: string;
		data: any | null;
	};
}
