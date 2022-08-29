class FakeSprite {
  constructor(props) {
    Object.entries(props).forEach(([key, value]) => {
      this[key] = value
    });
  }

  update = jest.fn()
}

export const Sprite = jest.fn().mockImplementation((...args) => new FakeSprite(...args));

export default jest.fn().mockImplementation(() => ({
  Sprite
}));
