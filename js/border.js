class Border {
  constructor(x, y, width, height, type){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.type = type;
  };

  draw() {
    if (this.type === 1) {
      //ctx.fillStyle = "blue";
      //ctx.fillRect(this.x, this.y, this.width, this.height);
      grassBackground.src = "assets/ground.jpg";
      ctx.drawImage(grassBackground, this.x, this.y, 1280, 100);
    } else if (this.type === 2) {
      pipe.src = "assets/car1.png"
      ctx.drawImage(pipe, this.x, this.y, this.width, this.height);
    //} //else if (this.type === 3) {
      //invisibleBorders.src = "C:/Program Files (x86)/EasyPHP-Devserver-17/eds-www/JS Super Mario/assets/invisibleBorders.png"
      //ctx.drawImage(invisibleBorders, this.x, this.y, 1280, 100);
    }
  }
}

class Borders {
  constructor(){
    this.borders = [];
  }

  newBorder(x, y, width, height, type) {
    let b = new Border(x, y, width, height, type);
    this.borders.push(b);
    return b;
  }

  get allBorders(){
    return this.borders;
  }

  getBorder(i){
    return this.borders[i];
  }
}
