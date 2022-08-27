import FallingMonster from "./FallingMonster";
import SlidingMonster from "./SlidingMonster";
import BaseMonster from "./base";

const MONSTERS = [FallingMonster, SlidingMonster];

export default function* generateMonster({
  speed,
}: {
  speed: number;
}): Iterator<BaseMonster, void, void> {
  for (const MonsterType of MONSTERS) {
    yield new MonsterType({ speed });
  }
}
