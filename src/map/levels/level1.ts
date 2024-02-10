import { Sprite } from "pixi.js";
import Level from "../map";
import { HEIGHT, TILESIZE, WIDTH } from "../../constants";


export default function level1(
    air: Sprite,
    ground: Sprite
) {
    const levelWidth = WIDTH / TILESIZE;
    const levelHeight = HEIGHT / TILESIZE;
    const level: Level = new Level(levelWidth, levelHeight, TILESIZE);
    //Ground
    level.applyRect(0, 0, levelWidth, 2, air, 'air');
    //Bed
    level.applyRect(0, 2, 10, 2, air, 'air');
    //platform
    level.applyRect(30, 2, 10, 14, air, 'air');
    //smaller platform
    level.applyRect(15, 13, 15, 3, air, 'air');

}