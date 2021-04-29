import Compositor from './compositor.js';
import Entity from './entity.js';
import Timer from './timer.js';
import Keyboard from './keyboardstate.js';
import {loadLevel} from './loader.js';
import {createMario} from './entities.js';
import {loadBackgroundSprites} from './sprites.js';
import {createBackgroundLayer, createSpriteLayer} from './layers.js';

const input = new Keyboard();
input.addMapping(32, keyState => {
  console.log(keyState);
})
input.listenTo(window);

const canvas = document.getElementById('screen');
const ctx = canvas.getContext('2d');

Promise.all([
  createMario(),
  loadBackgroundSprites(),
  loadLevel('1-1'),
]).then(([mario, backgroundSprites, level]) => {
  const comp = new Compositor();

  const backgroundLayer = createBackgroundLayer(level.backgrounds, backgroundSprites);
  comp.layers.push(backgroundLayer);

  const gravity = 2000;
  mario.pos.set(64, 180);
  mario.vel.set(200, -600);

  const spriteLayer = createSpriteLayer	(mario);
  comp.layers.push(spriteLayer);

  const timer = new Timer(1/60);
  timer.update = function update(deltaTime) {
    mario.update(deltaTime);
    comp.draw(ctx);
    mario.vel.y += gravity * deltaTime;
  }

  timer.start();
});
