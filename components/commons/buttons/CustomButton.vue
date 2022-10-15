<template>
  <button class="custom-buttom" :class="buttonClasses">
    <slot />
  </button>
</template>

<script lang="ts" setup>
  interface IButtonProps {
    size?: string;
    theme?: string;
  }

  enum ButtonSizes {
    SM = 'size-sm',
    MD = 'size-md',
    LG = 'size-lg',
  }

  enum ButtonThemes {
    PRIMARY = 'theme-primary',
    SUCCESS = 'theme-success',
  }

  const buttonProps = withDefaults<IButtonProps, Required<IButtonProps>>(
    defineProps<IButtonProps>(),
    {
      size: 'MD',
      theme: 'PRIMARY',
    }
  );

  const buttonClasses = computed<string>(() => {
    const prefix = 'custom-buttom--';

    return `
    ${prefix}${ButtonSizes[buttonProps.size as keyof typeof ButtonSizes]} 
    ${prefix}${ButtonThemes[buttonProps.theme as keyof typeof ButtonThemes]}`;
  });
</script>

<style lang="scss">
  .custom-buttom {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-align: center;

    cursor: pointer;
    transition: all 0.3s ease;
    border-radius: 5px;
    font-weight: 400;

    // .custom-buttom--size-sm
    &--size-sm {
      padding: 5px 10px;
      font-size: 14px;
    }

    // .custom-buttom--size-md
    &--size-md {
      padding: 10px 14px;
      font-size: 16px;
    }

    // .custom-buttom--size-lg
    &--size-lg {
      padding: 14px 20px;
      font-size: 16px;
    }

    // .custom-buttom--theme-primary
    &--theme-primary {
      background-color: rgb(47, 78, 216);

      color: #fff;

      &:hover {
        background-color: rgb(46, 65, 146);
        color: #fff;
      }

      &:active {
        background-color: rgb(47, 78, 216);
        color: #fff;
      }
    }

    // .custom-buttom--theme-success
    &--theme-success {
      background-color: rgb(47, 216, 103);

      color: #fff;

      &:hover {
        background-color: rgb(46, 155, 83);

        color: #fff;
      }

      &:active {
        background-color: rgb(47, 216, 103);
        color: #fff;
      }
    }
  }
</style>
