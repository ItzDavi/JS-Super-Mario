function Enemy(x, y, borders) {
  //X and Y position
  this.x = x;
  this.y = y;

  //Game interactions
  this.all_borders = borders;
  this.player = player;

  //Movement variables
  this.friction = 0.6;
  this.maxspeed = 10;

  //General variables
  this.active = true;
  this.facing = 0;
  this.previousFacing = 0;
  this.width = 100;
  this.height = 100;

  //Damage
  this.damage = 1;

  this.step = function() {

    //Horizontal collision rectangle
    var horizontalRectEnemy = {
      x: this.x + this.xspeed,
      y: this.y,
      width: this.width,
      height: this.height
    }
    //Vertical collision rectangle
    var verticalRectEnemy = {
      x: this.x,
      y: this.y + this.yspeed,
      width: this.width,
      height: this.height
    }

    /*//Check for intersections
    for (let i = 0; i < all_borders.allBorders.length; i++) {
      let borderRect = {
        x: all_borders.getBorder(i).x,
        y: all_borders.getBorder(i).y,
        width: all_borders.getBorder(i).width,
        height: all_borders.getBorder(i).height
      }

      //Objects limits
      if (checkIntersection(horizontalRectEnemy, borderRect)) {
        while (checkIntersection(horizontalRectEnemy, borderRect)) {
          horizontalRectEnemy.x -= Math.sign(this.xspeed);
        }
        //Stop moving horizontally
        this.x = horizontalRectEnemy.x;
        this.xspeed = 0;
      }

      if (checkIntersection(verticalRectEnemy, borderRect)) {
        while (checkIntersection(verticalRectEnemy, borderRect)) {
          verticalRectEnemy.y -= Math.sign(this.yspeed);
        }
        //Stop moving verically
        this.y = verticalRectEnemy.y;
        this.yspeed = 0;
      }
    }*/
  }

  this.draw = function() {
    //Static image
    if (this.facing === 0) {
      let enemySkin = new Image();
      enemySkin. src = "assets/enemy.png";
      ctx.drawImage(enemySkin, this.x, 520, this.width, this.height);
    }
  }
}
