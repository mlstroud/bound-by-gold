import $ from 'jquery';
import './styles.css';
import { Combat } from './combat.js';
import { Mercenary } from './combat.js';
import { Item } from './combat.js';
import { Enemy } from './combat.js';

$(document).ready(function() {
  let mercenaries = [new Mercenary("Merc 1"), new Mercenary("Merc 2"), new Mercenary("Merc 3")];
  let enemies = [new Enemy("bandits"), new Enemy("bandits"), new Enemy("bandits")];
  let battle = new Combat();
  battle.combat(mercenaries, enemies);
  for(let i = 0; i < battle.combatLog.length; i++) {
    $("#combatlog").append("- " + battle.combatLog[i] + "<br>");
  }

  let mercenaries2 = [new Mercenary("Merc 1"), new Mercenary("Merc 2"), new Mercenary("Merc 3"), new Mercenary("Merc 4")];
  let enemies2 = [new Enemy("caravan guard"), new Enemy("caravan guard"), new Enemy("caravan guard")];
  let battle2 = new Combat();
  battle2.combat(mercenaries2, enemies2);

  for(let i = 0; i < battle2.combatLog.length; i++) {
    $("#combatlog2").append("- " + battle2.combatLog[i] + "<br>");
  }

  let bronze = new Item("bronze", "weapon", 30, 0);
  let leather = new Item("leather","armor", 0, 5);
  let mercenaries3 = [new Mercenary("Merc 1"), new Mercenary("Merc 2"), new Mercenary("Merc 3"), new Mercenary("Merc 4")];
  let enemies3 = [new Enemy("knight"), new Enemy("knight")];
  mercenaries3[0].equipItem(bronze);
  mercenaries3[0].equipItem(leather);
  let battle3 = new Combat();
  battle3.combat(mercenaries3, enemies3);
  for(let i = 0; i < battle3.combatLog.length; i++) {
    $("#combatlog3").append("- " + battle3.combatLog[i] + "<br>");
  }

  let num = Math.floor(Math.random() * 10) + 1;
  let goblin = new Enemy("goblin")
  let filledArray = new Array(num).fill(null).map(()=> ({goblin}))
  console.log(filledArray);

});