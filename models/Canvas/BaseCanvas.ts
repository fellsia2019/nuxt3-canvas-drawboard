import { ICoordinates } from '~~/types/Tools';

export default class BaseCanvas {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null = null;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;

    this.init();
  }

  init() {
    this.ctx = this.canvas.getContext('2d');

    if (!this.ctx) throw new Error('ctx canvas is not defined');

    const scale = window.devicePixelRatio;
    this.canvas.width = (this.rect?.width || 0) * scale;
    this.canvas.height = (this.rect?.height || 0) * scale;
    this.ctx.scale(scale, scale);
  }

  clearCtx() {
    if (!this.ctx)
      throw new Error('clearCanvas: context canvas in not defined');

    this.ctx.clearRect(0, 0, this.rect.width, this.rect.height);
  }

  validPositionsFromEvent(e: MouseEvent): ICoordinates {
    return this.rect
      ? {
          x: e.x - this.rect.left,
          y: e.y - this.rect.top,
        }
      : {
          x: 0,
          y: 0,
        };
  }

  set background(color: string) {
    this.canvas.style.backgroundColor = color;
  }

  get background(): string {
    return this.canvas.style.backgroundColor || '#ffffff';
  }

  get rect(): DOMRect {
    return this.canvas.getBoundingClientRect();
  }
}
