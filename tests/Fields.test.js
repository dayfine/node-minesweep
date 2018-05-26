const MineFields = require('../src/Fields')

test('Got a fields?', () => {
  const minefields = new MineFields(10, 20, 50)
  expect(minefields.length).toBe(10)
  expect(minefields[0].length).toBe(20)
})
