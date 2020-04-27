class Item {
  constructor() {
    this.name = "Item Name";
    this.type = "weapon";
    this.attack = 5;
    this.defense = 0;
  }
}



class Mercenary {
  constructor() {
    this.health = 100;
    this.damage = 1;
    this.weapon = dagger;
    this.armor
  }
}

//d20 rolls. dice roll is equal to damage dealt. roll 20 for double damage, roll 1 for miss and deal no damage.
//Attack Power = Base damage + weapon damage
//Resistance = armor
//d20 decides if the attack hits(2-19)/misses(1)/crits(20)
//Mercenary base damage and weapon damage decide damage range
//Damge dealt = mercenary's damage + 1*damageRange - armor





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