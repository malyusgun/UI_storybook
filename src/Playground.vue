<script setup lang="ts">
import Modal from '@components/Modal/Modal.vue';
import ToggleSwitch from '@components/ToggleSwitch/ToggleSwitch.vue';
import AnchorLinkIcon from '@icons/Mono/AnchorLinkIcon.vue';
import SelectButton from '@components/SelectButton/SelectButton.vue';
import Drawer from '@components/Drawer/Drawer.vue';
import Slider from '@components/Slider/Slider.vue';
import TrashIcon from '@icons/Mono/TrashIcon.vue';
import CrossIcon from '@icons/Mono/CrossIcon.vue';
import Button from '@components/Button/Button.vue';
import MenuDial from '@components/MenuDial/MenuDial.vue';
import Popup from '@components/Popup/Popup.vue';
import Table from '@components/Table/Table.vue';
import { ref } from 'vue';
import type { ISBOption, ISliderOptions, ITableColumn } from '@interfaces/componentsProp';
import Checkbox from '@components/Checkbox/Checkbox.vue';
import Tag from '@components/Tag/Tag.vue';
import Select from '@components/Select/Select.vue';
import AtIcon from '@icons/Mono/AtIcon.vue';
import Knob from '@components/Knob/Knob.vue';
import Rating from '@components/Rating/Rating.vue';
import HomeIcon from '@icons/Mono/HomeIcon.vue';
import ProgressBar from '@components/ProgressBar/ProgressBar.vue';

const visibleDrawer = ref(false);
const sliderOptions: ISliderOptions[] = [
  {
    label: 0,
    value: 0,
    color: 'red',
  },
  {
    label: 2,
    value: 2,
    color: 'orange',
  },
  {
    label: 4,
    value: 4,
    color: 'yellow',
  },
  {
    label: 6,
    value: 6,
    color: 'green',
  },
  {
    label: 8,
    value: 8,
    color: 'sky',
  },
  {
    label: 10,
    value: 10,
    color: 'purple',
  },
  {
    label: 12,
    value: 12,
    color: 'purple',
  },
  {
    label: 14,
    value: 14,
    color: 'purple',
  },
  {
    label: 16,
    value: 16,
    color: 'purple',
  },
  {
    label: 18,
  },
];
const options: ISBOption[] = [
  {
    label: 'First',
    textStyle: 'bold',
    iconPosition: 'top',
  },
  {
    label: 'Second',
  },
];
const visible = ref(false);
const onClose = () => console.log('close!');
const value = ref();
const active = ref(false);
const popupActive = ref(false);
const popupActive2 = ref(false);
const sliderValue = ref(1);

const tableColumns: ITableColumn[] = [
  {
    name: 'Name',
    type: 'text',
  },
  {
    name: 'Age',
    type: 'number',
    filterable: true,
    sortable: true,
  },
  {
    name: 'Hobbies',
    type: 'text',
    padding: '30px',
    filterable: true,
    sortable: true,
  },
  {
    name: 'Country',
    type: 'text',
  },
  {
    name: 'Is gay?',
    type: 'checkbox',
  },
  {
    name: 'Status',
    type: 'select',
    options: {
      options: [{ value: 'Married' }, { value: 'Oh no...(s)he is dead' }],
      theme: 'black',
    },
  },
  {
    name: 'Children',
    type: 'rating',
    options: {
      theme: 'yellow',
    },
  },
  {
    name: 'Job progress',
    type: 'progressBar',
    options: {
      theme: 'red',
      width: '150px',
      size: 'small',
    },
  },
  {
    name: 'Strength',
    type: 'knob',
    options: {},
  },
];
const tableData = ref([
  ['Pete', '30', 'Chess', 'USA', false, 'Married', 0, 30, 2],
  ['John', '7', 'Football', 'Canada', true, 'Married', 0, 30, 2],
  ['Дима', '22', 'Frontend', 'Russia', false, 'Married', 0, 30, 2],
  ['Ксюша', '32', 'Frontend', 'Russia', false, 'Married', 0, 30, 2],
  ['Ксюша', '32', 'Backend', 'Russia', false, 'Married', 0, 30, 2],
]);
const activeCheckbox = ref();
const selectOptions = [
  {
    value: 'First',
  },
  {
    value: 'Second',
  },
];
const knob = ref(0);
const pbValue = ref(0);
</script>

<template>
  <h2 class="title gradient-text">Playground</h2>
  <Rating theme="red">
    <template #offIcon>
      <CrossIcon color="red" />
    </template>
    <template #onIcon>
      <HomeIcon color="blue" />
    </template>
  </Rating>
  <Knob v-model="knob" />
  <Select :options="selectOptions" theme="sky">
    <template #icon-left-First>
      <AtIcon color="#3aa" size="20" />
    </template>
  </Select>
  <Tag theme="sky">
    <template #icon-right><TrashIcon color="#3333aa" size="18" /></template>
  </Tag>
  {{ activeCheckbox }}
  <Checkbox v-model="activeCheckbox" size="small" />
  <Checkbox v-model="activeCheckbox" />
  <Checkbox v-model="activeCheckbox" size="large" />
  <Checkbox v-model="activeCheckbox" size="huge" />
  <ProgressBar v-model="pbValue" />
  {{ tableData[1] }}
  <Table
    center
    show-all-lines
    :columns="tableColumns"
    darknessTextColor="500"
    v-model="tableData"
    theme="black"
    stripedRows
    editable
    :no-editing-settings="{
      cells: [[0, 0]],
    }"
    :handlers="[
      {
        cell: [0, 0],
        handler: () => (visibleDrawer = true),
      },
    ]"
  ></Table>
  <button class="testButton" @click="visibleDrawer = !visibleDrawer">Нажми меня</button>
  <div class="hui" style="width: 500px; height: 500px; background-color: gray"></div>
  <Popup v-model="popupActive" parentSelector=".hui" theme="sky">
    <Button
      @click="
        () => {
          popupActive = false;
          visible = true;
        }
      "
      label="Открыть модальное окно"
    />
  </Popup>
  <Popup v-model="popupActive2" theme="sky"
    >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet fugiat harum maiores placeat soluta, vel velit
    voluptas. Accusamus aut, error et minima neque praesentium, ratione, reprehenderit repudiandae saepe ut vero! Lorem
    ipsum dolor sit amet, consectetur adipisicing elit. Amet fugiat harum maiores placeat soluta, vel velit voluptas.
    Accusamus aut, error et minima neque praesentium, ratione, reprehenderit repudiandae saepe ut vero!</Popup
  >

  <Modal v-model:visible="visible" theme="red" @onClose="onClose"
    ><template #header>huuuuuuuuuuui</template>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque
    explicabo, facere fuga hic id impedit magnam maiores minima necessitatibus, nemo nesciunt nihil officia, pariatu
    nemo nesciunt nihil officia, pariatur praesentium quas quisquam repellat saepe temporibus? Lorem ipsum dolor sit
    amet, consectetur adipisicing elit. Eaque explicabo, facere fuga hic id impedit magnam maiores minima
    necessitatibus, nemo nesciunt nihil officia, pariatu nemo nesciunt nihil officia, pariatur praesentium quas quisquam
    repellat saepe temporibus?</Modal
  >
  <MenuDial
    v-model:active="active"
    theme="sky"
    direction="right"
    darknessTheme="600"
    :items="[
      {
        label: 'font-family',
        theme: 'green',
        color: 'red',
        darknessColor: '500',
        link: 'https://developer.mozilla.org/en-US/docs/Web/CSS/font-family',
        linkBlank: true,
        textStyle: 'bold',
      },
      {
        label: 'Second',
        theme: 'red',
        color: 'sky',
        darknessColor: '500',
        darknessTheme: '600',
        textStyle: 'italic',
      },
    ]"
  >
    <template #1IconBefore>
      <AnchorLinkIcon size="20" color="white" />
    </template>
    <template #2IconBefore>
      <CrossIcon color="white" />
    </template>
    <template #2IconAfter>
      <CrossIcon color="white" />
    </template>
  </MenuDial>
  <Slider
    v-model:value="sliderValue"
    :options="sliderOptions"
    width="400"
    min="0"
    max="18"
    step="2"
    backgroundColor="black"
    theme="blue"
    isSmooth
  />
  <Button @click="visible = true" textColor="white" theme="sky" label="I'm a button"></Button>
  <SelectButton :options="options" size="large" v-model:value="value">
    <template #1Icon>
      <TrashIcon />
    </template>
  </SelectButton>
  <ToggleSwitch />
  <Drawer v-model:visible="visibleDrawer" theme="sky" :dismissible="false" closeIcon="Crop">
    <template #header>Это - Drawer</template>
    <p>
      pizdwertyuki lokl,kmjhgfwewesrdty ukilo,kmjngeartyukikdhgfgjhklj.,kga Lorem ipsum dolor sit amet, consectetur
      adipisicing elit. Amet deleniti, esse in ipsam quis sapiente tempore voluptas. Aperiam dignissimos enim, fuga
      fugit, modi, nam necessitatibus numquam obcaecati omnis recusandae voluptatibus! Lorem ipsum dolor sit amet,
      consectetur adipisicing elit. Atque blanditiis consectetur cum delectus ducimus eius est hic incidunt iusto
      molestiae odio optio reiciendis reprehenderit saepe tempora vel, veniam veritatis voluptates. Lorem ipsum dolor
      sit amet, consectetur adipisicing elit. Ducimus expedita laboriosam nesciunt voluptatum! Ab animi illum impedit
      iusto libero magni maxime molestias nisi nobis possimus provident quia repellat, rerum suscipit. Lorem ipsum dolor
      sit amet, consectetur adipisicing elit. Autem modi ratione reiciendis. Cupiditate deserunt eaque eum labore qui
      rem? Consequatur corporis, dolorem doloremque eveniet facilis obcaecati quasi repellat vel velit. pizdwertyuki
      lokl,kmjhgfwewesrdty ukilo,kmjngeartyukikdhgfgjhklj.,kga Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      Amet deleniti, esse in ipsam quis sapiente tempore voluptas. Aperiam dignissimos enim, fuga fugit, modi, nam
      necessitatibus numquam obcaecati omnis recusandae voluptatibus! Lorem ipsum dolor sit amet, consectetur
      adipisicing elit. Atque blanditiis consectetur cum delectus ducimus eius est hic incidunt iusto molestiae odio
      optio reiciendis reprehenderit saepe tempora vel, veniam veritatis voluptates. Lorem ipsum dolor sit amet,
      consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque explicabo, facere
      fuga hic id impedit magnam maiores minima necessitatibus, nemo nesciunt nihil officia, pariatu nemo nesciunt nihil
      officia, pariatur praesentium quas quisquam repellat saepe temporibus?
    </p>
    <template #footer> pizdwertyukilokl,kmjhgfw ewesrdtyukilo,kmjng eartyukikdhgfgjhklj.,kga</template></Drawer
  >
</template>

<style scoped>
.title {
  font-size: 48px;
  width: max-content;
  margin: 0 auto 40px auto;
}
.testButton {
  background-color: red;
  margin-bottom: 30px;
  color: white;
  padding: 10px;
  border-radius: 5px;
}
.gradient-text {
  background: linear-gradient(to right, hotpink, yellow, dodgerblue);
  background-clip: text;
  color: transparent;
}
</style>
