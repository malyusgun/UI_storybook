<script setup lang="ts">
// import Playground from '@/Playground.vue';
import MonoIcons from '@/preview/MonoIcons.vue';
import ComponentsDocs from '@/preview/ComponentsDocs.vue';
import { ref } from 'vue';

const isMenuOpen = ref(true);
const isDesktop = window.innerWidth >= 1100;

if (!isDesktop) {
  isMenuOpen.value = false;
}
</script>

<template>
  <main class="main">
    <header class="header">
      <h1 class="title"><img class="favicon" src="/feather.svg" alt="Feather icon" />FeatherUI</h1>
    </header>

    <div
      :class="[
        'menu',
        {
          '--open': isMenuOpen,
          '--desktop': isDesktop,
        },
      ]"
    >
      <h4 class="menu__title" @click="!isDesktop ? (isMenuOpen = !isMenuOpen) : null">Содержание:</h4>
      <ul>
        <li><a href="#Button" class="menu__item">Button</a></li>
        <li><a href="#Carousel" class="menu__item">Carousel</a></li>
        <li><a href="#Checkbox" class="menu__item">Checkbox</a></li>
        <li><a href="#ColorPicker" class="menu__item">ColorPicker</a></li>
        <li><a href="#Divider" class="menu__item">Divider</a></li>
        <li><a href="#Drawer" class="menu__item">Drawer</a></li>
        <li><a href="#InputDiv" class="menu__item">InputDiv</a></li>
        <li><a href="#Knob" class="menu__item">Knob</a></li>
        <li><a href="#MenuDial" class="menu__item">MenuDial</a></li>
        <li><a href="#Modal" class="menu__item">Modal</a></li>
        <li><a href="#Paginator" class="menu__item">Paginator</a></li>
        <li><a href="#Popup" class="menu__item">Popup</a></li>
        <li><a href="#ProgressBar" class="menu__item">ProgressBar</a></li>
        <li><a href="#Rating" class="menu__item">Rating</a></li>
        <li><a href="#Select" class="menu__item">Select</a></li>
        <li><a href="#SelectButton" class="menu__item">SelectButton</a></li>
        <li><a href="#Slider" class="menu__item">Slider</a></li>
        <li><a href="#Table" class="menu__item">Table</a></li>
        <li><a href="#Tag" class="menu__item">Tag</a></li>
        <li><a href="#Toast" class="menu__item">Toast</a></li>
        <li><a href="#ToggleSwitch" class="menu__item">ToggleSwitch</a></li>
        <li><a href="#TreeList" class="menu__item">TreeList</a></li>
      </ul>
    </div>

    <article class="content">
      <ComponentsDocs class="docs" />
      <MonoIcons />
      <!--      <Playground />-->
    </article>
  </main>
</template>

<style scoped>
.main {
  background: #000000;
  font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  position: relative;

  * {
    color: white;
  }
}
.menu {
  width: max-content;
  padding: 0 20px 10px;
  background-color: #151414;
  border: 2px solid #4a4b4c;
  border-radius: 0 15px 15px 0;
  position: fixed;
  z-index: 9999;
  left: -2px;
  top: 120px;
  overflow-y: hidden;
  transition: height 0.2s ease;
  height: 45px;

  &.--open {
    height: 500px;
  }

  &.--desktop {
    left: 10px;
    border-radius: 15px;

    .menu__title {
      cursor: auto;
    }
  }

  .menu__title {
    font-size: 1.2rem;
    margin: 0 -20px;
    padding: 10px 20px;
    cursor: pointer;
  }

  .menu__item {
    color: #00c600;
    transition: color 0.2s;

    &:hover {
      color: #009dff;
    }
  }
}
.content {
  margin: 0 auto;
  padding: 20px 40px;
  max-width: 1000px;
  background: #35383a;

  @media screen and (width < 1400px) {
    max-width: 700px;
  }
  @media screen and (width < 1100px) {
    max-width: 100%;
  }
  @media screen and (width < 900px) {
    padding: 20px 60px;
  }
  @media screen and (width < 700px) {
    padding: 20px 40px;
  }
}
.header {
  background: #011f37;
  padding: 20px;
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
