<template>
  <div class="layout-wrapper"><slot></slot></div>
</template>

.
<style lang="scss">
  .layout-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    min-height: 100vh;
  }
</style>
