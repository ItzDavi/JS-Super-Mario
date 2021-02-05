function Bodyguard (x, y, player) {
  this.x = x;
  this.y = y;
  this.xspeed = 25;
  this.playerMove = player;
  this.alredyPushed = 0;

  this.width = 150;
  this.height = 170;
  this.facing = 0;

  this.pushPlayer = function () {
    this.x -= this.xspeed;
    this.playerMove.x -= this.xspeed * 2;
  }

  this.stopPushing = function () {
    if (this.x <= 850) {
      this.playerMove.xspeed = 0;
      this.xspeed = 0;
    }
  }

  this.enter = function () {
      setTimeout(() => {this.pushPlayer();}, 1000);
      setTimeout(() => {this.stopPushing();}, 200);
      this.xspeed = 0;
      this.playerMove.xspeed = 0;
      this.alreadyPushed = 1;
      console.log("äaaaaa");
  }

  this.draw = function () {
    if (this.facing === 0) {
      let bodyguardSkin = new Image();
      bodyguardSkin.src = "assets/npcleftstill.png";
      ctx.drawImage(bodyguardSkin, this.x, this.y, this.width, this.height);
    }
  }
}
