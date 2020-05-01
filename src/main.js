import $ from 'jquery';
import './styles.css';
import { JobBoard } from './contracts.js';
import { IncomeStatement } from './incomeStatement.js';
import { Combat } from './combat';
import { Enemy } from './enemy.js';
import { Mercenary } from './mercenary.js';

function displayArmy(army) {
  let hpcolor;
  let output = `<h3>Mercenaries - ${army.length}</h3>`;
  for (let i = 0; i < army.length; i++) {
    if (army[i].shieldTier === 1) {
      output += `<img src="https://img.itch.zone/aW1hZ2UvMzIzODI2LzE1OTk1ODkucG5n/original/%2B%2FZD3e.png" style="width: 15px; height: auto;"> `;
    } else if (army[i].shieldTier === 2) {
      output += `<img src="http://pixelartmaker.com/art/cc9ed077aed46f5.png" style="width: 15px; height: auto;"> `;
    } else if (army[i].shieldTier === 3) {
      output += `<img src="http://pixelartmaker.com/art/ed3356c30a198de.png" style="width: 15px; height: auto;"> `;
    }
    if (army[i].health >= 70) {
      hpcolor = "#5cb85c";
    } else if (army[i].health >= 40) {
      hpcolor = "#ff9900";
    } else {
      hpcolor = "#FF0000";
    }
    output += `[${army[i].currentTier}][<span style="color:${hpcolor};">${army[i].health}</span>] ${army[i].name}<br>`;
  }
  $("#army").html(output);
}

$(document).ready(function () {
  let jobBoard = new JobBoard;
  let incomeStatement = new IncomeStatement;

  let combat = new Combat;
  let names = ["Hernias the Sad", "Gilbert Greymane", "Willmot Hightower", "Isemberd the Just", "Hameline of the Golden Plains", "Bryant Tykum", "Maximus Decimus Meridius", "Varog un Thuul", "Jareth Ironskin", "Hagalbar af Baggleton", "Tyvik af Montainius", "Renham the Fat", "Jerrick the Prick", "Quintis Veryartus", "Huidemar Greenshield", "Richemanus of Butterhall", "Neale the Strong", "Acur the Dimwitted", "Igor Malculinus", "Tamas the Tiny", "Federyc the Ulfhednar", "Timaeus Garoland", "Hephaeus the Smith", "Phaedrus the Shadow", "Foust the Fairhaired", "Ulrick Von Likteinstein", "Leonitus the Pure", "Marcus Orelious Krasis", "Roger Osprey", "Sir Gwendalin Gant", "Titus Yongrel", "Philip the Tall", "Dunk the Drunk", "Hilder the Brute", "Ulf the Starry Eyed", "Krixis the Bull", "Gannocus the Undeafeated", "Rikard the Swift", "Ike of Vundeburg"];
  let coinBag = 0;
  let ourCompany = [];
  let filledArray = [];
  let mercTier = 0; // 0 wood/cloth - 1 leather/bronze - 2 iron/chainmail - 3 steel/steel
  let shieldTier = 0; // 0 none - 1 buckler - 2 heater - 3 scutum


  $("#healMerc").click(function () {
    let currentGold = parseInt($("#showIncomeEarnedOnContract").text());
    if (currentGold >= 50) {
      if (ourCompany.length > 0) {
        if (ourCompany[0].health < 100) {
          currentGold -= 50;
          incomeStatement.aggregateIncome -= 50;
          $("#showIncomeEarnedOnContract").text(currentGold);
          ourCompany[0].health = 100;
          setTimeout(displayArmy(ourCompany), 500);
        } else {
          alert("Your mercenaries are already full health.");
        }

      } else {
        alert("You do not have any mercenaries.");
      }

    } else {
      alert("You do not have enough gold for that.");
    }
  });

  $("#buyShield").click(function () {
    let currentGold = parseInt($("#showIncomeEarnedOnContract").text());
    if (currentGold >= 1000) {

      let needsUpgrade = false;
      for (let i = 0; i < ourCompany.length; i++) {
        if (ourCompany[i].shieldTier < 3) {
          needsUpgrade = true;
          break;
        }
      }

      if (needsUpgrade) {
        currentGold -= 1000;
        incomeStatement.aggregateIncome -= 1000;
        $("#showIncomeEarnedOnContract").text(currentGold);
        for (let i = 0; i < ourCompany.length; i++) {
          if (ourCompany[i].shieldTier < 3) {
            ourCompany[i].equipShield(shieldTier + 1);
          }
        }
        shieldTier++;
        setTimeout(displayArmy(ourCompany), 500);
      } else {
        alert("You already have the best shields.");
      }
    } else {
      alert("You do not have enough gold for that.");
    }
  });

  $("#upgradeMerc").click(function () {
    let currentGold = parseInt($("#showIncomeEarnedOnContract").text());
    if (currentGold >= 500) {

      let needsUpgrade = false;
      for (let i = 0; i < ourCompany.length; i++) {
        if (ourCompany[i].currentTier < 3) {
          needsUpgrade = true;
          break;
        }
      }

      if (needsUpgrade) {
        currentGold -= 500;
        incomeStatement.aggregateIncome -= 500;
        $("#showIncomeEarnedOnContract").text(currentGold);
        for (let i = 0; i < ourCompany.length; i++) {
          if (ourCompany[i].currentTier < 3) {
            ourCompany[i].upgrade(mercTier + 1);
          }
        }
        mercTier++;
        displayArmy(ourCompany);
      } else {
        alert("You already have max upgrades.");
      }
    } else {
      alert("You do not have enough gold for that.");
    }
  });

  $("#buyMerc").click(function () {
    let currentGold = parseInt($("#showIncomeEarnedOnContract").text());

    if (currentGold >= 50) {
      currentGold -= 50;
      incomeStatement.aggregateIncome -= 50;
      $("#showIncomeEarnedOnContract").text(currentGold);
      let nameIndex = Math.floor(Math.random() * names.length);
      let mercName = names[nameIndex];
      let merc = new Mercenary(mercName);
      ourCompany.push(merc);
      displayArmy(ourCompany);
    } else {
      alert("You do not have enough gold for that.");
    }
  });


  $("#storyIntro").text("You are an old veteran of many wars. You fought for the royal family the “Fehrwights” who had ruled the land of Izorius for centuries. During the last great war, the royal “Fehrwights” lost their iron grip on the region and lost bloody battle after bloody battle. Until their last stand at Castle Umblai. You were dispatched with twenty of the Kings finest to enact a surgical strike against the opposing force. Tasked with the mission to slay their commanding lord & poison the wells to cause disarray. Poisoning the wells went smoothly as you split your force into 5 groups of 4 and crept about in the dead of night slitting every throat your team encountered. Regrouping on a small hill in the wee hours of dawn you prepare for the approach on the opposing lords tent. An eerie feeling creeps into your bones and you notice that only 3 of the 4 groups are present. In this moment a flood of enemies pour upon you from the shadows.  Amidst the bloody turmoil you and 4 of the twenty managed to escape. It didn’t matter though. You’d kicked the hornets nest. Lord “Redwater ” rallied his force and made the ground quake with boots and siege engines. Quickly crumbling the walls of Castle Umblai. As the dynasty you fought for your entire life crumbles before your very eyes. Any wealth you may have been entitled to washed away. With the King dead every Duke, Baron & Lord began jockeying for power. Needing to survive in this brave new world, rought with instability you turn to the only life you’ve ever known. Forged in Blood & Bound by Gold, the mercenary life for me.");

  $('#gameStart').click(function () {
    filledArray = [];
    $("#storyIntro").hide();
    if (ourCompany.length === 0) {
      for (let i = 0; i < 5; i++) {
        let nameIndex = Math.floor(Math.random() * names.length);
        let mercName = names[nameIndex];
        let merc = new Mercenary(mercName);
        ourCompany.push(merc);
      }
      displayArmy(ourCompany);
    } else {
      ourCompany = [];
      for (let i = 0; i < 5; i++) {
        let nameIndex = Math.floor(Math.random() * names.length);
        let mercName = names[nameIndex];
        let merc = new Mercenary(mercName);
        ourCompany.push(merc);
      }
      displayArmy(ourCompany);
    }

    $("#combatlog").text("");
    combat.combatLog = [];
    jobBoard.callOurFunctions();
    incomeStatement.aggregateIncome = 0;
    $("#showIncomeEarnedOnContract").html(incomeStatement.aggregateIncome);

    const contractArray = ["WereWolf", "Goblin", "Caravan Escort", "Caravan Ambush", "ManHunter", "Soldier", "Ogre", "WarParty"];
    const enemyArray = ["werewolves", "goblins", "bandits", "caravan guards", "man hunters", "soldiers", "ogres", "knights"];

    for (let i = 0; i < 8; i = i + 1) {
      $("#showOutput" + i).html("");
      $("#showOutput0").append("<h3>" + contractArray[i] + " contracts are here</h3>");
      for (let l = 0; l < jobBoard.ourThreeDimentionalArray[i][0].length; l = l + 1) {
        $("#showOutput0").append(`<li>Enemies present are ${jobBoard.ourThreeDimentionalArray[i][0][l]} ${enemyArray[i]} and the contract is worth ${jobBoard.ourThreeDimentionalArray[i][1][l]}g, with death money valued at ${jobBoard.werewolfDeathMoney} gold. <button class="scb werewolf" id="${i},${l}">Select Contract</button></li>`);
      }
    }
  });

  //=====================================================================================
  $(".container").on("click", ".scb", function () {
    let i = this.id.split(",");
    let a = i[0];
    let b = i[1];

    combat.combatLog = [];

    jobBoard.contractClicked[0] = jobBoard.ourThreeDimentionalArray[a][0][b];
    jobBoard.contractClicked[1] = jobBoard.ourThreeDimentionalArray[a][1][b];

    jobBoard.contractClicked[0] = jobBoard.ourThreeDimentionalArray[a][0][b];
    jobBoard.contractClicked[1] = (jobBoard.ourThreeDimentionalArray[a][1][b]);

    if (a == 0) {
      jobBoard.contractClicked[2] = jobBoard.werewolfDeathMoney;
      for (let i = 0; i < jobBoard.contractClicked[0]; i++) {
        let enemy = new Enemy("werewolf");
        filledArray.push(enemy);
      }
    }
    else if (a == 1) {
      jobBoard.contractClicked[2] = jobBoard.goblinCaveDeathMoney;
      for (let i = 0; i < jobBoard.contractClicked[0]; i++) {
        let enemy = new Enemy("goblin");
        filledArray.push(enemy);
      }
    }
    else if (a == 2) {
      jobBoard.contractClicked[2] = jobBoard.caravanEscortDeathMoney;
      for (let i = 0; i < jobBoard.contractClicked[0]; i++) {
        let enemy = new Enemy("bandit");
        filledArray.push(enemy);
      }
    }
    else if (a == 3) {
      jobBoard.contractClicked[2] = jobBoard.caravanAmbushDeathMoney;
      for (let i = 0; i < jobBoard.contractClicked[0]; i++) {
        let enemy = new Enemy("caravan guard");
        filledArray.push(enemy);
      }
    }
    else if (a == 4) {
      jobBoard.contractClicked[2] = jobBoard.manHunterContractDeathMoney;
      for (let i = 0; i < jobBoard.contractClicked[0]; i++) {
        let enemy = new Enemy("manhunter");
        filledArray.push(enemy);
      }
    }
    else if (a == 5) {
      jobBoard.contractClicked[2] = jobBoard.soldierContractDeathMoney;
      for (let i = 0; i < jobBoard.contractClicked[0]; i++) {
        let enemy = new Enemy("soldier");
        filledArray.push(enemy);
      }
    }
    else if (a == 6) {
      jobBoard.contractClicked[2] = jobBoard.ogreContractDeathMoney;
      for (let i = 0; i < jobBoard.contractClicked[0]; i++) {
        let enemy = new Enemy("ogre");
        filledArray.push(enemy);
      }
    }
    else {
      jobBoard.contractClicked[2] = jobBoard.warPartyContractDeathMoney;
      for (let i = 0; i < jobBoard.contractClicked[0]; i++) {
        let enemy = new Enemy("knight");
        filledArray.push(enemy);
      }
    }

    $("#combatlog").text("");

    if (ourCompany.length > 0) {
      incomeStatement.numberOfMercenaries = ourCompany.length;
      let survived = combat.combat(ourCompany, filledArray);
      ourCompany = survived;
      let mercSurvived = survived.length;
      incomeStatement.calculateIncome(jobBoard.contractClicked, mercSurvived); // pl don't remove this line.
      let ourContractIncome = incomeStatement.aggregateIncome; // pl don't remove this line.

      if (mercSurvived === 0) {
        mercTier = 0;
        shieldTier = 0;
      }
      displayArmy(ourCompany);

      $("#showIncomeEarnedOnContract").html(ourContractIncome);

      $("#combatlog").append("<h3 id='combat-header'>Combat Log</h3>");
      for (let i = 0; i < combat.combatLog.length; i++) {
        $("#combatlog").append(combat.combatLog[i] + "<br>");
      }

      $("coinBag").html(coinBag);
    } else {
      alert("You don't have any mercenaries.");
    }

  });

});