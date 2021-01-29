//Drawing variables
var canvas;
var ctx;
var canvasBackground = new Image();
var canvasScrollingWidth = 1280;
var grassBackground = new Image();

//Input variables
var upKey;
var rightKey;
var downkey;
var leftKey;

//Game variables
var gameLoop;
var player;
var all_borders;

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
    all_borders.newBorder(600,420 + 100 * i, 100, 100, 2);
  }

  //Create Player
  player = new Player(100,400, all_borders);

  //Game loop
  gameLoop = setInterval(step, 1000/60);
}

function step() {
  //Player step
  player.step();

  //Draw everything
  draw();
}

function draw() {
  //Clear canvas
  //ctx.fillStyle = "white";
  //ctx.fillRect(0,0,1280,720);
  canvasBackground.src = "C:/Program Files (x86)/EasyPHP-Devserver-17/eds-www/JS Super Mario/assets/cloudsFixed.jpg";
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
    if (event.key === "w" || event.key === "ArrowUp") {
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
