import FallingMonster from "./FallingMonster";
import SlidingMonster from "./SlidingMonster";
import BaseMonster from "./base";

const MONSTERS = [FallingMonster, SlidingMonster];

export default function* generateMonster(): Generator<
  BaseMonster,
  BaseMonster,
  void
> {
  let index = 0;
  while (true) {
    const MonsterType = MONSTERS[index % MONSTERS.length];
    yield new MonsterType();
    index++;
  }
}
