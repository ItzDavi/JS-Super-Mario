function Player(x, y, borders) {
    this.x = x;
    this.y = y;
    this.all_borders = borders;
    //Velocity
    this.xspeed = 0;
    this.yspeed = 0;
    //Friction to slow down while jumping
    this.friction = 0.6;
    this.maxSpeed = 10;
    //Player ready to move
    this.active = true;
    this.facing = 0;
    this.previousFacing = 0;
    this.width = 75;
    this.height = 100;

    this.step = function() {
      //Movement
      if (this.active) {
        //Horizontal
        if (!leftKey && !rightKey || leftKey && rightKey) {
          //If not moving left or rightKey
          this.previousFacing = this.facing;
          if(this.previousFacing == 1) {
            this.facing = 0;
          } else if(this.previousFacing == 2){
            this.facing = 3;
          }

          //If moving both ways
          this.xspeed *= this.friction;
        } else if (rightKey) {
          //Move right
          this.previousFacing = this.facing;
          this.facing = 1;
          this.xspeed++;
        } else if (leftKey) {
          //Move left
          this.previousFacing = this.facing;
          this.facing = 2;
          this.xspeed--;
        }

        //Vertical Movement
        if (upKey) {
          //Check if on ground
          this.yspeed -= 15;
        }
        //Gravity
        this.yspeed += 5;

        //Speed correction
        //xspeed correction
        if (this.xspeed > this.maxSpeed) {
          this.xspeed = this.maxSpeed;
        } else if (this.xspeed < -this.maxSpeed) {
          this.xspeed = -this.maxSpeed;
        }
        //yspeed correction
        if (this.yspeed > this.maxSpeed) {
          this.yspeed = this.maxSpeed;
        } else if (this.yspeed < -this.maxSpeed) {
          this.yspeed = -this.maxSpeed;
        }

        //Fix weird negative/positive decimals results
        if (this.xspeed > 0) {
          this.xspeed = Math.floor(this.xspeed);
        } else {
          this.xspeed = Math.ceil(this.xspeed);
        }

        //Fix weird negative/positive decimals results
        if (this.yspeed > 0) {
          this.yspeed = Math.floor(this.yspeed);
        } else {
          this.yspeed = Math.ceil(this.yspeed);
        }

        //Horizontal colliusion rectangle
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

        this.x += this.xspeed;
        this.y += this.yspeed;
      }
  }

  this.draw = function() {
    if (this.facing === 0) {
      let marioSkin = new Image();
      marioSkin.src = "../assets/rightstill.png";
      ctx.drawImage(marioSkin, this.x, this.y, this.width, this.height);
    } else if (this.facing === 1) {
      let marioSkin = new Image();
      marioSkin.src = "./assets/rightmov.png";
      ctx.drawImage(marioSkin, this.x, this.y, this.width, this.height);
    } else if (this.facing === 2) {
      let marioSkin = new Image();
      marioSkin.src = "./assets/leftmov.png";
      ctx.drawImage(marioSkin, this.x, this.y, this.width, this.height);
    } else if (this.facing === 3) {
      let marioSkin = new Image();
      marioSkin.src = "./assets/leftstill.png";
      ctx.drawImage(marioSkin, this.x, this.y, this.width, this.height);
    }
  }
}
