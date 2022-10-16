<template>
  <div class="draw-board">
    <div class="draw-board__settings">
      <CustomInput
        class="draw-board__settings-field"
        v-model="userSettingsCanvas.background"
        type="color"
        >Цвет фона</CustomInput
      >
      <CustomInput
        class="draw-board__settings-field"
        v-model="userSettingsCanvas.color"
        type="color"
        >Цвет кисти</CustomInput
      >
      <CustomInput
        class="draw-board__settings-field"
        v-model="userSettingsCanvas.radius"
        type="range"
        min="1"
        max="20"
        >Радиус кисти: {{ userSettingsCanvas.radius }}</CustomInput
      >
      <div class="draw-board__dots-sizes draw-board__settings-field">
        <ColorDot
          v-for="dot in sizesPointer"
          :key="`draw-board__dot-sizes-${dot.id}`"
          :size="dot.size"
          :theme="userSettingsCanvas.color"
          :currentSize="userSettingsCanvas.radius"
          @click="userSettingsCanvas.radius = dot.size"
        />
      </div>

      <CustomButton size="MD" @click="onClearCanvas">Очистить</CustomButton>
    </div>
    <canvas
      class="draw-board__canvas"
      ref="canvas"
      :style="canvasStylesString"
      @mousedown="startDrawFromMouseMove"
      @mousemove="drawArcWithLine"
      @mouseup="stopDrawFromMouseMove"
      @mouseleave="stopDrawFromMouseMove"
    ></canvas>
  </div>
</template>

<script lang="ts" setup>
  interface ICoordinates {
    x: number;
    y: number;
  }

  interface IUserSettingsCanvas {
    radius: number;
    color: string;
    background: string;
  }

  const canvas = ref<HTMLCanvasElement | null>(null);
  const ctx = ref<CanvasRenderingContext2D | null>(null);

  const rect = {
    get value(): DOMRect | null {
      return canvas.value ? canvas.value.getBoundingClientRect() : null;
    },
  };

  const userSettingsCanvas = reactive<IUserSettingsCanvas>({
    radius: 2,
    color: '#000000',
    background: '#ffffff',
  });

  const canvasStylesString = computed<string>(() => {
    return `background-color: ${userSettingsCanvas.background}`;
  });

  const sizesPointer = reactive([
    {
      id: 1,
      size: 6,
    },
    {
      id: 2,
      size: 8,
    },
    {
      id: 4,
      size: 10,
    },
    {
      id: 5,
      size: 15,
    },
    {
      id: 6,
      size: 20,
    },
  ]);

  const prevPositionFromMove = ref<ICoordinates>({ x: 0, y: 0 });

  const canDraw = ref<boolean>(false);

  function initCanvas() {
    if (!canvas.value)
      throw new Error('initCanvas: canvas DOM is not defined!');

    ctx.value = canvas.value.getContext('2d');

    if (!ctx.value)
      throw new Error('initCanvas: context canvas in not defined');

    const scale = window.devicePixelRatio;

    canvas.value.width = (rect.value?.width || 0) * scale;
    canvas.value.height = (rect.value?.height || 0) * scale;
    ctx.value.scale(scale, scale);
  }

  function setPrevPositionFromMove(x: number, y: number) {
    prevPositionFromMove.value.x = x;
    prevPositionFromMove.value.y = y;
  }

  function validPositionsFromEvent(
    eventX: number,
    eventY: number
  ): ICoordinates {
    return rect.value
      ? {
          x: eventX - rect.value.left,
          y: eventY - rect.value.top,
        }
      : {
          x: 0,
          y: 0,
        };
  }

  function drawLine(from: ICoordinates, to: ICoordinates) {
    if (!ctx.value) throw new Error('drawLine: context canvas in not defined');

    ctx.value.beginPath();
    ctx.value.moveTo(from.x, from.y);
    ctx.value.lineTo(to.x, to.y);
    ctx.value.stroke();

    testConfig.line.push({
      from: { ...from },
      to,
      lineWidth: userSettingsCanvas.radius * 2,
      color: userSettingsCanvas.color,
    });

    console.log(prevPositionFromMove.value, from);
  }

  function drawArc(
    x: number,
    y: number,
    r: number,
    startAngle = 0,
    endAngle = Math.PI * 2,
    anticlockwise = false
  ) {
    if (!ctx.value) throw new Error('drawArc: context canvas in not defined');

    testConfig.arc.push({
      x,
      y,
      r,
      color: userSettingsCanvas.color,
    });

    ctx.value.beginPath();
    ctx.value.arc(x, y, r, startAngle, endAngle, anticlockwise);

    ctx.value.fill();
  }

  const testConfig: {
    arc: Array<{
      x: number;
      y: number;
      r: number;
      color: string;
    }>;
    line: Array<{
      from: ICoordinates;
      to: ICoordinates;
      lineWidth: number;
      color: string;
    }>;
    restore: () => void;
  } = {
    arc: [],
    line: [],
    restore() {
      this.arc = [];
      this.line = [];
    },
  };

  function drawArcWithLine(e: MouseEvent) {
    if (!canDraw.value) return;

    if (!ctx.value)
      throw new Error('drawArcWithLine: context canvas in not defined');

    const { x, y } = validPositionsFromEvent(e.x, e.y);

    drawArc(x, y, userSettingsCanvas.radius);

    if (
      prevPositionFromMove.value.x === 0 &&
      prevPositionFromMove.value.y === 0
    ) {
      setPrevPositionFromMove(x, y);
    }

    ctx.value.lineWidth = userSettingsCanvas.radius * 2;
    drawLine(prevPositionFromMove.value, { x, y });
    setPrevPositionFromMove(x, y);
  }

  function startDrawFromMouseMove(e: MouseEvent) {
    if (!ctx.value)
      throw new Error('startDrawFromMouseMove: context canvas in not defined');

    canDraw.value = true;

    if (ctx.value.fillStyle != userSettingsCanvas.color) {
      ctx.value.fillStyle = userSettingsCanvas.color;
      ctx.value.strokeStyle = userSettingsCanvas.color;
    }

    drawArcWithLine(e);
  }
  function stopDrawFromMouseMove() {
    canDraw.value = false;
    setPrevPositionFromMove(0, 0);

    console.log('testConfig:', testConfig);
  }

  function onClearCanvas() {
    if (!ctx.value)
      throw new Error('clearCanvas: context canvas in not defined');
    if (!rect.value) throw new Error('clearCanvas: rect canvas in not defined');

    ctx.value.clearRect(0, 0, rect.value.width, rect.value.height);
    testConfig.restore();
  }

  onMounted(() => {
    initCanvas();

    window.addEventListener('resize', initCanvas);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', initCanvas);
  });
</script>

<style lang="scss">
  .draw-board {
    display: grid;
    grid-template-columns: 240px 1fr;
    gap: 80;
    min-height: 100vh;

    // .draw-board__settings
    &__settings {
      background: $gradient-dark-danger;

      padding: 20px 12px;
      color: $color-light;
    }

    // .draw-board__settings-field
    &__settings-field {
      margin-bottom: 10px;
    }

    // .draw-board__dots-sizes
    &__dots-sizes {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    // .draw-board__canvas
    &__canvas {
      width: 100%;
      height: 400px;
      min-height: 100vh;
    }
  }
</style>
