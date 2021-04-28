import Compositor from './compositor.js';
import Entity from './entity.js';
import {loadLevel} from './loader.js';
import {createMario} from './entities.js';
import {loadBackgroundSprites} from './sprites.js';
import {createBackgroundLayer} from './layers.js';

const canvas = document.getElementById('screen');
const ctx = canvas.getContext('2d');

function createSpriteLayer(entity) {
  return function drawSpritesLayer(ctx) {
    entity.draw(ctx);
  }
}

Promise.all([
  createMario(),
  loadBackgroundSprites(),
  loadLevel('1-1'),
]).then(([mario, backgroundSprites, level]) => {
  const comp = new Compositor();

  const backgroundLayer = createBackgroundLayer(level.backgrounds, backgroundSprites);
  comp.layers.push(backgroundLayer);

  const gravity = 0.5;

  const spriteLayer = createSpriteLayer	(mario);
  comp.layers.push(spriteLayer);

  function update() {
    comp.draw(ctx);
    mario.update();
    mario.vel.y += gravity;
    requestAnimationFrame(update);
  }

  update();
});
