<script setup lang="ts">
interface IProps {
  keys: string[];
  values: string[];
}
defineProps<IProps>();
</script>

<template>
  <div id="code-block">
    <span class="bracket">{</span>
    <p v-for="(key, index) of keys" :key="key" class="couple">
      <span class="key">{{ '    ' + key }}</span
      >:<span class="value">{{ ' ' + values[index] }};</span>
    </p>
    <span class="bracket">}</span>
  </div>
</template>

<style scoped>
#code-block {
  padding: 10px;
  background: #302d2d;
  .key,
  .value {
    font-family: Menlo, Monaco, Consolas, 'Courier New', monospace;
  }
}
.bracket {
  color: #0ea5e9;
}
.key {
  color: orange;
}
.value {
  color: lawngreen;
}
.couple {
  font-style: italic;
  display: block;
}
@media screen and (width < 600px) {
  .bracket,
  .key,
  .value {
    font-size: 14px;
  }
}
@media screen and (width < 400px) {
  .bracket,
  .key,
  .value {
    font-size: 12px;
  }
}
</style>
