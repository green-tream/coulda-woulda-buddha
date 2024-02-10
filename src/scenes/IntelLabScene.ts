import { Scene } from "../engine/Scene";

export default class IntelLabScene extends Scene {
	async init(assets) {
		this.assets = assets;
	}

	async start() {}

	async update(delta: number) {}
}
