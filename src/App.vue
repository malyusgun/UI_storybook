<script setup lang="ts">
// import Playground from '@/Playground.vue';
import MonoIcons from '@/preview/MonoIcons.vue';
import ComponentsDocs from '@/preview/ComponentsDocs.vue';
</script>

<template>
  <main class="main">
    <header class="header">
      <h1 class="title"><img class="favicon" src="/feather.svg" alt="Feather icon" />FeatherUI</h1>
    </header>
    <article class="content">
      <ComponentsDocs class="docs" />
      <MonoIcons />
      <!--      <Playground />-->
    </article>
  </main>
</template>

<style scoped>
.main {
  background: #1a1a1a;
  font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  * {
    color: white;
  }
}
.content {
  margin: 0 auto;
  padding: 0 100px;
  max-width: 1200px;
  @media screen and (width < 900px) {
    padding: 0 60px;
  }
  @media screen and (width < 700px) {
    padding: 0 40px;
  }
}
.header {
  background: #000000;
  padding: 20px;
  margin-bottom: 20px;
}
.title {
  font-size: 48px;
  font-style: italic;
  width: max-content;
  margin: 0 auto;
  background: linear-gradient(to right, #d94c8b, dodgerblue, #d94c8b);
  background-clip: text;
  color: transparent;
}
.favicon {
  width: 50px;
}
.docs {
  margin-bottom: 40px;
}
</style>
