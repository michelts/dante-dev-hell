import FallingMonster from "./FallingMonster";
import SlidingMonster from "./SlidingMonster";
import BaseMonster from "./base";

const MONSTERS = [FallingMonster, SlidingMonster];

export default function* generateMonster({
  speed,
  monsterTypes = MONSTERS,
}: {
  speed: number;
  monsterTypes?: BaseMonster[];
}): Iterator<BaseMonster, void, void> {
  for (const MonsterType of monsterTypes) {
    yield new MonsterType({ speed });
  }
}
