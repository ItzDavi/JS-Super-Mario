import Entity from './entity.js';
import {loadMarioSprite} from './sprites.js';

export function createMario() {
  return loadMarioSprite().then(sprite => {
    const mario = new Entity();
    mario.pos.set(64, 180);
    mario.vel.set(2, -10);

    mario.draw = function drawMario(ctx) {
      sprite.draw('idle', ctx, this.pos.x, this.pos.y);
    }

    mario.update = function updateMario(){
      this.pos.x += this.vel.x;
      this.pos.y += this.vel.y;
    }

    return mario;
  });
}
