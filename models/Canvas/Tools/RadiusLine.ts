import Line from '@/models/Canvas/Tools/Line';

export default class RadiusLine extends Line {
  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
  }

  draw(e: MouseEvent) {
    if (!this.ctx) throw new Error('ctx canvas is not defined');

    super.draw(e);

    if (this.canDraw) {
      const { x, y } = this.validPositionsFromEvent(e);

      this.ctx.beginPath();
      this.ctx.arc(x, y, this.ctx.lineWidth / 2, 0, Math.PI * 2);

      this.ctx.fill();
    }
  }
}
