// available colors
var buttonColors = ["red", "blue", "green", "yellow"];
// variable to indicate if game started
var gameStart = false;
// variable to store the generated sequence
var gameSequence = [];
// variable to store user sequence
var userSequence = [];

// event listener to start the game
$(document).on("keypress", function () {
  if (!gameStart) {
    gameStart = true;
    getRandomColor();
  }
});

// event listener to get user color and check against game sequence
$(".btn").on("click", function () {
  if (gameStart) {
    var userChosenColor = this.id;
    userSequence.push(userChosenColor);
    animateUserChosenColor(userChosenColor);
    if (isValidUserSequence()) {
      if (gameSequence.length === userSequence.length) {
        setTimeout(function () {
          getRandomColor();
        }, 1000);
        userSequence = [];
      }
    } else {
      gameOver();
    }
  }
});

// reset variable values once game-over
function reset() {
  gameStart = false;
  gameSequence = [];
  userSequence = [];
}

// game-over
function gameOver() {
  playAudio("wrong");
  $("#level-title").text("Game Over, Press Any Key to Restart");
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
  reset();
}

// play audio
function playAudio(color) {
  var audio = new Audio("./sounds/" + color + ".mp3");
  audio.play();
}

// animate and play user color audio
function animateUserChosenColor(color) {
  playAudio(color);
  $("#" + color).addClass("pressed");
  setTimeout(function () {
    $("#" + color).removeClass("pressed");
  }, 100);
}

// generate random color and push it to the game sequence
function getRandomColor() {
  var randomColor = buttonColors[Math.floor(Math.random() * 4)];
  playAudio(randomColor);
  $("." + randomColor)
    .fadeOut(100)
    .fadeIn(100);
  gameSequence.push(randomColor);
  $("#level-title").text("Level " + gameSequence.length);
}

// validate if the user sequence matches game sequence
function isValidUserSequence() {
  for (i = 0; i < userSequence.length; i++) {
    if (gameSequence[i] != userSequence[i]) {
      return false;
    }
  }
  return true;
}
