import { Language } from "../types";
import Level from "./level";

const LEVELS = [
  { language: Language.Python, speed: 1.5, frequency: 1 },
  { language: Language.Ruby, speed: 1.5, frequency: 0.5 },
  { language: Language.Javascript, speed: 2, frequency: 1 },
];

export default function* generateLevels(): Iterator<Level, void, void> {
  for (const params of LEVELS) {
    yield new Level(params);
  }
}
