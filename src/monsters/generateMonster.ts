import FallingMonster from "./FallingMonster";
import SlidingMonster from "./SlidingMonster";
import BaseMonster from "./base";

const MONSTERS = [FallingMonster, SlidingMonster];

export default function* generateMonster(): Generator<BaseMonster, void, void> {
  let index = 0;
  while (1) {
    const MonsterType = MONSTERS[index % MONSTERS.length];
    yield new MonsterType();
    index++;
  }
}
