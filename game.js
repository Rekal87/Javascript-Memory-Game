// creating a array with 4 elements
var buttonColors = ["red", "blue", "green", "yellow"];
// creating a empty array
var gamePattern = [];

var userClickedPattern = [];
// users level as you progress through the game
var level = 0;
// checks if the game has started, if false waits for user imput
var started = false;

// waits for keypress from user to start the game, changes the h1 title & runs the sequence of the game

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    // changes the boolean to true to keep the game running
    started = true;
  }
})

function checkAnswer(currentLevel) {
  // if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern.
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {


    // checking if user has finished their sequence
    if (userClickedPattern.length === gamePattern.length) {
      // sets a timeout before next function is called
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("h1").text("Game Over, Press Any Key to Restart")
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}


function nextSequence() {

  //6. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);
  // generate a random number between 0 - 4
  var randomNumber = Math.floor(Math.random() * 4);

  // choose a color from buttonColors array with the random generated number and set it to a variable
  var randomChosenColor = buttonColors[randomNumber];

  // use the variable to push the selected color into a different array
  gamePattern.push(randomChosenColor);
  // jQuery select button with ID(#): equal to the random chsen color, and do a animation with it
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  var audio = new Audio("sounds/" + randomChosenColor + ".mp3");
  audio.play();
}
//click event lisneter to all btn elements
$(".btn").click(function(e) {
  // elements target id to find what button got pushed and set it to a variable
  var userChosenColor = e.target.id;
  // push the user button patterns into the array
  userClickedPattern.push(userChosenColor);
  // run the fucntion playSound with user chosen color as parameter
  playSound(userChosenColor);
  // run the function animatePress with user chosen color as parameter
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
  //init a audio file nad play the sound depending on what user button is pushed with name as paratmeter
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  // selects the current color as ID and adds a new CSS class to the element making it look like it animates with a time delay
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}