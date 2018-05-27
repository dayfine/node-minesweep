const MineFields = require('../src/Fields')

test('Got a fields?', () => {
  const minefields = new MineFields(10, 20, 50)
  expect(minefields.height).toBe(10)
  expect(minefields.width).toBe(20)
})
