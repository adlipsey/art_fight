function Fighter([name, hp, atkPwr, baseAtk, cntrPwr]){
	this.name = name;
	this.hp = hp;
	this.atkPwr = atkPwr;
	this.baseAtk = baseAtk;
	this.cntrPwr = cntrPwr;
}

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
		if(atk.hp > 0){
			//On-click event for attack button causes:
			if(def1.hp > 0) {
				Combat.fight(atk, def1);
			}
			else if(def2.hp > 0){
				Combat.fight(atk, def2);
			}
			else {
				Combat.fight(atk, def3);
			}
		}
		else {
			//Grey out attack button
		}
	}

}

var Game = {
	directions: "",
	combatants: ["bulbasaur", "charmander", "squirtle", "pikachu"],

	drawBoard: function(){
		//Print directions to screen
		directions = "Please choose one of the combatants below to attack for you.";
		$("#directions").text(directions);
		$("#combat").css("opacity", 0.5);
		$("#controls").css("opacity", 0.5);
		$("#hp").css("opacity", 0.5);

		//Create fighter portraits
		for(var i = 0; i < Game.combatants.length; i++){
			var fighter = $("<div>");
			fighter.addClass("fighter");
			fighter.attr("id", Game.combatants[i]);
			fighter.text(Game.combatants[i]);
			$("#fighters").append(fighter);
		};

		//Health bars
		var atkrHp = $("<div>");
		atkrHp.addClass("health atkHP");
		$("#hp").append(atkrHp);
		var spacer = $("<div>");
		spacer.addClass("health space");
		$("#hp").append(spacer);
		var defHp;
		for(var i = 1; i < 4; i++){
			defHp = $("<div>");
			defHp.addClass("health defHP"+i);
			$("#hp").append(defHp);
		};

		//Create combat line-up
		var attacker = $("<div>");
		attacker.addClass("atkr lineup");
		$("#combat").append(attacker);
		var versus = $("<div>");
		versus.addClass("vs lineup");
		$("#combat").append(versus);
		var defender;
		for(var i = 1; i < 4; i++){
			defender = $("<div>");
			defender.addClass("lineup def"+i);
			$("#combat").append(defender);
		};

		//Create combat controls
		var atkBtn = $("<button>");
		atkBtn.addClass("btn btn-warning cntrls");
		atkBtn.text("Attack");
		$("#controls").append(atkBtn);
		var rstBtn = $("<button>");
		rstBtn.addClass("btn btn-danger cntrls");
		rstBtn.text("Reset");
		$("#controls").append(rstBtn);




	},


	pickAtkr: function(){
		



	},
}






$(document).ready(function() {
Game.drawBoard();	

/*var charmander = ["Charmander", 200, 50, 50, 60];
var squirtle = ["Squirtle", 270, 35, 35, 50];
var bulbasaur = ["Bulbasaur", 350, 20, 20, 40];
var pikachu = ["Pikachu", 250, 40, 40, 80];

var chrm = new Fighter(charmander);
var sqrt = new Fighter(squirtle);
var bulb = new Fighter(bulbasaur);
var pika = new Fighter(pikachu);

Combat.fight(bulb,sqrt);
Combat.fight(bulb,sqrt);
Combat.fight(bulb,sqrt);
Combat.fight(bulb,sqrt);
Combat.fight(bulb,sqrt);
Combat.fight(bulb,chrm);
Combat.fight(bulb,chrm);
Combat.fight(bulb,pika);
Combat.fight(bulb,pika);*/

});