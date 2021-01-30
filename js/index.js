//Drawing variables
var canvas;
var ctx;
var canvasBackground = new Image();
var canvasScrollingWidth = 1280;
var grassBackground = new Image();
var pipe = new Image();
var invisibleBorders = new Image();

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

//Run once page has loaded
window.onload = function () {
  //Assign canvas and ctx variables
  canvas = document.getElementById("game-canvas");
  ctx = canvas.getContext("2d");

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
  player = new Player(100,400, all_borders);

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
  //Set y if player on pipe
  if(player.x >= 551 && player.x <= 700) {
    startingY = 420;
  } else {
    startingY = 520;
  }
}

function draw() {
  //Clear canvas
  //ctx.fillStyle = "white";
  //ctx.fillRect(0,0,1280,720);
  canvasBackground.src = "../assets/cloudsFixed.jpg";
  ctx.drawImage(canvasBackground, 0, 0);
  /*ctx.drawImage(canvasBackground, 0 + canvasScrollingWidth, 0);
  canvasScrollingWidth += 5;
  if (canvasScrollingWidth == canvas.width) {
    canvasScrollingWidth = 0;
  }*/

  //Draw Player
  player.draw();

  //Draw borders
  all_borders.allBorders.forEach(border => border.draw());

  //Camera movements
  ctx.save();
  ctx.translate(canvas.width/2-player.x, canvas.height/2-player.y);
  ctx.restore();
}

function setupInputs() {
  document.addEventListener("keydown", function(event){
    if ((event.key === "w" || event.key === "ArrowUp") && isJumpPossible) {
        upKey = true;
    } else if (event.key === "a" || event.key === "ArrowLeft") {
      leftKey = true;
    } else if (event.key === "s" || event.key === "ArrowDown") {
      downKey = true;
    } else if (event.key === "d" || event.key === "ArrowRight") {
      rightKey = true;
  }});

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

 function checkBordersCollisions(player) {
   if (player.x < 0) {
     player.xspeed = 0;
     player.x = 0
   } else if (player.x >= 1230) {
     player.xspeed = 0;
     player.x = 1230;
   } else if (player.y < 0) {
     player.yspeed = 0;
     player.y = 0;
   }
 }

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