function Enemy(x, y, borders) {
  this.x = x;
  this.y = y;

  this.all_borders = all_borders;

  this.xspeed = 0;
  this.yspeed = 0;
  this.friction = 0.6;
  this.maxspeed = 10;

  this.active = true;
  this.facing = 0;
  this.previousFacing = 0;
  this.width = 100;
  this.height = 100;

  this.damage = 1;

  this.step = function() {

    //Check for intersections
    for (let i = 0; i < all_borders.allBorders.length; i++) {
      let borderRect = {
        x: all_borders.getBorder(i).x,
        y: all_borders.getBorder(i).y,
        width: all_borders.getBorder(i).width,
        height: all_borders.getBorder(i).height
      }

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
        this.x = horizontalRect.x;
        this.xspeed = 0;
      }

      if (checkIntersection(verticalRect, borderRect)) {
        while (checkIntersection(verticalRect, borderRect)) {
          verticalRect.y -= Math.sign(this.yspeed);
        }
        this.y = verticalRect.y;
        this.yspeed = 0;
      }
    }
  }

  this.draw = function() {
    if (this.facing === 0) {
      let enemySkin = new Image();
      enemySkin. src = "assets/enemy.png";
      ctx.drawImage(enemySkin, 250, 520, this.width, this.height);
      }
    }
  }
}
