import Level from "../Level";
import { HEIGHT, TILESIZE, WIDTH } from "../../constants";


export default function level1(): Level {
    const levelWidth = WIDTH / TILESIZE;
    const levelHeight = HEIGHT / TILESIZE;
    const level: Level = new Level(levelWidth, levelHeight, TILESIZE);
    //Ground
    level.applyRect(0, 0, levelWidth - 1, 2);
    //Bed
    level.applyRect(0, 2, 10, 2);
    //platform
    level.applyRect(30, 2, 10, 14);
    //smaller platform
    level.applyRect(15, 13, 15, 3);


    return level;

}