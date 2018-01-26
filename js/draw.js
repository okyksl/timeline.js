export const Corner = {
  LeftTop     : 1,
  RightTop    : 2,
  RightBottom : 3,
  LeftBottom  : 4
};

export class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static distance(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;

    return Math.sqrt(dx*dx + dy*dy);
  }

  toString() {
    return '{x: ' + this.x + ', y: ' + this.y + '}';
  }
}

export class Size {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  toString() {
    return '{width: ' + this.width + ', height: ' + this.height + '}';
  }
}
