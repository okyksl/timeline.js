import { get } from './utils.js';
import { Corner, Point, Size, Line, Rectangle } from './draw.js';

export class Timeline {
  constructor(items = {}, options = {}) {
    this.items = items;
    this.options = options;
  }

  draw(context) {
    let objects = {};
    for (let key in this.items) {
      const item = this.items[key];

      const x = get(item, 'position.x');
      const y = get(item, 'position.y');
      const width = get(item, 'size.width') || get(this.options, 'size.width');
      const height = get(item, 'size.height') || get(this.options, 'size.height');
      const radius = get(item, 'radius') || get(this.options, 'radius');
      const fill = get(item, 'color.fill') || get(this.options, 'color.fill');
      const stroke = get(item, 'color.stroke') || get(this.options, 'color.stroke');

      context.fillStyle = fill;
      context.strokeStyle = stroke;

      objects[key] = new Rectangle(new Point(x, y), new Size(width, height), { radius: radius });
      objects[key].draw(context);
    }
  }
}

