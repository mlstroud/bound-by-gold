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
    let cloth = new Item("cloth", "armor", 0, 0);
    this.name = name;
    this.health = 100;
    this.weapon = wood;
    this.armor = cloth;
    this.shield = null;
    this.cost = 50;
    this.currentTier = 0;
    this.shieldTier = 0;
  }

  upgrade(tier) {
    let wood = new Item("wood", "weapon", 24, 0);
    let cloth = new Item("cloth", "armor", 0, 0);
    let bronze = new Item("bronze", "weapon", 30, 0);
    let leather = new Item("leather", "armor", 0, 5);
    let iron = new Item("iron", "weapon", 40, 0);
    let chainmail = new Item("chainmail", "armor", 0, 10);
    let steelW = new Item("steel", "weapon", 50, 0);
    let steelA = new Item("steel", "armor", 0, 15);
    this.currentTier++;

    switch (tier) {
      case 1:
        this.weapon = bronze;
        this.armor = leather;
        break;
      case 2:
        this.weapon = iron;
        this.armor = chainmail;
        break;
      case 3:
        this.weapon = steelW;
        this.armor = steelA;
        break;
      default:
        this.weapon = wood;
        this.armor = cloth;
    }
  }

  equipShield(tier) {
    let buckler = new Item("buckler", "shield", 0, 3);
    let heater = new Item("heater", "shield", 0, 4);
    let scutum = new Item("scutum", "shield", 0, 5);
    this.shieldTier++;
    switch (tier) {
      case 1:
        this.shield = buckler;
        break;
      case 2:
        this.shield = heater;
        break;
      case 3:
        this.shield = scutum;
        break;
      default:
        this.shield = null;
    }
  }
}