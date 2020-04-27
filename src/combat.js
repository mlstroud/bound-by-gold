export class Item {
  constructor(name, type, attack, defense) {
    this.name = name;
    this.type = type;
    this.attack = attack;
    this.defense = defense;
  }
}

export class Mercenary {
  constructor(name) {
    let dagger = new Item("Dagger", "weapon", 100, 0);
    this.name = name;
    this.health = 100;
    this.damage = 1;
    this.weapon = dagger;
    this.armor = null;
    this.attackPWR = function () { return this.damage + this.weapon.attack };
  }

  equipItem(item) {
    if (item.type === "weapon") {
      this.weapon = item;
    } else {
      this.armor = item;
    }
  }
}

export class Combat {
  constructor() {
  }
  attack(damage) {
    let roll = Math.floor(Math.random() * 20) + 1;
    if (roll === 20) {
      damage += roll * 2;
    } else if (roll === 1) {
      damage = 0;
    } else {
      damage += roll;
    }
    return damage;
  }

  //receive an array of mercanary objects, and a second array of enemy objects
  combat(mercenaries, enemies) {
    let i;
    //create and determine turn order
    let orderLength;
    if (mercenaries.length > enemies.length) {
      orderLength = mercenaries.length;
    } else {
      orderLength = enemies.length;
    }
    let turnOrder = [];
    for (i = 0; i < orderLength; i++) {
      if (i < mercenaries.length) {
        turnOrder.push(mercenaries[i]);
      }
      if (i < enemies.length) {
        turnOrder.push(enemies[i]);
      }
    }
    //turnOrder filled
    i = 0;
    let dmg;
    //start of combat. If there are things in either of these arrays: combat continues
    while (mercenaries.length > 0 && enemies.length > 0) {
      if (turnOrder[i].health > 0) {
        if (turnOrder[i].name === "merc") {
          dmg = this.attack(turnOrder[i].attackPWR());
          enemies[0].health -= dmg;
          if (enemies[0].health <= 0) {
            enemies.shift();
          }
        } else {
          dmg = this.attack(turnOrder[i].attackPWR());
          mercenaries[0].health -= dmg;
        }
        if (mercenaries[0].health <= 0) {
          mercenaries.shift();
        } else {
          i++;
        }
      }
      if (i === turnOrder.length) {
        i = 0;
      }
    }
    return mercenaries;
  }
}