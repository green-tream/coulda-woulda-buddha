import Level from "../Level";
import { HEIGHT, TILESIZE, WIDTH } from "../../constants";

export default function level3(viewport_width: number): Level {
	const levelWidth = Math.floor(viewport_width / TILESIZE);
	const levelHeight = HEIGHT / TILESIZE;
	const level: Level = new Level(levelWidth, levelHeight, TILESIZE);
	//Ground
	level.applyRect(0, 0, levelWidth, 1);
	level.applyRect(15, 1, 2, 11);
	level.applyRect(13, 11, 6, 2);
	level.applyRect(38, 1, 2, 11);
	level.applyRect(36, 12, 4, 2);
	level.applyRect(61, 1, 2, 11);
	level.applyRect(59, 11, 4, 2);

	return level;
}
