import Compositor from './compositor.js';
import Entity from './entity.js';
import Timer from './timer.js';
import Keyboard from './keyboardstate.js';
import {loadLevel} from './loader.js';
import {createMario} from './entities.js';



const canvas = document.getElementById('screen');
const ctx = canvas.getContext('2d');

Promise.all([
  createMario(),
  loadLevel('1-1'),
]).then(([mario, level]) => {



  const gravity = 2000;
  mario.pos.set(64, 180);

  const SPACE = 32;
  const input = new Keyboard();
  input.addMapping(SPACE, keyState => {
    if(keyState) {
      mario.jump.start();
    } else {
      mario.jump.cancel();
    }
  });
  input.listenTo(window);


  const timer = new Timer(1/60);
  timer.update = function update(deltaTime) {
    mario.update(deltaTime);
    level.comp.draw(ctx);
    mario.vel.y += gravity * deltaTime;
  }

  timer.start();
});
