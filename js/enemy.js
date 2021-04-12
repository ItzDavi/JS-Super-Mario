function Enemy(x, y, borders, player) {
  //X and Y position
  this.x = x;
  this.y = y;

  //Game interactions
  this.all_borders = borders;
  this.player = player;

  //Movement variables
  this.xspeed = 0;
  this.yspeed = 0;
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
    let horizontalRect = {
      x: this.x + this.xspeed,
      y: this.y,
      width: this.width,
      height: this.height
    }
    //Vertical collision rectangle
    let verticalRect = {
      x: this.x,
      y: this.y + this.yspeed,
      width: this.width,
      height: this.height
    }

    //Check for intersections
    for (let i = 0; i < all_borders.allBorders.length; i++) {
      let borderRect = {
        x: all_borders.getBorder(i).x,
        y: all_borders.getBorder(i).y,
        width: all_borders.getBorder(i).width,
        height: all_borders.getBorder(i).height
      }

      //Objects limits
      if (checkIntersection(horizontalRect, borderRect)) {
        while (checkIntersection(horizontalRect, borderRect)) {
          horizontalRect.x -= Math.sign(this.xspeed);
        }
        //Stop moving horizontally
        this.x = horizontalRect.x;
        this.xspeed = 0;
      }

      if (checkIntersection(verticalRect, borderRect)) {
        while (checkIntersection(verticalRect, borderRect)) {
          verticalRect.y -= Math.sign(this.yspeed);
        }
        //Stop moving verically
        this.y = verticalRect.y;
        this.yspeed = 0;
      }
    }
  }

  this.draw = function() {
    //Static image
    if (this.facing === 0) {
      let enemySkin = new Image();
      enemySkin. src = "assets/enemy.png";
      ctx.drawImage(enemySkin, this.x, this.y, this.width, this.height);
    }
  }
}
