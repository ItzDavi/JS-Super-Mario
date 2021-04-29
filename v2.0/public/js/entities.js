import Entity from './entity.js';
import Velocity from './traits/velocity.js';
import Jump from './traits/jump.js';
import {loadMarioSprite} from './sprites.js';

export function createMario() {
  return loadMarioSprite().then(sprite => {
    const mario = new Entity();

    mario.addTrait(new Velocity());
    mario.addTrait(new Jump());

    mario.draw = function drawMario(ctx) {
      sprite.draw('idle', ctx, this.pos.x, this.pos.y);
    }

    return mario;
  });
}
