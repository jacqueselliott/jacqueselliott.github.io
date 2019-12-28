class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(vec) {
    this.x += vec.x;
    this.y += vec.y;
  }

  magnitude() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }

  isZero() {
    return this.x == 0 && this.y == 0;
  }

  direction() {
    if (this.isZero()) {
      return new Vector(0, 0);
    }
    var magnitude = this.magnitude();
    return new Vector(this.x / magnitude, this.y / magnitude);
  }

  static times(vec, mag) {
    return new Vector(vec.x * mag, vec.y * mag);
  }
}