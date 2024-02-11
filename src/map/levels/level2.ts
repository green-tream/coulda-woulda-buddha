import Level from "../Level";
import { HEIGHT, TILESIZE, WIDTH } from "../../constants";

export default function level2(viewport_width: number): Level {
    const levelWidth = Math.floor(viewport_width / TILESIZE);
    const levelHeight = HEIGHT / TILESIZE;
    const level: Level = new Level(levelWidth, levelHeight, TILESIZE);
    //Ground
    level.applyRect(0, 0, levelWidth, 2);

    return level;

}
