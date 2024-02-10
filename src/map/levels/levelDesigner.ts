import { Sprite } from "pixi.js";
import Level from "../map";


function applyRect(
    x: number,
    y: number,
    width: number,
    height: number,
    asset: Sprite,
    label,
    map: Level
): Level {

    for (let i=x; i<x+width; i++) {
        for (let j=y; j<y+height; j++) {
            map.add(i, j, label, asset);
        }
    }
    return map;

}