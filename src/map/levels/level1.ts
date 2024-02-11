import Level from "../Level";
import { HEIGHT, TILESIZE, WIDTH } from "../../constants";

export default function level1(viewport_width: number): Level {
    const levelWidth = Math.floor(viewport_width / TILESIZE);
    const levelHeight = HEIGHT / TILESIZE;
    const level: Level = new Level(levelWidth, levelHeight, TILESIZE);
    //Ground
    level.applyRect(0, 0, levelWidth, 2);
    //Bed
    level.applyRect(0, 2, 8, 2);
    //platform
    level.applyRect(36, 2, 2, 13);
    //smaller platform
    level.applyRect(30, 13, 8, 2);


    return level;

}
