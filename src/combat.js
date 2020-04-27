class Item {
  constructor(name, type, attack, defense) {
    this.name = name;
    this.type = type;
    this.attack = attack;
    this.defense = defense;
  }
}

class Mercenary {
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

class Combat {

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
    turnOrder = [];
    for (i = 0; i < orderLength; i++) {
      if (i < mercenaries.length) {
        turnOrder.push(mercenaries[i]);
      }
      if (i < enemies.length) {
        turnOrder.push(enemies[i]);
      }
    }
    //turnOrder filled
    index = 0;
    let dmg;
    //start of combat. If there are things in either of these arrays: combat continues
    while (mercenaries.length > 0 || enemies.length > 0) {
      if (turnOrder[i].name === "merc") {
        if (turnOrder[i].health > 0) {
          dmg = attack(turnOrder[i].attackPWR());
          enemies[0].health -= dmg;
          if (enemies[0].health <= 0) {
            enemies.shift();
          }
        }
      } else {
        dmg = attack(turnOrder[i].attackPWR());
        mercenaries[0].health -= dmg;
        if (mercenaries[0].health <= 0) {
          mercenaries.shift();
        }
      }
      for (i = 0; i < turnOrder.length; i++) {
        if (turnOrder[i].health <= 0) {
          turnOrder.splice(i, 1);
        }
      }
    }
    return mercenaries;
  }
}


/*



index = 0;
while battle not over
  if merc or enemy is empty
    battle over
  else if merc <<<
    if.health > 0
      attack enemy[0]
        if enemy[0].health <= 0
          enemy.shift();
          turnorder[index].health = 0
  else (enemy)Eif health >0
      attack merc[0]
        if merc[0].heath <= 0
          merc.shift()
          turn

  if index is last element of turnorder
    index = 0
  else
    index++

*/
//d20 rolls. dice roll is equal to damage dealt. roll 20 for double damage, roll 1 for miss and deal no damage.
//Attack Power = Base damage + weapon damage
//Resistance = armor
//d20 decides if the attack hits(2-19)/misses(1)/crits(20)
//Mercenary base damage and weapon damage decide damage range
//Damge dealt = mercenary's damage + damageRange - armor

/*
M[3]  W[1]
turnOrder = [M0, W0, M1, M2]

M[I] at W[0]
if (W[0].health === 0){
  W[0] remove from array

}

1M   4W
  2M
3M

--------

1M  2W
3M  4W
5M
6M

for (i=0; )


WHILE battle is not over
  if merc or enemy array is empty
    end battle

  else if object is merc
    alive = false
    while not alive
      if enemy is alive
        attack this enemy
        if enemy health === 0
          enemy alive = false
      else
        move to next enemy index

  else (object is enemy)
    alive = false
    while not alive
      if merc is alive
        attack this merc
      else
        move to next merc index


 1
 M

  1
  W
      2  3
M0 M1 W2 M3

M0 M1 | W1 M2


INDEX =0
while battle not over
  if merc or enemy is empty
    battle over
  else if merc
    if.health > 0
      attack enemy[0]
        if enemy[0].health <= 0
          enemy.shift();
          turnorder[index].health = 0
  else (enemy)Eif health >0
      attack merc[0]
        if merc[0].heath <= 0
          merc.shift()
          turn

  if index is last element of turnorder
    index = 0
  else
    index++

*/