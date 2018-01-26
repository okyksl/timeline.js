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

export class Shape {
  draw(context, options) {
    if (options.fill) {
      context.fill();
    }
    if (options.stroke) {
      context.stroke();
    }
  }
}

export class Line extends Shape {
  constructor(origin, terminal) {
    super();
    this.origin = origin;
    this.terminal = terminal;
  }

  draw(context, options = { fill: false, stroke: true }) {
    context.beginPath();
    context.moveTo(this.origin.x, this.origin.y);
    context.lineTo(this.terminal.x, this.terminal.y);
    context.closePath();

    super.draw(context, options);
  }
}

export class Rectangle extends Shape {
  constructor(center, size, options = { radius: 0 }) {
    super();
    this.center = center;
    this.size = size;
    this.options = options;
  }

  corner(corner) {
    if (corner == Corner.LeftTop) {
      return new Point(this.center.x - this.size.width/2, this.center.y - this.size.height/2);
    } else if (corner == Corner.RightTop) {
      return new Point(this.center.x + this.size.width/2, this.center.y - this.size.height/2);
    } else if (corner == Corner.RightBottom) {
      return new Point(this.center.x + this.size.width/2, this.center.y + this.size.height/2);
    } else if (corner == Corner.LeftBottom) {
      return new Point(this.center.x - this.size.width/2, this.center.y + this.size.height/2);
    }

    return null;
  }

  draw(context, options = { fill: true, stroke: true }) {
    const x = this.center.x - this.size.width/2;
    const y = this.center.y - this.size.height/2;
    const width = this.size.width;
    const height = this.size.height;
    const radius = this.options.radius;

    context.beginPath();
    context.moveTo(x + radius, y);
    context.lineTo(x + width - radius, y);
    context.quadraticCurveTo(x + width, y, x + width, y + radius);
    context.lineTo(x + width, y + height - radius);
    context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    context.lineTo(x + radius, y + height);
    context.quadraticCurveTo(x, y + height, x, y + height - radius);
    context.lineTo(x, y + radius);
    context.quadraticCurveTo(x, y, x + radius, y);
    context.closePath();

    super.draw(context, options);
  }
}
