<script setup lang="ts">
import Modal from '@stories/components/Modal/Modal.vue';
import ToggleSwitch from '@stories/components/ToggleSwitch/ToggleSwitch.vue';
import AnchorLinkIcon from '@stories/icons/Mono/AnchorLinkIcon.vue';
import SelectButton from '@stories/components/SelectButton/SelectButton.vue';
import Drawer from '@stories/components/Drawer/Drawer.vue';
import Slider from '@stories/components/Slider/Slider.vue';
import TrashIcon from '@stories/icons/Mono/TrashIcon.vue';
import CrossIcon from '@stories/icons/Mono/CrossIcon.vue';
import Button from '@stories/components/Button/Button.vue';
import MenuDial from '@stories/components/MenuDial/MenuDial.vue';
import Popup from '@stories/components/Popup/Popup.vue';
import Table from '@stories/components/Table/Table.vue';
import { ref } from 'vue';
import type { ISBOption, ISliderOptions, ITableColumn } from '@interfaces/componentsProp';

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
    sortable: true,
  },
  {
    name: 'Age',
    type: 'text',
    filterable: true,
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
];
const tableData = [
  [
    {
      value: 'Pete',
    },
    {
      value: '30',
    },
    {
      value: 'Chess',
    },
    {
      value: 'USA',
    },
  ],
  [
    {
      value: 'John',
    },
    {
      value: '25',
    },
    {
      value: 'Football',
    },
    {
      value: 'Canada',
    },
  ],
  [
    {
      value: 'Дима',
    },
    {
      value: '22',
    },
    {
      value: 'Frontend',
    },
    {
      value: 'Russia',
    },
  ],
  [
    {
      value: 'Ксюша',
    },
    {
      value: '32',
    },
    {
      value: 'Frontend',
    },
    {
      value: 'Russia',
    },
  ],
  [
    {
      value: 'Ксюша',
    },
    {
      value: '32',
    },
    {
      value: 'Backend',
    },
    {
      value: 'Russia',
    },
  ],
];
</script>

<template>
  <h2 class="title gradient-text">Playground</h2>
  <Table
    show-all-lines
    :columns="tableColumns"
    darknessTextColor="500"
    :data="tableData"
    fontSize="20px"
    theme="black"
    stripedRows
  ></Table>
  <button class="testButton" @click="visibleDrawer = !visibleDrawer">Нажми меня</button>
  <div class="hui" style="width: 500px; height: 500px; background-color: gray"></div>
  <Popup v-model:active="popupActive" parentSelector=".hui" theme="sky">
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
  <Popup v-model:active="popupActive2" theme="sky"
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
  <Drawer v-model:visible="visibleDrawer" theme="sky" :dismissible="false" closeIcon="CropIcon">
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
