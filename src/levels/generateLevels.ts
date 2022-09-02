import { Language } from "../types";
import Level from "./level";

export default function* generateLevels(): Iterator<Level, void, void> {
  let speed = 2;
  for (const language of Object.keys(Language)) {
    yield new Level({ speed, language });
    speed += 1;
  }
}
