//Drawing variables
var canvas;
var ctx;
var canvasBackground = new Image();
var canvasScrollingWidth = 1280;
var grassBackground = new Image();
var pipe = new Image();
var signNext = new Image();
var signPrev = new Image();
var normalSignNext = new Image();
var normalSignPrev = new Image();
var invisibleBorders = new Image();
var speakEasyPassword = "1929";

//Input variables
var upKey;
var rightKey;
var downkey;
var leftKey;

//Game variables
var gameLoop;
var player;
var bodyguard;
var all_borders;
var isJumpPossible;
var maxJumpTime = 250; //in milliseconds
var startingY;
var audio = new Audio('assets/music.mp3');

//Levels variables
var currentLevel = 0;

//Images
var crisi = new Image();
crisi.src = "assets/wallace.jpeg";
var wallace1 = new Image();
wallace1.src = "assets/wallace.jpeg";
var wallace2 = new Image();
wallace2.src = "assets/wallace2.jpg";
var alCapone = new Image();
alCapone.src = "assets/alcapone.png";
var gangster = new Image();
gangster.src = "assets/alcapone.png";
var proibizionismo = new Image();
proibizionismo.src = "assets/alcapone.png";
var ticker = new Image();
ticker.src = "assets/ticker.png";
var wallstreet = new Image();
wallstreet.src = "assets/wallstreet.jpg";
var martedinero = new Image();
martedinero.src = "assets/martedinero1.jpg";
var flappers = new Image();
flappers.src = "assets/flappers.jpg";
var flappers2 = new Image();
flappers2.src = "assets/flappers2.jpg";
var femminismo = new Image();
femminismo.src = "assets/womenvote.jpg";
var imagesPresentation = [crisi, wallace1, wallace2, alCapone, gangster, proibizionismo, ticker, wallstreet, martedinero, flappers2, flappers, femminismo];

var crisiJournal = new Image();
crisiJournal.src = "assets/wallacejournal1.png";
var wallaceJournal1 = new Image();
wallaceJournal1.src = "assets/wallacejournal1.png";
var wallaceJournal2 = new Image();
wallaceJournal2.src = "assets/wallacejournal2.png";
var alCaponeJournal = new Image();
alCaponeJournal.src = "assets/alcaponejournal.png";
var gangsterJournal = new Image();
gangsterJournal.src = "assets/alcaponejournal.png";
var proibizionismoJournal = new Image();
proibizionismoJournal.src = "assets/alcaponejournal.png";
var tickerJournal = new Image();
tickerJournal.src = "assets/tickerjournal.png";
var wallstreetJournal = new Image();
wallstreetJournal.src = "assets/wallstreetJournal.png";
var martedineroJournal = new Image();
martedineroJournal.src = "assets/martedineroJournal.png";
var flappersJournal1 = new Image();
flappersJournal1.src = "assets/flappersjournal1.png";
var flappersJournal2 = new Image();
flappersJournal2.src = "assets/flappersjournal2.png";
var femminismoJournal = new Image();
femminismoJournal.src = "assets/flappersjournal2.png";
var wall = [crisiJournal, wallaceJournal1, wallaceJournal2, alCaponeJournal, gangsterJournal, proibizionismoJournal, tickerJournal,wallstreetJournal,martedineroJournal, flappersJournal1, flappersJournal2, femminismoJournal];


//Run once page has loaded
window.onload = function () {
  document.getElementsByTagName("h2")[0].innerText = subtitles[currentLevel];
  //Assign canvas and ctx variables
  audio.volume = 0.2;
  canvas = document.getElementById("game-canvas");
  ctx = canvas.getContext("2d");
  ctx.fillStyle = "black";
  ctx.font = "bold 16px Arial";

  //Setup key listeners
  setupInputs();

  //Create borders
  all_borders = new Borders();
  all_borders.newBorder(0, 620, 1280, 720, 1);
  all_borders.newBorder(600, 520, 100, 100, 2);

  //Create Player
  player = new Player(300,400, all_borders);
  bodyguard = new Bodyguard(1105, 450, player);

  //Game loop
  gameLoop = setInterval(step, 1000/60);
}

function step() {
  //Player step
  player.step();

  checkBordersCollisions(player);

  //Draw everything
  draw();

  //Check if player is on ground
  checkPos(player).then((check) => {
    isJumpPossible = check;
  });

  //Only allow jump for x seconds
  if(isJumpPossible && upKey) {
    setTimeout(() => {
      isJumpPossible = false;
      upKey = false;
    }, maxJumpTime);
  }

  //Avoid fly bug
  if(player.y < 250){
    isJumpPossible = false;
    upKey = false;
  }

  //Set ground y
  if(player.x > 550 && player.x <= 700) {
    startingY = 420;
  } else {
    startingY = 520;
  }

  //Hide password input when it isn't used
  if(currentLevel < 2){
    document.getElementById("password").classList.add("invisible");
    document.getElementById("password").classList.remove("visible");
  }
  else {
    document.getElementById("password").classList.remove("invisible");
    document.getElementById("password").classList.add("visible");
  }


}

function draw() {
  //Draw canvas background
  canvasBackground.src = "assets/bg1.jpg";
  ctx.drawImage(canvasBackground, 0, 0, 1280, 720);

  //Draw signs
  signNext.src = "assets/signwhite.png";
  signPrev.src = "assets/signrevwhite.png";
  normalSignNext.src = "assets/normalsign.png"
  normalSignPrev.src = "assets/normalsignrev.png"

  if(currentLevel + 1 < paragraphs.length && currentLevel >= 2)
    ctx.drawImage(signNext, 1100, 490, 150, 150);
  else if(currentLevel == 0 || currentLevel == 1)
    ctx.drawImage(normalSignNext, 1100, 490, 150, 150);
  if(currentLevel > 2)
    ctx.drawImage(signPrev, 30, 490, 150, 150);
  else if(currentLevel > 0 && currentLevel <= 2)
    ctx.drawImage(normalSignPrev, 30, 490, 150, 150);

  //Draw Player
  player.draw();

  //Draw borders
  all_borders.allBorders.forEach(border => border.draw());

  //Show text when on signs for better ux
  if(player.x >= 1100 && currentLevel >= 0 && currentLevel + 1 < paragraphs.length) {
    ctx.fillStyle = "white";
    ctx.fillText("Premi invio per andare", 1100, 450, 120);
    ctx.fillText("al livello successivo", 1110, 470, 100);
  } else if(player.x <= 150 && currentLevel >= 1) {
    ctx.fillStyle = "white";
    ctx.fillText("Premi invio per andare", 50, 450, 120);
    ctx.fillText("al livello precedente", 60, 470, 100);
  }

  //Show text when on pipe
  wall.src = "assets/journal.png";
  if(player.x >= 551 && player.x < 700) {
    ctx.drawImage(wall[currentLevel], 10, 10, 850, 450);
    ctx.drawImage(imagesPresentation[currentLevel], ((canvas.width / 5)+550), 35, 400, 450);
  }

  //Draw standing bodyguard if on the second Levels
  if (currentLevel == 2) {
    bodyguard.draw();
    if (player.x >= 1100 && bodyguard.alredyPushed == 0){
      console.log("bbbbbb");
      bodyguard.enter();
    }
  } else {

  }
}

function setupInputs() {
  //Listener for when a key is pressed
  document.addEventListener("keydown", function(event){
    audio.play();
    if ((event.key === "w" || event.key === "ArrowUp") && isJumpPossible) {
        upKey = true;
    } else if (event.key === "a" || event.key === "ArrowLeft") {
      leftKey = true;
    } else if (event.key === "s" || event.key === "ArrowDown") {
      downKey = true;
    } else if (event.key === "d" || event.key === "ArrowRight") {
      rightKey = true;
    }
  });

  //Listener for when a key is no more pressed
  document.addEventListener("keyup", function(event){
    if (event.key === "w" || event.key === "ArrowUp") {
      upKey = false;
    } else if (event.key === "a" || event.key === "ArrowLeft") {
      leftKey = false;
    } else if (event.key === "s" || event.key === "ArrowDown") {
      downKey = false;
    } else if (event.key === "d" || event.key === "ArrowRight") {
      rightKey = false;
  }});
  //Listener for the ENTER key
  document.addEventListener("keypress", function(event) {
    //Check for enter key press
    if (event.keyCode === 13) {
      //if player is on signs
      if(player.x >= 1100) {
          if (checkSpeakEasyPassword()) {
            changeLevel(player, "next");
            document.activeElement.blur();
          } else {
            alert("Per entrare negli SpeakEasy devi inserire la password corretta");
            document.getElementById("password").value = "";
            document.getElementById("password").focus();
            upKey = downkey = leftKey = rightKey = false;
          }
      } else if(player.x <= 150) {
        changeLevel(player, "prev");
      }
    }
  });

}

//Check for intersections between objects
function checkIntersection (r1, r2) {
  if (r1.x > r2.x + r2.width) {
    return false;
  } else if (r1.x + r1.width <= r2.x) {
    return false;
  } else if (r1.y >= r2.y + r2.height) {
    return false;
  } else if (r1.y + r1.height <= r2.y) {
    return false;
  } else {
    return true;
  }
}

//Check for borders and players collisions
 function checkBordersCollisions(player) {
   if (player.x < 0) {
     player.xspeed = 0;
     player.x = 0;
   } else if (player.x >= 1280 - player.width) {
     player.xspeed = 0;
     player.x = 1280 - player.width;
   } else if (player.y < 0) {
     player.yspeed = 0;
     player.y = 0;
   }
 }

//Check the player position to let him jump
function checkPos(player) {
  var check = false;
  let promise = new Promise(function(resolve, reject) {
    setTimeout(() => {
      if((player.y == startingY && player.y == 520) || (player.y == startingY && player.y == 420))
        check = true;
      resolve(check);
    }, 1000);
  });
  return promise;
}

//Impossibilities the player to jump
function turnJumpOff() {
  if(isJumpPossible) {
    var check = false;
    let promise = new Promise(function(resolve, reject) {
      setTimeout(() => {
        check = false;
        resolve(check);
      }, 1000);
    });
    return promise;
  }
}

//Change level
function changeLevel(player, direction) {
  if(direction === "next" && currentLevel + 1 < paragraphs.length){
    currentLevel += 1;
    player.x = 300;
  } else if(direction === "prev" && currentLevel > 0) {
    currentLevel -= 1;
    player.x = 300;
  }
  document.getElementsByTagName("h2")[0].textContent = subtitles[currentLevel];
}

//Check speakeasy password
function checkSpeakEasyPassword () {
  player.xspeed = 0;
  if (currentLevel == 0 || currentLevel == 1) {
    return true;
  } else {
    let password = document.getElementById("password").value;
    if (password === speakEasyPassword) {
      return true;
    } else {
      return false;
    }
  }
}
