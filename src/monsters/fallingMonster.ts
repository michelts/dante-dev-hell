import BaseMonster from "./base";

export default class FallingMonster extends BaseMonster {
  protected getImagePath(): string {
    return "m 35,20 c 0,7 -1,23 -3.3,30 L 28,41 22,50 18,40 10,49 7,40 0,48 C 0,39 2,36 3,23 4,12 6,0 16,0 25,0 34,3 35,21 Z";
  }

  protected getShadowPath(): string {
    return "M 4,42 0,48 C 0,39 2,35 3,23 3.5,12 6,0 15,0 20,0 23,0 26,2 3.3,3 10,20 5,42 Z";
  }
}
