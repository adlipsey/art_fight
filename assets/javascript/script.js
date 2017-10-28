//Global variables in the event they are needed
var charmander;
var pikachu;
var squirtle;
var bulbasaur;
var objects;
var atkGlobal = null;
var defGlobal1 = null;
var defGlobal2 = null;
var defGlobal3 = null;

//Function for creating new fighters
function Fighter([name, hp, totHp, atkPwr, baseAtk, cntrPwr]){
	this.name = name;
	this.hp = hp;
	this.totHp = totHp
	this.atkPwr = atkPwr;
	this.baseAtk = baseAtk;
	this.cntrPwr = cntrPwr;
}


//Combat object - all functions pertaining to attack, counter attack and HP
var Combat = {

	attack: function(atk, def) {
		def.hp -= atk.atkPwr;

		console.log(atk.name + " attacked " + def.name + " for " + atk.atkPwr + " damage.");
		atk.atkPwr += atk.baseAtk;
	},

	counter: function(atk, def) {
		atk.hp -= def.cntrPwr;
		console.log(def.name + " counter attacked for " + def.cntrPwr + " damage.");
	},

	fight: function(atk, def) {
		Combat.attack(atk, def);
		console.log(def.name + " has " + def.hp  + " hp left.");
		if(def.hp > 0){
			Combat.counter(atk, def);
		}
		else if(atk.hp <= 0){
			console.log("You have been defeated.")
		}
		else {
			console.log(atk.name + " Wins!")
		}
		console.log(atk.name + " has " + atk.hp + " hp left.");
		console.log("-------------------------------------------");
	},

	battle: function(atk, def1, def2, def3) {
		Game.directions = "Now it's time to attack! Click the attack button until you defeat all your opponents or succomb to their might!";
		$("#directions").text(Game.directions);
		if(atk.hp > 0){
			$("#atkBtn").on("click", function () {
				if(def1.hp > 0) {
					Combat.fight(atk, def1);
					$(".atkHPbar").css("width", Math.floor((atk.hp/atk.totHp)*100)+"%");
					$(".defHPbar1").css("width", Math.floor((def1.hp/def1.totHp)*100)+"%");
				}
				else if(def2.hp > 0){
					Combat.fight(atk, def2);
					$(".atkHPbar").css("width", Math.floor((atk.hp/atk.totHp)*100)+"%");
					$(".defHPbar2").css("width", Math.floor((def2.hp/def2.totHp)*100)+"%");
				}
				else {
					Combat.fight(atk, def3);
					$(".atkHPbar").css("width", Math.floor((atk.hp/atk.totHp)*100)+"%");
					$(".defHPbar3").css("width", Math.floor((def3.hp/def3.totHp)*100)+"%");
				}
			});
		}
		else {
			$("#atkBtn").css("opacity", 0.5);
		}
	}

}

//Game object - all functions pertaining to game creation and flow
var Game = {
	directions: "",
	combatants: ["bulbasaur", "charmander", "squirtle", "pikachu"],

	drawBoard: function(){
		//Create fighter portraits
		for(var i = 0; i < Game.combatants.length; i++){
			var fighter = $("<div>");
			fighter.addClass("fighter");
			fighter.attr("id", Game.combatants[i]);
			fighter.data("data-obj", objects[i]);
			fighter.text(Game.combatants[i]);
			$("#fighters").append(fighter);
		};

		//Health bars
		var atkrHp = $("<div>");
		atkrHp.addClass("health atkHP");
		$("#hp").append(atkrHp);
		var atkBar = $("<div>");
		atkBar.addClass("prcntBar atkHPbar");
		$(".atkHP").append(atkBar);
		var spacer = $("<div>");
		spacer.addClass("health space");
		$("#hp").append(spacer);
		var defHp;
		var defBar;
		for(var i = 1; i < 4; i++){
			defHp = $("<div>");
			defHp.addClass("health defHP"+i);
			$("#hp").append(defHp);
			defBar = $("<div>");
			defBar.addClass("prcntBar defHPbar"+i);
			$(".defHP"+i).append(defBar);
		};

		//Create combat line-up
		var attacker = $("<div>");
		attacker.addClass("lineup");
		attacker.attr("id", "atkr");
		attacker.text("Your character");
		$("#combat").append(attacker);
		var versus = $("<div>");
		versus.addClass("vs lineup");
		versus.text("Get ready to fight!");
		$("#combat").append(versus);
		var defender;
		for(var j = 1; j < 4; j++){
			defender = $("<div>");
			defender.addClass("lineup");
			defender.attr("id", "def"+j)
			defender.text("Defender #"+j);
			$("#combat").append(defender);
		};

		//Create combat controls
		var atkBtn = $("<button>");
		atkBtn.addClass("btn btn-warning cntrls");
		atkBtn.attr("id", "atkBtn");
		atkBtn.text("Attack");
		$("#controls").append(atkBtn);
		var rstBtn = $("<button>");
		rstBtn.addClass("btn btn-danger cntrls");
		rstBtn.attr("id", "rstBtn");
		rstBtn.text("Reset");
		$("#controls").append(rstBtn);
	},


	pickAtkr: function(){
		//Print directions to screen
		directions = "Select which fighter you would like as your character.";
		$("#directions").text(directions);
		$("#controls").css("opacity", 0.5);
		$("#hp").css("opacity", 0.5);

		$(".fighter").on("click", function() {
			$("#controls").css("opacity", 1);
			$("#hp").css("opacity", 1);
			atkGlobal = $(this).data("data-obj");
			$("#atkr").html(this);	
			$(".fighter").off();
			Game.pickDef1();
		});
	},

	pickDef1: function(){
		//Print directions to screen
		directions = "Select the first defender. The order may mean life or death!";
		$("#directions").text(directions);
		$(".fighter").on("click", function() {
			defGlobal1 = $(this).data("data-obj");
			$("#def1").html(this);	
			$(".fighter").off();
			Game.pickDef2();
		});
	},

	pickDef2: function(){
		//Print directions to screen
		directions = "Select the second defender. The order may mean life or death!";
		$("#directions").text(directions);
		$(".fighter").on("click", function() {
			defGlobal2 = $(this).data("data-obj");
			$("#def2").html(this);	
			$(".fighter").off();
			Game.pickDef3();
		});
	},

	pickDef3: function(){
		//Print directions to screen
		directions = "Select the last defender. The order may mean life or death!";
		$("#directions").text(directions);
		$(".fighter").on("click", function() {
			defGlobal3 = $(this).data("data-obj");
			$("#def3").html(this);	
			$(".fighter").off();
			Combat.battle(atkGlobal, defGlobal1, defGlobal2, defGlobal3);
		});
	},

	

	newGame: function(){
		Game.drawBoard();
		Game.pickAtkr();
	}
}


$(document).ready(function() {

var chrm = ["Charmander", 200, 200, 50, 50, 60];
var sqrt = ["Squirtle", 270, 270, 35, 35, 50];
var bulb = ["Bulbasaur", 350, 350, 20, 20, 40];
var pika = ["Pikachu", 250, 250, 40, 40, 80];

charmander = new Fighter(chrm);
squirtle = new Fighter(sqrt);
bulbasaur = new Fighter(bulb);
pikachu = new Fighter(pika);

objects = [bulbasaur, charmander, squirtle, pikachu];

Game.newGame();	


});