import { Item } from './mercenary.js'

export class Enemy {
  constructor(name) {
    let wood = new Item("wood", "weapon", 24, 0);
    let cloth = new Item("cloth", "armor", 0, 0);
    let bronze = new Item("bronze", "weapon", 30, 0);
    let leather = new Item("leather", "armor", 0, 5);
    let iron = new Item("iron", "weapon", 40, 0);
    let chainmail = new Item("chainmail", "armor", 0, 10);
    let steelW = new Item("steel", "armor", 50, 0);
    let steelA = new Item("steel", "armor", 0, 15);
    this.name = name;
    if (name === "werewolf") {
      this.weapon = bronze;
      this.armor = leather;
    }
    if (name === "bandits") {
      this.weapon = wood;
      this.armor = cloth;
    }
    if (name === "caravan guard") {
      this.weapon = iron;
      this.armor = leather;
    }
    if (name === "manhunter") {
      this.armor = steelA;
      this.weapon = wood;
    }
    if (name === "knight") {
      this.armor = steelA;
      this.weapon = steelW;
    }
    this.health = 100;
    if (name === "goblin") {
      this.health = 70;
      this.weapon = wood;
      this.armor = cloth;
    }
    if (name === "ogre") {
      this.health = 200;
      this.armor = chainmail;
      this.weapon = iron;
    }
    this.shield = null;
  }
}