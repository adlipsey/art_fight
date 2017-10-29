//Global variables in the event they are needed
var charmander; //Will hold object instance data
var pikachu;	//	|
var squirtle;	//	|
var bulbasaur;	//	<
var objects;	//Will be array for above objects
var atkGlobal = null; //Will catch object data from onclicks, 
var defGlobal1 = null;//	|
var defGlobal2 = null;//	V
var defGlobal3 = null;//	Set to null so they trigger false in if-statements

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
	atkText: "",
	cntrText: "",
	winText: "",

	//Function defining the Attack ability of the attacker
	attack: function(atk, def) {
		//Defender HP dropped by amount equal to attack power
		def.hp -= atk.atkPwr;
		//Attack combat message assigned to object property
		Combat.atkText = atk.name + " attacked " + def.name + " for " + atk.atkPwr + " damage.";
		//Attack power increased by base amount
		atk.atkPwr += atk.baseAtk;
	},

	//Function defining the Counter Attack ability of the defenders
	counter: function(atk, def) {
		atk.hp -= def.cntrPwr;
		//Attacker HP drops by # equal to counter attack power (which stays static)
		Combat.cntrText = def.name + " counter attacked for " + def.cntrPwr + " damage.";
	},

	//Function that combines the Attack and Counter Attack functions into 1 round of combat
	fight: function(atk, def) {
		//Resets conditional combat text
		Combat.winText = "";
		Combat.cntrText = "";
		//Triggers an attack from attacker
		Combat.attack(atk, def);
		//Assigns the defender's HP value to the text on their portrait div in place of their name
		$("#"+def.name.toLowerCase()).text(def.hp  + " HP");
		//If defender is not killed by attack...
		if(def.hp > 0){
			//...then they counter attack
			Combat.counter(atk, def);
			//If attacker HP is brought below 0 by counter, they lose, game exits logic flow
			if(atk.hp <= 0){
				$("#"+atk.name.toLowerCase()).text(atk.hp  + " HP");
				Combat.winText = "You have been defeated.";
				$("#"+atk.name.toLowerCase()).css("background","url(\"./assets/images/skull.png\") center no-repeat");
				$("#"+atk.name.toLowerCase()).css("background-size","cover");
				//Fades out over 2 sec
				$("#"+atk.name.toLowerCase()).animate({opacity: 0.5}, 2000);
				$("#fighters").html("<p>"+Combat.atkText +"</p><p>"+Combat.cntrText+"</p><p>"+Combat.winText+"</p>");
				return;
			}
		}
		//If defender is killed by attack...
		else {
			//...they can't counter, attacker wins
			Combat.winText = atk.name + " Wins!";
			//Changes background image to skull and crossbones
			$("#"+def.name.toLowerCase()).css("background","url(\"./assets/images/skull.png\") center no-repeat");
			$("#"+def.name.toLowerCase()).css("background-size","cover");
			//Fades out over 2 sec
			$("#"+def.name.toLowerCase()).animate({opacity: 0.5}, 2000);
			//Win Condition: Checks if all defenders have been defeated
			if((defGlobal1.hp <= 0) && (defGlobal2.hp <= 0) && (defGlobal3.hp <= 0)){
				//Display win message
				Game.directions = "Congratulations!!!! You won!!!!"
				$("#directions").text(Game.directions);
				//Changes character portrait to silly gif of corresponding file name
				$("#"+atk.name.toLowerCase()).css("background","url(\"./assets/images/"+atk.name.toLowerCase()+".gif\") center no-repeat");
				//Fades out attack button and removes onclick functionality
				$("#atkBtn").css("opacity", 0.5);
				$("#atkBtn").off();
			}
		}
		//Assigns the attacker's HP value to the text on their portrait div in place of their name
		$("#"+atk.name.toLowerCase()).text(atk.hp  + " HP");
		//Displays text to where the fighter portraits started consisting of results of Attack and Counter Attack and if a fighter was defeated.
		$("#fighters").html("<p>"+Combat.atkText +"</p><p>"+Combat.cntrText+"</p><p>"+Combat.winText+"</p>");
	},

	battle: function(atk, def1, def2, def3) {
		Game.directions = "Now it's time to attack! Click the attack button until you defeat all your opponents. May the best drawing win!";
		$("#directions").text(Game.directions);
		$(".vs").text("Fight!");
		//If the attacker is not dead...
		if(atk.hp > 0){
			//...will trigger on Attack button press...
			$("#atkBtn").on("click", function () {
				//... a fight between atk and def1 if def1 isn't dead
				if(def1.hp > 0) {
					Combat.fight(atk, def1);
					//Adjusts width of HP bars based on % of health remaining
					$(".atkHPbar").animate({width: Math.floor((atk.hp/atk.totHp)*100)+"%"}, 1000);
					$(".defHPbar1").animate({width: Math.floor((def1.hp/def1.totHp)*100)+"%"}, 1000);
				}
				//... a fight between atk and def2 if def2 isn't dead
				else if(def2.hp > 0){
					Combat.fight(atk, def2);
					//Adjusts width of HP bars based on % of health remaining
					$(".atkHPbar").animate({width: Math.floor((atk.hp/atk.totHp)*100)+"%"}, 1000);
					$(".defHPbar2").animate({width: Math.floor((def2.hp/def2.totHp)*100)+"%"}, 1000);
				}
				//... a fight between atk and def3 if def3 isn't dead
				else {
					Combat.fight(atk, def3);
					//Adjusts width of HP bars based on % of health remaining
					$(".atkHPbar").animate({width: Math.floor((atk.hp/atk.totHp)*100)+"%"}, 1000);
					$(".defHPbar3").animate({width: Math.floor((def3.hp/def3.totHp)*100)+"%"}, 1000);
				}
				//If at any time attacker HP is less than or equal to 0, fades out button, removes button functionality, exits game flow
				if(atk.hp <= 0) {
					$("#atkBtn").css("opacity", 0.5);
					$("#atkBtn").off();
					return;
				}
			});
		}
	}

}

//Game object - all functions pertaining to game creation and flow
var Game = {
	directions: "",
	combatants: ["bulbasaur", "charmander", "squirtle", "pikachu"],

	//Function that creates all the HTML elements needed for the game
	drawBoard: function(){
		//Iterates through array, creating div for each fighter, assigning an id based on name...
		for(var i = 0; i < Game.combatants.length; i++){
			var fighter = $("<div>");
			fighter.addClass("fighter");
			fighter.attr("id", Game.combatants[i]);
			//...and object data from array of objects below, CRUICIAL for getting fighter data from onclick
			fighter.data("data-obj", objects[i]);
			fighter.text(Game.combatants[i]);
			$("#fighters").append(fighter);
		};

		//Health bars
		//Attacker HP outer div
		var atkrHp = $("<div>");
		atkrHp.addClass("health atkHP");
		$("#hp").append(atkrHp);
		//Attacker green bar that scales with % health
		var atkBar = $("<div>");
		atkBar.addClass("prcntBar atkHPbar");
		$(".atkHP").append(atkBar);
		//Spacer div under the VS symbol
		var spacer = $("<div>");
		spacer.addClass("health space");
		$("#hp").append(spacer);
		//Iterates 3 times creating defender HP divs
		var defHp;
		var defBar;
		for(var i = 1; i < 4; i++){
			//Outer div
			defHp = $("<div>");
			defHp.addClass("health defHP"+i);
			$("#hp").append(defHp);
			//Inner green bar
			defBar = $("<div>");
			defBar.addClass("prcntBar defHPbar"+i);
			$(".defHP"+i).append(defBar);
		};

		//Create combat line-up
		//Div for attacker
		var attacker = $("<div>");
		attacker.addClass("lineup");
		attacker.attr("id", "atkr");
		attacker.text("Your character");
		$("#combat").append(attacker);
		//Div for VS image
		var versus = $("<div>");
		versus.addClass("vs lineup");
		versus.text("Get ready to fight!");
		$("#combat").append(versus);
		//Iterates 3 times, creating defender divs with 1-3 assigned to them
		var defender;
		for(var j = 1; j < 4; j++){
			defender = $("<div>");
			defender.addClass("lineup");
			defender.attr("id", "def"+j)
			defender.text("Defender #"+j);
			$("#combat").append(defender);
		};

		//Create combat control elements
		//Attack button
		var atkBtn = $("<button>");
		atkBtn.addClass("btn btn-warning cntrls");
		atkBtn.attr("id", "atkBtn");
		atkBtn.text("Attack");
		$("#controls").append(atkBtn);
		//Reset button
		var rstBtn = $("<button>");
		rstBtn.addClass("btn btn-danger cntrls justify-content-end");
		rstBtn.attr("id", "rstBtn");
		rstBtn.text("Reset");
		$("#controls").append(rstBtn);
	},

	//Picks the attacking character
	pickAtkr: function(){
		//Print directions to screen
		directions = "Select which fighter you would like as your character.";
		$("#directions").text(directions);
		//Temporarily fades-out Buttons until attacker is chosen
		$("#controls").css("opacity", 0.5);
		//On click, unfades controls, sets target to attacker and moves portrait
		$(".fighter").on("click", function() {
			$("#controls").css("opacity", 1);
			atkGlobal = $(this).data("data-obj");
			$("#atkr").replaceWith(this);	
			$(".fighter").off();
			Game.pickDef1();
		});
	},

	//Picks defender #1
	pickDef1: function(){
		//Print directions to screen
		directions = "Select the first defender. The order may mean life or death!";
		$("#directions").text(directions);
		$(".fighter").on("click", function() {
			if($(this).data("data-obj") === atkGlobal){
				//Do nothing if selection has already been assigned
			}
			else {
				//Otherwise, set as defender 1 and move fighter portrait
				defGlobal1 = $(this).data("data-obj");
				$("#def1").replaceWith(this);	
				$(".fighter").off();
				Game.pickDef2();
			}
		});
	},

	//Picks defender #2
	pickDef2: function(){
		//Print directions to screen
		directions = "Select the second defender. The order may mean life or death!";
		$("#directions").text(directions);
		$(".fighter").on("click", function() {
			if($(this).data("data-obj") === atkGlobal || $(this).data("data-obj") === defGlobal1){
				//Do nothing if selection has already been assigned
			}
			else {
				//Otherwise, set as defender 2 and movr fighter portrait
				defGlobal2 = $(this).data("data-obj");
				$("#def2").replaceWith(this);	
				$(".fighter").off();
				Game.pickDef3();
			}
		});
	},

	//Picks defender #3
	pickDef3: function(){
		//Print directions to screen
		directions = "Select the last defender. The order may mean life or death!";
		$("#directions").text(directions);
		$(".fighter").on("click", function() {
			if($(this).data("data-obj") === atkGlobal || $(this).data("data-obj") === defGlobal1 || $(this).data("data-obj") === defGlobal2){
				//Do nothing if selection has already been assigned
			}
			else {
				//Otherwise, set as defender 3, move portrait, and call Combat.battle
				defGlobal3 = $(this).data("data-obj");
				$("#def3").replaceWith(this);	
				$(".fighter").off();
				Combat.battle(atkGlobal, defGlobal1, defGlobal2, defGlobal3);
			}
		});
	},

	
	//Initiates a new game
	newGame: function(){
		Game.drawBoard();
		Game.pickAtkr();
		//The rest of the game functions are called in sequence from pickAtkr()

	}
}


$(document).ready(function() {
	//Arrays holding fighter stats
	var chrm = ["Charmander", 200, 200, 50, 50, 60];
	var sqrt = ["Squirtle", 270, 270, 35, 35, 50];
	var bulb = ["Bulbasaur", 350, 350, 20, 20, 40];
	var pika = ["Pikachu", 230, 230, 37, 37, 80];
	//Object instances made from above arrays
	charmander = new Fighter(chrm);
	squirtle = new Fighter(sqrt);
	bulbasaur = new Fighter(bulb);
	pikachu = new Fighter(pika);
	//Array of above objects for assigning as "data-obj" to fighter portrait divs
	objects = [bulbasaur, charmander, squirtle, pikachu];
	//Begins a game
	Game.newGame();
	//Lazy man's reset button: reloads the page
	$("#rstBtn").on("click", function() {
		window.location.reload();
	});

});