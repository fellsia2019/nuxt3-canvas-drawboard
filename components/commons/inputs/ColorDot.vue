<template>
  <div
    class="color-dot"
    :class="{ 'color-dot--is-active': isActive }"
    :style="[colorDotWidthStyle, colorDotThemeStyles]"
  ></div>
</template>

<script lang="ts" setup>
  interface IColorDotProps {
    theme?: string;
    size: number;
    currentSize: number;
  }

  const colorDotProps = withDefaults<IColorDotProps, Required<IColorDotProps>>(
    defineProps<IColorDotProps>(),
    {
      theme: 'black',
      size: 3,
      currentSize: 0,
    }
  );

  const isActive = computed<boolean>(() => {
    return colorDotProps.currentSize == colorDotProps.size;
  });

  const colorDotThemeStyles = computed<string>(() => {
    return `background-color: ${colorDotProps.theme}`;
  });

  const colorDotWidthStyle = computed<string>(() => {
    return `width: ${colorDotProps.size}px; height: ${colorDotProps.size}px`;
  });
</script>

<style lang="scss">
  .color-dot {
    border-radius: 50%;
    cursor: pointer;

    transition: all 0.3s ease;
    position: relative;

    &:hover {
      &::after {
        transform: translate(-50%, -50%) scale(1);
      }
    }

    &::after {
      content: '';
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%) scale(0);

      width: 80%;
      height: 80%;
      border-radius: 50%;
      background: $gradient-light;
      transition: all 0.3s ease;
    }

    // .color-dot--is-active
    &--is-active {
      &::after {
        transform: translate(-50%, -50%) scale(1);
      }
    }
  }
</style>
