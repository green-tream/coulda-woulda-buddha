import InteractableObject from "../entities/InteractableObject";
import Player from "../player/Player";

class Box extends InteractableObject {
	constructor(scene) {
		super(100, 100, scene.assets.box, scene);
	}

	interact(player: Player) {
		console.log("omg interact with me harder daddy");
	}
}
