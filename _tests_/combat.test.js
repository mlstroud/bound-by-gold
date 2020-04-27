import { Combat } from './../src/combat.js'
import { Mercenary } from './../src/combat.js'

describe('Test combat functionality', () => {
  let battle;
  let merc;
  let mercenaries;
  let enemies;

  beforeEach(() => {
    battle = new Combat();
    merc = new Mercenary();
    mercenaries = [merc, merc];
    enemies = [merc, merc];
  });

  test('Should test to see if they are attacking each other and changing their health bars', async () => {
    expect(battle.combat(mercenaries, enemies).length).toEqual(1);
  });
});