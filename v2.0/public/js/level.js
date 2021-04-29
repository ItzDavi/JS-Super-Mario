import Compositor from './compositor.js';

export default class Level {
  constructor() {
    this.comp = new Compositior();
    this.entities = new Set();
  }
}
