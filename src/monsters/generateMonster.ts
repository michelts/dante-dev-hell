import FallingMonster from "./fallingMonster";
import SlidingMonster from "./slidingMonster";
import MagneticMonster from "./magneticMonster";
import TeleportingMonster from "./teleportingMonster";
import BaseMonster from "./base";

const MONSTERS = [FallingMonster, SlidingMonster];
//const MONSTERS = [FallingMonster, SlidingMonster, MagneticMonster, TeleportingMonster];

export default function* generateMonster({
  speed,
  frequency,
}: {
  speed: number;
  frequency: number;
}): Iterator<BaseMonster, void, void> {
  for (const MonsterType of MONSTERS) {
    yield new MonsterType({ speed, frequency });
  }
}
