import { Language } from "../types";
import Level from "./level";

const LEVELS = [
  { language: Language.Python, speed: 4, frequency: 1 },
  { language: Language.Ruby, speed: 4, frequency: 0.75 },
  { language: Language.Javascript, speed: 4, frequency: 0.5 },
];

export default function* generateLevels(): Iterator<Level, void, void> {
  for (const params of LEVELS) {
    yield new Level(params);
  }
}
