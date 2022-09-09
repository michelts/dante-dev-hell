class FakeSprite {
  constructor(props) {
    Object.entries(props).forEach(([key, value]) => {
      this[key] = value;
    });
  }

  update = jest.fn();
}

export const Sprite = jest
  .fn()
  .mockImplementation((...args) => new FakeSprite(...args));

export const SpriteSheet = jest
  .fn()
  .mockImplementation((...args) => new FakeSprite(...args));

export const on = jest.fn();

export const emit = jest.fn();

export default jest.fn().mockImplementation(() => ({
  Sprite,
  SpriteSheet,
}));
