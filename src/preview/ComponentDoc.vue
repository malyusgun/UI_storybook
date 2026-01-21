<script setup lang="ts">
interface IProps {
  name: string;
  text: string;
  isHorizontalStates?: boolean;
}
defineProps<IProps>();
</script>

<template>
  <div class="container">
    <h3 class="title" :id="name">
      <span class="title__hash">#</span>
      <a :href="'#' + name">{{ name }}</a>
    </h3>
    <div :class="['states', { horizontal: isHorizontalStates }]">
      <slot />
    </div>
    <p class="text">{{ text }}</p>
    <p class="props-title">Принимаемые свойства:</p>
    <pre><slot name="props"/></pre>
    <template v-if="$slots.emits"
      ><p>События:</p>
      <pre><slot name="emits" /></pre>
    </template>
  </div>
</template>

<style scoped>
.container {
  padding: 20px 0;
}
.title {
  font-size: 2rem;
  margin: 0 auto;
  width: max-content;
  cursor: pointer;
  position: relative;

  &:hover {
    .title__hash {
      opacity: 1;
    }
  }

  .title__hash {
    position: absolute;
    top: 0;
    left: -40px;
    transition: opacity 0.2s;
    opacity: 0;
  }
}
.states {
  margin: 10px auto;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  gap: 30px;
}
.horizontal {
  display: inline-flex;
  justify-content: center;
  flex-direction: row;
  width: 100%;
}
.text {
  margin-bottom: 15px;
}
.props-title {
  font-style: italic;
  margin-bottom: 10px;
}
@media screen and (width < 600px) {
  .text {
    font-size: 14px;
  }
  .states {
    gap: 15px;
  }
}
a {
  all: unset;
}
</style>
