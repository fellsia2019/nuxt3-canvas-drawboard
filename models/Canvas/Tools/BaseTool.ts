import BaseCanvas from '@/models/Canvas/BaseCanvas';

export default class BaseTool extends BaseCanvas {
  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
  }

  set fillColor(color: string | CanvasGradient | CanvasPattern) {
    if (!this.ctx) return;
    this.ctx.fillStyle = color;
    this.ctx.strokeStyle = color;
  }

  get fillColor(): string | CanvasGradient | CanvasPattern {
    return this.ctx?.strokeStyle || '#000000';
  }

  set lineWidth(width: number) {
    if (!this.ctx) throw new Error('lineWidth: context canvas in not defined');

    this.ctx.lineWidth = width;
  }
  get lineWidth(): number {
    if (!this.ctx) throw new Error('lineWidth: context canvas in not defined');

    return this.ctx.lineWidth;
  }

  startDraw(e: MouseEvent) {}

  draw(e: MouseEvent) {}

  endDraw() {}
}
