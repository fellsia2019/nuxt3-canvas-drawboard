import { ICoordinates } from '~~/types/Tools';
import BaseTool from '@/models/Canvas/Tools/BaseTool';

export default class Line extends BaseTool {
  canDraw: boolean = false;
  prevPosition: ICoordinates = { x: 0, y: 0 };

  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
  }

  startDraw(e: MouseEvent) {
    this.canDraw = true;
    this.draw(e);
  }

  draw(e: MouseEvent) {
    if (!this.ctx) throw new Error('ctx canvas is not defined');
    if (!this.canDraw) return;

    const { x, y } = this.validPositionsFromEvent(e);

    if (this.prevPosition.x === 0 && this.prevPosition.y === 0) {
      this.setPrevPosition(x, y);
    }

    this.ctx.beginPath();
    this.ctx.moveTo(this.prevPosition.x, this.prevPosition.y);
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
    this.setPrevPosition(x, y);
  }

  endDraw() {
    this.canDraw = false;
    this.setPrevPosition(0, 0);
  }

  setPrevPosition(x: number, y: number) {
    this.prevPosition.x = x;
    this.prevPosition.y = y;
  }
}
