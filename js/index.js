//Drawing variables
var canvas;
var ctx;
var canvasBackground = new Image();
var canvasScrollingWidth = 1280;
var grassBackground = new Image();
var pipe = new Image();
var signNext = new Image();
var signPrev = new Image();
var invisibleBorders = new Image();
var wall = new Image();

//Input variables
var upKey;
var rightKey;
var downkey;
var leftKey;

//Game variables
var gameLoop;
var player;
var all_borders;
var isJumpPossible;
var maxJumpTime = 200; //in milliseconds
var startingY;

//Levels variables
var currentLevel = 0;

//Run once page has loaded
window.onload = function () {
  //Assign canvas and ctx variables
  canvas = document.getElementById("game-canvas");
  ctx = canvas.getContext("2d");
  ctx.fillStyle = "black";
  ctx.font = "bold 16px Arial";

  //Setup key listeners
  setupInputs();

  //Create borders
  all_borders = new Borders();
  for(let i = 0; i < 6; i++) {
   all_borders.newBorder(0, 620, 1280, 720, 1);
  }

  for(let i = 0; i < 3; i++) {
    all_borders.newBorder(600, 420+100, 100, 100, 2);
  }

  //Create Player
  player = new Player(300,400, all_borders);

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

  //Set ground y
  if(player.x >= 551 && player.x < 700) {
    startingY = 420;
  } else {
    startingY = 520;
  }
}

function draw() {
  //Draw canvas background
  canvasBackground.src = "C:/Program Files (x86)/EasyPHP-Devserver-17/eds-www/JS Super Mario/assets/cloudsFixed.jpg";
  ctx.drawImage(canvasBackground, 0, 0);

  //Draw signs
  signNext.src = "C:/Program Files (x86)/EasyPHP-Devserver-17/eds-www/JS Super Mario/assets/sign.png";
  signPrev.src = "C:/Program Files (x86)/EasyPHP-Devserver-17/eds-www/JS Super Mario/assets/signrev.png";
  if(currentLevel + 1 < paragraphs.length)
    ctx.drawImage(signNext, 1150, 530, 100, 100);
  if(currentLevel != 0)
    ctx.drawImage(signPrev, 30, 530, 100, 100);

  //Draw Player
  player.draw();

  //Draw borders
  all_borders.allBorders.forEach(border => border.draw());

  //Show text when on signs for better ux
  if(player.x >= 1100 && currentLevel + 1 < paragraphs.length) {
    ctx.fillText("Premi invio per andare", 1140, 450, 120);
    ctx.fillText("al livello sucessivo", 1150, 470, 100);
  } else if(player.x <= 150 && currentLevel > 0) {
    ctx.fillText("Premi invio per andare", 30, 450, 120);
    ctx.fillText("al livello precedente", 40, 470, 100);
  }

  //Show text when on pipe
  wall.src = "C:/Program Files (x86)/EasyPHP-Devserver-17/eds-www/JS Super Mario/assets/wall.jpg";
  if(player.x >= 551 && player.x < 700) {
    ctx.textAlign = "center";
    ctx.drawImage(wall, canvas.width / 5, 50, 750, 350);
    ctx.font = "normal normal bold 14px";
    ctx.fillStyle = "white";
    splitTexts(ctx, paragraphs, canvas.width / 2, 100, maxWidth, lineHeight);
    //ctx.fillText(paragraphs[currentLevel], (canvas.width / 2) , 100);
  } else {
    ctx.textAlign = "start";
  }
}

function setupInputs() {
  //Listener for when a key is pressed
  document.addEventListener("keydown", function(event){
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
    if (event.keyCode === 13) { //enter key
      if(player.x >= 1100) {
        changeLevel(player, "next");
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
  console.log(currentLevel);
}
