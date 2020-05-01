import { Mercenary } from './mercenary.js'
// import { Enemy } from './enemy.js'

export class Combat {
  constructor() {
    this.combatLog = [];
    this.color = "";
  }

  attack(char, target) {
    let roll;
    let damage = char.weapon.attack - target.armor.defense;
    roll = Math.floor(Math.random() * 20) + 1;

    if (char instanceof Mercenary) {
      this.color = "#5cb85c";
    } else {
      this.color = "#FF0000";
    }

    if (roll === 20) {
      damage = (damage + roll * 2);
      this.combatLog.push(`<span style="color: ${this.color};">${char.name} rolled ${roll}. It's a CRITICAL hit. Struck ${target.name} for ${damage}.</span>`);
    } else if (roll === 1) {
      damage = 0;
      this.combatLog.push(`<span style="color: ${this.color};">${char.name} rolled ${roll}. It's a CRITICAL miss. Struck ${target.name} for ${damage}.</span>`);
    } else if (target.shield != null && roll <= target.shield.defense) {
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
    if (mercenaries.length === 0) {
      this.combatLog.push('<span style="color:#FFFFFF;">Your mercenary company is empty. Please buy more mercenaries.</span>');
    } else {
      let mcount = 0;
      let ecount = 0;
      //continue combat until either all mercs or enemies are dead
      while (mercenaries.length > 0 && enemies.length > 0) {
        //Attack enemy
        enemies[0].health -= this.attack(mercenaries[mcount], enemies[0]);
        //if they die: display message and remove them from combat
        if (enemies[0].health <= 0) {
          this.combatLog.push(`<span style="color:#FFFFFF;">${enemies[0].name} HAS BEEN SLAIN!`);
          enemies.shift();
          if (ecount > 0) {
            ecount--;
          }
          if (enemies.length === 0) {
            break;
          }
        }
        mcount++;
        this.combatLog.push(`<span style="color:#FFFFFF;">There are ${enemies.length} enemies left.`);

        mercenaries[0].health -= this.attack(enemies[ecount], mercenaries[0]);
        if (mercenaries[0].health <= 0) {
          this.combatLog.push(`<span style="color:#FFFFFF;">${mercenaries[0].name} HAS FALLEN!`);
          mercenaries.shift();
          if (mcount > 0) {
            mcount--;
          }
          if (mercenaries.length === 0) {
            break;
          }
        }
        this.combatLog.push(`<span style="color:#FFFFFF;">End of turn. You have ${mercenaries.length} mercenaries left.`);
        ecount++;
        if (enemies.length === 1 || ecount === enemies.length - 1) {
          ecount = 0;
        }
        if (mercenaries.length === 1 || mcount === mercenaries.length - 1) {
          mcount = 0;
        }
      }
      if (mercenaries.length > 0) {
        this.combatLog.push(`<span style="color:#5cb85c;"><strong>You won with ${mercenaries.length} mercenaries surviving.</strong></span>`);
      } else {
        this.combatLog.push(`<span style="color:#FF0000;"><strong>All of your mercenaries were defeated. Enemies remaining: ${enemies.length}.</strong></span>`);
      }
    }
    return mercenaries;
  }
}