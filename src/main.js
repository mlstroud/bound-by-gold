import $ from 'jquery';
import './styles.css';
import { Combat } from './combat.js';
import { Mercenary } from './combat.js';
// import { Item } from './combat.js';
import { Enemy } from './combat.js';

$(document).ready(function() {

  let mercenaries = [new Mercenary("Merc 1"), new Mercenary("Merc 2"), new Mercenary("Merc 3")];
  let enemies = [new Enemy("bandits"), new Enemy("bandits"), new Enemy("bandits")]

  // let buckler = new Item("Buckler", "shield", 0, 5);
  // mercenaries[0].shield = buckler;

  let battle = new Combat();
  let result = battle.combat(mercenaries, enemies);

  for(let i = 0; i < battle.combatLog.length; i++) {
    $("#combatlog").append(battle.combatLog[i] + "<br>");
  }

  console.log(result);
});