import { get, merge } from './utils.js';
import { Corner, Point, Size, Line, Rectangle } from './draw.js';

export class Timeline {
  static get options() {
    return {
      size: {
        height: 50,
        width: 150
      },
      radius: 0,
      color: {
        fill: 'transparent',
        stroke: 'red',
        text: 'black',
        line: 'green'
      },
      text: {
        font: '15px Arial',
        align: 'center',
        baseline: 'middle'
      },
      offset: 20
    };
  }

  constructor(items = {}, options = {}, canvas = null) {
    this.items = items;
    this.options = merge(options, Timeline.options);
    this.canvas = canvas;
    this.objects = {};
  }

  draw(canvas = null) {
    if (canvas) {
      this.canvas = canvas;
    }

    const context = this.canvas.getContext('2d');

    for (let key in this.items) {
      const item = this.items[key];

      const name = get(item, 'name');
      const x = get(item, 'position.x');
      const y = get(item, 'position.y');
      const width = get(item, 'size.width') || get(this.options, 'size.width');
      const height = get(item, 'size.height') || get(this.options, 'size.height');
      const radius = get(item, 'radius') || get(this.options, 'radius');
      const fill = get(item, 'color.fill') || get(this.options, 'color.fill');
      const stroke = get(item, 'color.stroke') || get(this.options, 'color.stroke');
      const text = get(item, 'color.text') || get(this.options, 'color.text');
      const line = get(item, 'color.line') || get(this.options, 'color.line');
      const font = get(item, 'text.font') || get(this.options, 'text.font');
      const align = get(item, 'text.align') || get(this.options, 'text.align');
      const baseline = get(item, 'text.baseline') || get(this.options, 'text.baseline');
      const offset = get(item, 'offset') || get(this.options, 'offset');

      context.fillStyle = fill;
      context.strokeStyle = stroke;
      context.font = font;
      context.textAlign = align;
      context.textBaseline = baseline;

      this.objects[key] = new Rectangle(new Point(x, y), new Size(width, height), { radius: radius });
      this.objects[key].draw(context);

      context.fillStyle = text;
      context.fillText(name, x, y);

      if (item.dependencies) {
        context.strokeStyle = line;

        const terminal = new Point(x - width/2, y);
        for (let j = 0; j < item.dependencies.length; j++) {
          const source = this.objects[item.dependencies[j]];

          const points = [
            new Point(source.center.x + source.size.width/2, source.center.y),
            new Point(source.center.x + source.size.width/2 + offset, source.center.y),
            new Point(source.center.x + source.size.width/2 + offset, terminal.y),
            terminal
          ];

          for (let i = 0; i < points.length-1; i++) {
            new Line(points[i], points[i+1]).draw(context);
          }
        }
      }
    }
  }
}

