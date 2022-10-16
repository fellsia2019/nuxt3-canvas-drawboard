import RadiusLine from '@/models/Canvas/Tools/RadiusLine';

export default class Eraser extends RadiusLine {
  savedColor: string | CanvasGradient | CanvasPattern = '';

  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
  }

  startDraw(e: MouseEvent) {
    if (!this.ctx) throw new Error('startDraw: context canvas in not defined');

    this.savedColor = this.fillColor;
    this.fillColor = this.background;

    super.startDraw(e);
  }

  endDraw() {
    this.fillColor = this.savedColor;

    super.endDraw();
  }
}
