import FallingMonster from './FallingMonster';
import SlidingMonster from './SlidingMonster';

const MONSTERS = [FallingMonster, SlidingMonster];

export default function *generateMonster() {
  for(let i=0; i<10; i++) {
    yield MONSTERS[i % MONSTERS.length];
  }
}

export {
  FallingMonster,
  SlidingMonster,
}
