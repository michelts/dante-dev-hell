import Level from "./level";

export default function* generateLevels(): Iterator<Level, void, void> {
  for (let speed = 1; speed < 4; speed++) {
    yield new Level({ speed });
  }
}
