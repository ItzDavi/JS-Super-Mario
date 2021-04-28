export default class Compositor {
  constructor() {
    this.layers = [];
  }

  draw(ctx) {
    this.layers.forEach(layer => {
      layer(ctx);
    });
  }
}
