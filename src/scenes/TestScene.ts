import { Graphics, Assets} from "pixi.js";
import { Scene } from "../engine/Scene";
import Player from "../Entities/Player";
import EnviromentObject from "../Entities/EnviromentObject";

export default class SplashScene extends Scene {
	private player: Player;
    private background: EnviromentObject;


	async init() {
        const assets = await Assets.loadBundle("test");
        console.log(assets)

        this.background = new EnviromentObject(800, 800, 'background_dummy.png');

		this.player = new Player(100, 150, 'sprites/buddha/zen.png');
        this.player.position(400, 350);
	}

	public start(): void {

		this.container.addChild(this.background.getSprite());

		this.container.addChild(this.player.getSprite());
        document.addEventListener('keydown', event => this.player.handleInput(event))

	}

	public update(delta: number): void {}
}
