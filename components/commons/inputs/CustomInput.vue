<template>
  <div class="custom-input">
    <div>
      <label class="custom-input__label" :for="id"><slot /></label>
    </div>
    <input
      class="custom-input__input"
      :class="inputClasses"
      :value="modelValue"
      :type="type"
      :id="id"
      v-bind="$attrs"
      @input="e => onChange(e)"
    />
  </div>
</template>

<script lang="ts" setup>
  import randomString from '@/helpers/randomString';

  interface IInputEmits {
    (e: 'update:modelValue', value: any): void;
  }

  interface IInputProps {
    type?: string;
    modelValue: any;
  }

  const inputProps = withDefaults<IInputProps, Required<IInputProps>>(
    defineProps<IInputProps>(),
    {
      type: 'text',
      modelValue: '',
    }
  );

  const emit = defineEmits<IInputEmits>();

  const id: string = randomString();

  const inputClasses = computed<string>(() => {
    return inputProps.type === 'range' || inputProps.type === 'color'
      ? ''
      : 'custom-input__input--default';
  });

  function onChange(e: Event) {
    if (e.target && e.target instanceof HTMLInputElement)
      emit('update:modelValue', e.target.value);
  }
</script>

<style lang="scss">
  .custom-input {
    // .custom-input__label
    &__label {
      display: inline-block;
      margin-bottom: 8px;
      font-size: 18px;
    }

    // .custom-input__input
    &__input {
      // .custom-input__input--default
      &--default {
        padding: 10px 14px;
        font-size: 16px;
        border: 2px solid $color-primary;
        border-radius: 5px;
      }
    }
  }
</style>
