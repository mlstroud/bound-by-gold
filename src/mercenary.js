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
    let wood = new Item("bronze", "weapon", 30, 0);
    let cloth = new Item("leather", "armor", 0, 5);
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
    } else if (item.type === "shield") {
      this.shield = item;
    } else {
      this.armor = item;
    }
  }
}