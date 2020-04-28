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
    let wood = new Item("wood", "weapon", 24, 0);
    let cloth = new Item("cloth","armor", 0, 0);
    this.name = name;
    this.health = 100;
    this.weapon = wood;
    this.armor = cloth;
    this.shield = null;
    this.cost = 100;
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
    let bronze = new Item("bronze", "weapon", 30, 0);
    let leather = new Item("leather","armor", 0, 5);
    let iron = new Item("iron", "weapon", 40, 0);
    let chainmail = new Item("chainmail","armor", 0, 10);
    let steelW = new Item("steel","armor", 50, 0);
    let steelA = new Item("steel","armor", 0, 15);
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
      this.armor = leather;
    }
    if(name === "manhunter"){
      this.armor = steelA;
      this.weapon = wood;
    }
    if(name === "knight"){
      this.armor = steelA;
      this.weapon = steelW;
    }
    this.health = 100;
    if (name === "goblin"){
      this.health = 70;
      this.weapon = wood;
      this.armor = cloth;
    }
    if (name === "ogre"){
      this.health = 200;
      this.armor = chainmail;
      this.weapon = iron;
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
      damage = (damage + roll) * 2;
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

  //receive an array of mercanary objects, and a second array of enemy objects to start combat
  combat(mercenaries, enemies) {
    let mcount = 0;
    let ecount = 0;
    //continue combat until either all mercs or enemies are dead
    while (mercenaries.length > 0 && enemies.length > 0) {
      //Attack enemy
      enemies[0].health -= this.attack(mercenaries[mcount], enemies[0]);
      //if they die: display message and remove them from combat
      if (enemies[0].health <= 0) {
        this.combatLog.push(enemies[0].name + " HAS BEEN SLAIN!");
        enemies.shift();
        if (ecount > 0) {
          ecount--;
        }
        if (enemies.length === 0) {
          break;
        }
      }
      mcount++;
      this.combatLog.push(`There are ${enemies.length} enemies left.`);

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
      this.combatLog.push(`End of turn. You have ${mercenaries.length} mercenaries left.`);
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
      this.combatLog.push(`<span style="color:#FF0000;"><strong>All of your mercenaries were defeated. Enemies remaining: ${enemies.length}.</strong></span>`);
    }
    console.log(this.combatLog);
    return mercenaries;
  }
}