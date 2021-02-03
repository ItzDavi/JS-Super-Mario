function Bodyguard (x, y, player) {
  this.x = x;
  this.y = y;
  this.xspeed = 25;

  this.width = 150;
  this.height = 170;
  this.facing = 0;

  this.pushPlayer = function (player) {
    this.x -= this.xspeed;
    player.x -= this.xspeed;
    if (this.x <= 1050) {
      player.xspeed = 0;
      this.xspeed = 0;
  }

  this.enter = function (player) {
    setTimeout(() => {this.pushPlayer(player)}, 1000);
    }
  }

  this.draw = function () {
    if (this.facing === 0) {
      let bodyguardSkin = new Image();
      bodyguardSkin.src = "assets/npcleftstill.png";
      ctx.drawImage(bodyguardSkin, this.x, this.y, this.width, this.height);
    }
  }
}
