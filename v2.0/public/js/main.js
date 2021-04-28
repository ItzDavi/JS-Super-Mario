import SpriteSheet from './spritesheet.js';
import {loadImage, loadLevel} from './loader.js';

function drawBackground(background, ctx, sprites) {
  background.ranges.forEach(([x1, x2, y1, y2]) => {
    for (let x = x1; x < x2; ++x) {
      for (let y = y1; y < y2; ++y) {
        sprites.drawTile(background.tile, ctx, x, y);
      }
    }
  });
}

function loadMarioSprite () {
  return loadImage('assets/characters.gif').then(image => {
    const sprites = new SpriteSheet(image, 16, 16);
    sprites.define('idle', 276, 44, 16, 16);
    return sprites;
  });
}

function loadBackgroundSprites () {
  return loadImage('assets/tiles.png').then(image => {
    const sprites = new SpriteSheet(image, 16, 16);
    sprites.defineTile('ground', 0, 0);
    sprites.defineTile('sky', 3, 23);
    return sprites;
  });
}

const canvas = document.getElementById('screen');
const ctx = canvas.getContext('2d');

Promise.all([
  loadMarioSprite(),
  loadBackgroundSprites(),
  loadLevel('1-1'),
]).then(([marioSprite, sprites, level]) => {
  level.backgrounds.forEach(background => {
    drawBackground(background, ctx, sprites);
  });
  marioSprite.draw('idle', ctx, 64, 64)
});
