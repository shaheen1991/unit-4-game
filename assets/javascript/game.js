
var characterSelected = false;
var defenderSelected = false;
var character = {};
var defender = {};
var enemiesDefeated = 0;
gameOver = false;

// ----- Character Objects ----- //

var obiWanKenobi = {
  name: "Obi-Wan Kenobi",
  health: 120,
  baseAttack: 8,
  attack: 8
};

var lukeSkywalker = {
  name: "Luke Skywalker",
  health: 100,
  baseAttack: 5,
  attack: 5
};

var darthSidious = {
  name: "Darth Sidious",
  health: 150,
  baseAttack: 20,
  attack: 20
};

var darthMaul = {
  name: "Darth Maul",
  health: 180,
  baseAttack: 25,
  attack: 25
};

// ----- Functions ----- //

// Initialize the character value from the global object
function initializeCharacter(chosenCharacter) {
  character.name = chosenCharacter.name;
  character.health = chosenCharacter.health;
  character.baseAttack = chosenCharacter.baseAttack;
  character.attack = chosenCharacter.attack;
}

// Initialize the enemy's value from the global object
function initializeDefender(chosenDefender) {
  defender.name = chosenDefender.name;
  defender.health = chosenDefender.health;
  defender.baseAttack = chosenDefender.baseAttack;
  defender.attack = chosenDefender.attack;
}

// Move the remaining characters to the enemies section
function moveToEnemies() {
  $(".available-character").removeClass("available-character").addClass("enemy-character");
  $("#enemies-available").append($(".enemy-character"));
}

// Reset the state of the game. Reset all the health values to the original
function resetGame() {
  $("#obi-wan-kenobi-character").children(".health").html(obiWanKenobi.health);
  $("#luke-skywalker-character").children(".health").html(lukeSkywalker.health);
  $("#darth-sidious-character").children(".health").html(darthSidious.health);
  $("#darth-maul-character").children(".health").html(darthMaul.health);

  $(".character-image").removeClass("chosen-character enemy-character defender-character").addClass("available-character");
  var available = $(".available-character").show();
  $("#characters-available").html(available);

  $("#game-message").empty();
  $("#restart").hide();

  characterSelected = false;
  defenderSelected = false;
  enemiesDefeated = 0;
  gameOver = false;

  character = {};
  defender = {};
}

// ----- Main Routine ----- //

$(document).ready(function() {

  $("#restart").hide();


  // Determine which character the user has clicked
  $("#obi-wan-kenobi-character").on("click", function () {

    // User is choosing the character
    if(characterSelected == false) {
      $("#game-message").empty();

      // Set the user's character
      initializeCharacter(obiWanKenobi);
      characterSelected = true;

      // Display the chosen character
      $("#obi-wan-kenobi-character").removeClass("available-character").addClass("chosen-character");
      $("#chosen-character").append(this);

      // Move the remaining characters to the enemies section
      moveToEnemies();
    } else if ((characterSelected == true) && (defenderSelected == false)) {
      // User is choosing the defender
      if($("#obi-wan-kenobi-character").hasClass("enemy-character")) {
        $("#game-message").empty();

        // Set the user's enemy
        initializeDefender(obiWanKenobi);
        defenderSelected = true;

        // Add the character to the defender section
        $("#obi-wan-kenobi-character").removeClass("enemy-character").addClass("defender-character");
        $("#defender-section").append(this);
      }
    }
  });


/////////////////
  $("#luke-skywalker-character").on("click", function () {

    if(characterSelected == false) {
      $("#game-message").empty();

      initializeCharacter(lukeSkywalker);
      characterSelected = true;

      $("#luke-skywalker-character").removeClass("available-character").addClass("chosen-character");
      $("#chosen-character").append(this);

      moveToEnemies();
    } else if ((characterSelected == true) && (defenderSelected == false)) {
      if($("#luke-skywalker-character").hasClass("enemy-character")) {
        $("#game-message").empty();

        initializeDefender(lukeSkywalker);
        defenderSelected = true;

        $("#luke-skywalker-character").removeClass("enemy-character").addClass("defender-character");
        $("#defender-section").append(this);
      }
    }
  });

//////////////
  $("#darth-sidious-character").on("click", function () {

    if(characterSelected == false) {
      $("#game-message").empty();

      initializeCharacter(darthSidious);
      characterSelected = true;

      $("#darth-sidious-character").removeClass("available-character").addClass("chosen-character");
      $("#chosen-character").append(this);

      moveToEnemies();
    } else if ((characterSelected == true) && (defenderSelected == false)) {
      if($("#darth-sidious-character").hasClass("enemy-character")) {
        $("#game-message").empty();

        initializeDefender(darthSidious);
        defenderSelected = true;

        $("#darth-sidious-character").removeClass("enemy-character").addClass("defender-character");
        $("#defender-section").append(this);
      }
    }
  });


/////////////
  $("#darth-maul-character").on("click", function () {

    if(characterSelected == false) {
      $("#game-message").empty();

      initializeCharacter(darthMaul);
      characterSelected = true;

      $("#darth-maul-character").removeClass("available-character").addClass("chosen-character");
      $("#chosen-character").append(this);

      moveToEnemies();
    } else if ((characterSelected == true) && (defenderSelected == false)) {
      if($("#darth-maul-character").hasClass("enemy-character")) {
        $("#game-message").empty();

        initializeDefender(darthMaul);
        defenderSelected = true;

        $("#darth-maul-character").removeClass("enemy-character").addClass("defender-character");
        $("#defender-section").append(this);
      }
    }
  });

     // attack
  $("#attack").on("click", function() {

    // User is ready to attack the defender
    if (characterSelected && defenderSelected && !gameOver) {
      defender.health = defender.health - character.attack;
      $(".defender-character").children(".health").html(defender.health);
      $("#game-message").html("<p>You attacked " + defender.name + " for " + character.attack + " damage.<p>");

      // User's attack power increases
      character.attack = character.attack + character.baseAttack;

      // If defender is still alive, they counter attack the user
      if (defender.health > 0) {
        character.health = character.health - defender.baseAttack;
        $(".chosen-character").children(".health").html(character.health);

        // Check if the user survives the attack
        if (character.health > 0) {
          $("#game-message").append("<p>" + defender.name + " attacked you back for " + defender.baseAttack + " damage.</p>");
        } else {
          gameOver = true;
          $("#game-message").html("<p>You were defeated... womp womp...</p><p>Play again?</p>");
          $("#restart").show();
        }
      } else {
        // Defender is defeated
        enemiesDefeated++;
        defenderSelected = false;
        $("#game-message").html("<p>You have defeated " + defender.name + ". Choose another enemy.</p>");
        $(".defender-character").hide();

        // Check if the user has won the game
        if (enemiesDefeated === 3) {
          gameOver = true;
          $("#game-message").html("<p>You have won the game!!!</p><p>Play again?</p>");
          $("#restart").show();
        }
      }
    } else if (!characterSelected && !gameOver) {
      $("#game-message").html("<p>You must first select your game character.</p>");
    } else if (!defenderSelected && !gameOver) {
      $("#game-message").html("<p>You must choose an enemy to fight.</p>");
    }

  });

  $("#restart").on("click", function() {
    resetGame();
  });

});