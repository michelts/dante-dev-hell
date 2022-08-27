import generateMonster from "../generateMonster";

it("should generate one of each provided monsters at a up to the end", () => {
  function MonsterA() {}
  function MonsterB() {}
  function MonsterC() {}
  const generator = generateMonster([MonsterA, MonsterB, MonsterC]);

  expect(generator.next().value).toBeInstanceOf(MonsterA);
  expect(generator.next().value).toBeInstanceOf(MonsterB);
  expect(generator.next().value).toBeInstanceOf(MonsterC);
  expect(generator.next().value).toBeInstanceOf(MonsterA);
});
