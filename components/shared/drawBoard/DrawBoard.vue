<template>
  <div class="draw-board">
    <div class="draw-board__settings">
      <div class="draw-board__tools">
        <div
          v-for="(tool, i) in tools"
          :key="`draw-board__tool-${i}`"
          class="draw-board__tool"
          :class="toolClassStr(tool.model)"
          @click="currentTool = tool.model"
        >
          <img :src="tool.icon" />
        </div>
      </div>
      <div v-if="Boolean(currentTool)">
        <CustomInput
          class="draw-board__settings-field"
          v-model="currentTool.background"
          type="color"
          >Цвет фона</CustomInput
        >
        <CustomInput
          class="draw-board__settings-field"
          v-model="currentTool.fillColor"
          type="color"
          >Цвет кисти</CustomInput
        >
        <CustomInput
          class="draw-board__settings-field"
          v-model="currentTool.lineWidth"
          type="range"
          min="1"
          max="30"
          >Ширина кисти: {{ currentTool.lineWidth }}</CustomInput
        >
        <div class="draw-board__dots-sizes draw-board__settings-field">
          <ColorDot
            v-for="dot in sizesPointer"
            :key="`draw-board__dot-sizes-${dot.id}`"
            :size="dot.size"
            :theme="currentTool.fillColor"
            :currentSize="currentTool.lineWidth"
            @click="currentTool.lineWidth = dot.size"
          />
        </div>
        <CustomButton size="MD" @click="currentTool.clearCtx()"
          >Очистить</CustomButton
        >
      </div>
    </div>
    <canvas
      class="draw-board__canvas"
      ref="canvasDOM"
      @mousedown="onMousedown"
      @mousemove="onMouseMove"
      @mouseup="onMouseup"
      @mouseleave="onMouseup"
    ></canvas>
  </div>
</template>

<script lang="ts" setup>
  import BaseTool from '@/models/Canvas/Tools/BaseTool';
  import RadiusLine from '@/models/Canvas/Tools/RadiusLine';
  import Eraser from '@/models/Canvas/Tools/Eraser';

  type ToolsModels = 'RadiusLine' | 'Eraser';

  type ITools = {
    [key in ToolsModels]: {
      model: BaseTool | null;
      icon: string;
    };
  };

  const tools = reactive<ITools>({
    Eraser: {
      model: null,
      icon: '/img/eraser.svg',
    },
    RadiusLine: {
      model: null,
      icon: '/img/paint.svg',
    },
  });

  const sizesPointer = reactive<Array<{ id: number; size: number }>>([
    {
      id: 1,
      size: 6,
    },
    {
      id: 2,
      size: 10,
    },
    {
      id: 4,
      size: 15,
    },
    {
      id: 5,
      size: 20,
    },
    {
      id: 6,
      size: 30,
    },
  ]);

  const canvasDOM = ref<HTMLCanvasElement | null>(null);
  const currentTool = ref<BaseTool | null>(null);

  function initCanvas() {
    if (!canvasDOM.value) return;

    tools.RadiusLine.model = new RadiusLine(canvasDOM.value);
    tools.Eraser.model = new Eraser(canvasDOM.value);

    // Устанавливаем превыбор инструмента
    currentTool.value = tools.RadiusLine.model;
  }

  function toolClassStr(model: BaseTool) {
    return model === currentTool.value ? 'draw-board__tool--is-active' : '';
  }

  function onMousedown(e: MouseEvent) {
    if (!currentTool.value) return;

    currentTool.value.startDraw(e);
  }
  function onMouseMove(e: MouseEvent) {
    if (!currentTool.value) return;

    currentTool.value.draw(e);
  }
  function onMouseup(e: MouseEvent) {
    if (!currentTool.value) return;

    currentTool.value.endDraw();
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

    // .draw-board__tools
    &__tools {
      margin-bottom: 15px;
    }

    // .draw-board__tool
    &__tool {
      display: inline-flex;
      width: auto;
      height: 30px;
      cursor: pointer;

      padding: 4px;
      border: 2px solid transparent;
      border-radius: 5px;
      transition: all 0.3s ease;

      img {
        width: 100%;
      }

      &:not(&:last-child) {
        margin-right: 8px;
      }

      &:hover {
        border-color: $color-light;
      }
      background-color: rgba($color-light, 0.5);

      // .draw-board__tool--is-active
      &--is-active {
        background-color: $color-light;
      }
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
