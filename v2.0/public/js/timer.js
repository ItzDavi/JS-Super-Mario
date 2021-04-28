export default Timer {
  constructor(deltaTime = 1/60) {
    let accumulatedTime = 0;
    let lastTime = 0;

    function update(time) {
      accumulatedTime += (time - lastTime) / 1000;

      while (accumulatedTime > deltaTime) {
        this.update(deltaTime);

        accumulatedTime -= deltaTime;
      }
      //requestAnimationFrame(update);
      setTimeout(update, 1000/60, performance.now());

      lastTime = time;
    }
  }
}
