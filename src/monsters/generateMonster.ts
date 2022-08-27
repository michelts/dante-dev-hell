import FallingMonster from "./FallingMonster";
import SlidingMonster from "./SlidingMonster";
import BaseMonster from "./base";

const MONSTERS = [FallingMonster, SlidingMonster];

export default function* generateMonster(
  monsters = MONSTERS
): Generator<BaseMonster, BaseMonster, void> {
  let index = 0;
  while (true) {
    const MonsterType = monsters[index % monsters.length];
    yield new MonsterType();
    index++;
  }
}
