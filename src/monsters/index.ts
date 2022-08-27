import FallingMonster from './FallingMonster';
import SlidingMonster from './SlidingMonster';

const MONSTERS = [FallingMonster, SlidingMonster];

type MonsterType = FallingMonster | SlidingMonster

export default function *generateMonster(): Generator<MonsterType, void, void> {
  let index = 0;
  while (1) {
    const MonsterType = MONSTERS[index % MONSTERS.length]
    yield new MonsterType();
    index++;
  }
}

export {
  FallingMonster,
  SlidingMonster,
}
