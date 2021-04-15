function Player(x, y, borders, enemy) {
    this.x = x;
    this.y = y;
    this.all_borders = borders;
    this.enemy = enemy;
    this.verticalRectEnemy = enemy.verticalRectEnemy;
    this.horizontalRectEnemy = enemy.horizontalRectEnemy;

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
    this.width = 50;
    this.height = 100;

    this.health = 3;

    this.step = function() {
      //Movement
      if (this.active) {
        //Horizontal
        if (!leftKey && !rightKey || leftKey && rightKey) {
          //If not moving left or rightKey
          this.previousFacing = this.facing;
          if(this.previousFacing == 1) {
            this.facing = 0;
          } else if(this.previousFacing == 2) {
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

        //Get all borders
        for (let i = 0; i < all_borders.allBorders.length; i++) {
          let borderRect = {
            x: all_borders.getBorder(i).x,
            y: all_borders.getBorder(i).y,
            width: all_borders.getBorder(i).width,
            height: all_borders.getBorder(i).height
          }

          //Check for objects limits collisions
          if (checkIntersection(horizontalRect, borderRect)) {
            while (checkIntersection(horizontalRect, borderRect)) {
              horizontalRect.x -= Math.sign(this.xspeed);
            }
            //Stop moving horizontal
            this.x = horizontalRect.x;
            this.xspeed = 0;
          }

          //Check for objects limits collisions
          if (checkIntersection(verticalRect, borderRect)) {
            while (checkIntersection(verticalRect, borderRect)) {
              verticalRect.y -= Math.sign(this.yspeed);
            }
            //Stop moving vertical
            this.y = verticalRect.y;
            this.yspeed = 0;
          }

          //Check player and enemy collisions vertically
          if (checkIntersection(verticalRect, this.verticalRectEnemy)) {
            while (checkIntersection(verticalRect, this.verticalRectEnemy)) {
              verticalRect.y -= Math.sign(this.yspeed);
              console.log("hit bro");
            }
            this.y = verticalRect.y;
            this.yspeed = 0;
          }
        }

        //Check player and enemy collisions vertically
        if (checkIntersection(horizontalRect, this.horizontalRectEnemy)) {
          while (checkIntersection(horizontalRect, this.horizontalRectEnemy)) {
            horizontalRect.x -= Math.sign(this.xspeed);
            console.log("hit bro");
          }
          this.x = horizontalRect.x;
          this.xspeed = 0;
        }
      }

        //Move mario
        this.x += this.xspeed;
        this.y += this.yspeed;
      }

  this.draw = function() {
    //If mario not moved
    if (this.facing === 0) {
      let marioSkin = new Image();
      marioSkin.src = "assets/rightstill.png";
      ctx.drawImage(marioSkin, this.x, this.y, this.width, this.height);

      //If mario looked right
    } else if (this.facing === 1) {
      let marioSkin = new Image();
      marioSkin.src = "assets/rightmov.png";
      ctx.drawImage(marioSkin, this.x, this.y, this.width, this.height);

      //If mario looked left
    } else if (this.facing === 2) {
      let marioSkin = new Image();
      marioSkin.src = "assets/leftmov.png";
      ctx.drawImage(marioSkin, this.x, this.y, this.width, this.height);

      //If mario stopped
    } else if (this.facing === 3) {
      let marioSkin = new Image();
      marioSkin.src = "assets/leftstill.png";
      ctx.drawImage(marioSkin, this.x, this.y, this.width, this.height);
    }

    //If mario has full health
    if (this.health === 3) {
      let marioHearts = new Image();
      marioHearts.src = "assets/health.png";
      ctx.drawImage(marioHearts, 30, 30, 50, 50);
      ctx.drawImage(marioHearts, 80, 30, 50, 50);
      ctx.drawImage(marioHearts, 130, 30, 50, 50);

      //If mario has 2 hearts of 3
    } else if (this.health === 2) {
      let marioHearts = new Image();
      marioHearts.src = "assets/health.png";
      ctx.drawImage(marioHearts, 30, 30, 50, 50);
      ctx.drawImage(marioHearts, 80, 30, 50, 50);

      //If mario has 1 heart of 3
    } else if (this.health === 1) {
      let marioHearts = new Image();
      marioHearts.src = "assets/health.png";
      ctx.drawImage(marioHearts, 30, 30, 50, 50);

      //If mario has 0 health
    } else if (this.health === 0) {

    }
  }
}
