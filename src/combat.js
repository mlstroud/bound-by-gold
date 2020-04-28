export class Item {
  constructor(name, type, attack, defense) {
    this.name = name;
    this.type = type;
    this.attack = attack;
    this.defense = defense;
  }
  /*RELATIVE ITEM POWER
    ARMOR   |   WEAPON
    -------------------
    cloth   |   wood      1
    leather |   bronze    2
  chainmail |   iron      3
    steel   |   steel     4


             Power Balancing
             ---------------
          Enemies   |   AVG hits to kill
        ------------------------------
        Goblins     |   2
Werewolves/Bandits  |  3-4 


*/

  
}

export class Mercenary {
  constructor(name) {
    let wood = new Item("wood", "weapon", 24, 0);
    let cloth = new Item("cloth","armor", 0, 0);
    this.name = name;
    this.health = 100;
    this.weapon = wood;
    this.armor = cloth;
    this.shield = null;
  }

  equipItem(item) {
    if (item.type === "weapon") {
      this.weapon = item;
    } else if(item.type === "shield"){
      this.shield = item;
    } else {
      this.armor = item;
    }
  }
}

export class Enemy {
  constructor(name) {
    let wood = new Item("wood", "weapon", 24, 0);
    let cloth = new Item("cloth","armor", 0, 0);
    let bronze = new Item("bronze", "weapon", 50, 0);
    let leather = new Item("leather","armor", 0, 8);
    let iron = new Item("iron", "weapon", 50, 0);
    // let chainmail = new Item("chainmail","armor", 0, 12);
    // let steelW = new Item("steel","armor", 50, 0);
    // let steelA = new Item("steel","armor", 0, 15);
    this.name = name;
    if (name === "werewolf"){
      this.weapon = bronze;
      this.armor = leather;
    }
    if(name === "bandits"){
      this.weapon = wood;
      this.armor = cloth;
    }
    if(name === "caravan guard"){
      this.weapon = iron;
      // this.armor = leather;
    }
    this.health = 100;
    if (name === "goblin"){
      this.health = 70;
      this.weapon = wood;
      this.armor = cloth;
    }
    this.shield = null;
  }
}


export class Combat {
  constructor() {
    this.combatLog = [];
    this.color = "";
  }

  attack(char, target) {
    let roll;
    let damage = char.weapon.attack - target.armor.defense;
    roll = Math.floor(Math.random() * 20) + 1;

    if(char instanceof Mercenary) {
      this.color = "#008000";
    } else {
      this.color = "#FF0000";
    }

    if (roll === 20) {
      damage += roll * 2;
      this.combatLog.push(`<span style="color: ${this.color};">${char.name} rolled ${roll}. It's a CRITICAL hit. Struck ${target.name} for ${damage}.</span>`);
    } else if (roll === 1) {
      damage = 0;
      this.combatLog.push(`<span style="color: ${this.color};">${char.name} rolled ${roll}. It's a CRITICAL miss. Struck ${target.name} for ${damage}.</span>`);
    } else if (target.shield != null && roll < target.shield.defense){
      damage = 0;
      this.combatLog.push(`<span style="color: ${this.color};">${char.name} rolled ${roll}. ${target.name} blocked the attack.</span>`);
    } else {
      damage += roll;
      this.combatLog.push(`<span style="color: ${this.color}";>${char.name} rolled ${roll}. Struck ${target.name} for ${damage}.</span>`);
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

    let mcount = 0;
    let ecount = 0;
    while (mercenaries.length > 0 && enemies.length > 0) {
      //CHANGE ATTACK TO SEND IN OBJECTS
      enemies[0].health -= this.attack(mercenaries[mcount], enemies[0]);
      if (enemies[0].health <= 0) {
        this.combatLog.push(enemies[0].name + " HAS BEEN SLAYN!");
        enemies.shift();
        if (ecount > 0) {
          ecount--;
        }
        if (enemies.length === 0) {
          break;
        }
      }
      mcount++;
      this.combatLog.push("These enemies are left: " + enemies.length);
      mercenaries[0].health -= this.attack(enemies[ecount], mercenaries[0]);
      if (mercenaries[0].health <= 0) {
        this.combatLog.push(mercenaries[0].name + " HAS FALLEN!");
        mercenaries.shift();
        if (mcount > 0) {
          mcount--;
        }
        if (mercenaries.length === 0) {
          break;
        }
      }
      this.combatLog.push("End of turn. These mercs are left: " + mercenaries.length);
      ecount++;
      if (enemies.length === 1 || ecount === enemies.length - 1) {
        ecount = 0;
      }
      if (mercenaries.length === 1 || mcount === mercenaries.length - 1) {
        mcount = 0;
      }
    }

    if(mercenaries.length > 0) {
      this.combatLog.push(`<span style="color:#008000;"><strong>You won with ${mercenaries.length} mercenaries surviving.</strong></span>`);
    } else {
      this.combatLog.push(`<span style="color:#FF0000;"><strong>All of your mercenaries were defeated.</strong></span>`);
    }
    console.log(this.combatLog);
    return mercenaries;
  }
}