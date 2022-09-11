import * as types from "../types";
import FallingMonster from "./fallingMonster";
import SlidingMonster from "./slidingMonster";
import MagneticMonster from "./magneticMonster";
import TeleportingMonster from "./teleportingMonster";

type RandomNumberFunc = () => number;

type LevelDistribution = [number, number];

const defaultMonstersByLevel: types.MonsterConstructor[][] = [
  // [FallingMonster, SlidingMonster],
  [FallingMonster],
  [MagneticMonster, TeleportingMonster],
];

export default function* generateMonster<
  MonsterType extends types.MonsterConstructor
>({
  count,
  levelDistribution,
  monstersByLevel = defaultMonstersByLevel as MonsterType[][],
  getRandomNumber = Math.random,
}: {
  count: number;
  levelDistribution: LevelDistribution;
  monstersByLevel?: MonsterType[][];
  getRandomNumber?: RandomNumberFunc;
}): Iterator<MonsterType, void, void> {
  const perMonsterDistribution = getPerMonsterDistribution<MonsterType>(
    levelDistribution,
    monstersByLevel
  );
  for (let index = 0; index < count; index++) {
    yield getRandomMonsterConstructor<MonsterType>(
      perMonsterDistribution,
      getRandomNumber
    );
  }
}

function getPerMonsterDistribution<MonsterType>(
  levelDistribution: LevelDistribution,
  monstersByLevel: MonsterType[][]
): Array<[MonsterType, number]> {
  const monstersDistribution: Array<[MonsterType, number]> = [];
  let aggregateValue = 0;
  for (let groupIndex = 0; groupIndex < monstersByLevel.length; groupIndex++) {
    for (const monster of monstersByLevel[groupIndex]) {
      const monsterPct =
        levelDistribution[groupIndex] / monstersByLevel[groupIndex].length;
      aggregateValue = monsterPct + aggregateValue;
      monstersDistribution.push([monster, aggregateValue]);
    }
  }
  return monstersDistribution;
}

function getRandomMonsterConstructor<MonsterType>(
  perMonsterDistribution: Array<[MonsterType, number]>,
  getRandomNumber: RandomNumberFunc
): MonsterType {
  const randomPct = getRandomNumber() * 100;
  for (const item of perMonsterDistribution) {
    const [MonsterConstructor, pctLimit] = item;
    if (randomPct <= pctLimit) {
      return MonsterConstructor;
    }
  }
  throw new Error("Unexpected distribution");
}
