function Bodyguard(x, y, player) {
  this.x = x;
  this.y = y;
  this.xspeed = 25;

  this.width = 150;
  this.height = 170;
  this.facing = 0;

  this.enter = function () {
    setTimeout(() => {this.x -= this.xspeed}, 1000);
    player.x -= this.xspeed;
    if (this.x <= 1050) {
      this.xspeed = 0;
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
