<script setup lang="ts">
import Drawer from '@stories/components/Drawer/Drawer.vue';
import { ref } from 'vue';
import Age18Icon from '@stories/icons/Mono/Age18Icon.vue';
import AlarmIcon from '@stories/icons/Mono/AlarmIcon.vue';
import AirplaneIcon from '@stories/icons/Mono/AirplaneIcon.vue';
import ArrowLeftIcon from '@stories/icons/Mono/ArrowLeftIcon.vue';
import ArrowForwardIcon from '@stories/icons/Mono/ArrowForwardIcon.vue';
import ArchiveIcon from '@stories/icons/Mono/ArchiveIcon.vue';
import AnchorLinkIcon from '@stories/icons/Mono/AnchorLinkIcon.vue';
import AnchorIcon from '@stories/icons/Mono/AnchorIcon.vue';
import AlignRightIcon from '@stories/icons/Mono/AlignRightIcon.vue';
import AlignLeftIcon from '@stories/icons/Mono/AlignLeftIcon.vue';
import AlignCenterIcon from '@stories/icons/Mono/AlignCenterIcon.vue';
import ArrowRightIcon from '@stories/icons/Mono/ArrowRightIcon.vue';
import AtIcon from '@stories/icons/Mono/AtIcon.vue';
import AwardIcon from '@stories/icons/Mono/AwardIcon.vue';
import BackspaceIcon from '@stories/icons/Mono/BackspaceIcon.vue';
import BadgeIcon from '@stories/icons/Mono/BadgeIcon.vue';
import BallFootballIcon from '@stories/icons/Mono/BallFootballIcon.vue';
import BallIcon from '@stories/icons/Mono/BallIcon.vue';
import BanknoteIcon from '@stories/icons/Mono/BanknoteIcon.vue';
import BellIcon from '@stories/icons/Mono/BellIcon.vue';
import BellOffIcon from '@stories/icons/Mono/BellOffIcon.vue';
import BoxIcon from '@stories/icons/Mono/BoxIcon.vue';
import BrightnessIcon from '@stories/icons/Mono/BrightnessIcon.vue';
import BulbIcon from '@stories/icons/Mono/BulbIcon.vue';
import CalculatorIcon from '@stories/icons/Mono/CalculatorIcon.vue';
import CalendarIcon from '@stories/icons/Mono/CalendarIcon.vue';
import CalendarAddIcon from '@stories/icons/Mono/CalendarAddIcon.vue';
import CalendarRemoveIcon from '@stories/icons/Mono/CalendarRemoveIcon.vue';
import CardsIcon from '@stories/icons/Mono/CardsIcon.vue';
import ChartLineIcon from '@stories/icons/Mono/ChartLineIcon.vue';
import ChartPieIcon from '@stories/icons/Mono/ChartPieIcon.vue';
import ChatIcon from '@stories/icons/Mono/ChatIcon.vue';
import ChatWritingIcon from '@stories/icons/Mono/ChatWritingIcon.vue';
import CheckmarkIcon from '@stories/icons/Mono/CheckmarkIcon.vue';
import ChemistryFlaskIcon from '@stories/icons/Mono/ChemistryFlaskIcon.vue';
import CodeIcon from '@stories/icons/Mono/CodeIcon.vue';
import CoinsIcon from '@stories/icons/Mono/CoinsIcon.vue';
import ColorPaletteIcon from '@stories/icons/Mono/ColorPaletteIcon.vue';
import CompassIcon from '@stories/icons/Mono/CompassIcon.vue';
import ConstructionWorkerIcon from '@stories/icons/Mono/ConstructionWorkerIcon.vue';
import ContactsIcon from '@stories/icons/Mono/ContactsIcon.vue';
import CropIcon from '@stories/icons/Mono/CropIcon.vue';
import CrossCircleIcon from '@stories/icons/Mono/CrossCircleIcon.vue';
import CrossIcon from '@stories/icons/Mono/CrossIcon.vue';
import CubeIcon from '@stories/icons/Mono/CubeIcon.vue';
import CupIcon from '@stories/icons/Mono/CupIcon.vue';
import CursorIcon from '@stories/icons/Mono/CursorIcon.vue';
import LineDashedIcon from '@stories/icons/Mono/LineDashedIcon.vue';
import LineDiagonalIcon from '@stories/icons/Mono/LineDiagonalIcon.vue';
import DiamondIcon from '@stories/icons/Mono/DiamondIcon.vue';
import DiaryIcon from '@stories/icons/Mono/DiaryIcon.vue';
import DiceIcon from '@stories/icons/Mono/DiceIcon.vue';
import DigIcon from '@stories/icons/Mono/DigIcon.vue';
import DislikeIcon from '@stories/icons/Mono/DislikeIcon.vue';
import DisplayIcon from '@stories/icons/Mono/DisplayIcon.vue';
import DocumentIcon from '@stories/icons/Mono/DocumentIcon.vue';
import DollarIcon from '@stories/icons/Mono/DollarIcon.vue';
import DotsHorizontalIcon from '@stories/icons/Mono/DotsHorizontalIcon.vue';
import DotsVerticalIcon from '@stories/icons/Mono/DotsVerticalIcon.vue';
import LineDottedIcon from '@stories/icons/Mono/LineDottedIcon.vue';
import DownloadIcon from '@stories/icons/Mono/DownloadIcon.vue';
import DropIcon from '@stories/icons/Mono/DropIcon.vue';
import DumbbelIcon from '@stories/icons/Mono/DumbbelIcon.vue';
import EarthIcon from '@stories/icons/Mono/EarthIcon.vue';
import EditIcon from '@stories/icons/Mono/EditIcon.vue';
import EyeIcon from '@stories/icons/Mono/EyeIcon.vue';
import EncyclopediaIcon from '@stories/icons/Mono/EncyclopediaIcon.vue';
import ExitIcon from '@stories/icons/Mono/ExitIcon.vue';
import FeedbackIcon from '@stories/icons/Mono/FeedbackIcon.vue';
import FilterIcon from '@stories/icons/Mono/FilterIcon.vue';
import FingerprintIcon from '@stories/icons/Mono/FingerprintIcon.vue';
import FireIcon from '@stories/icons/Mono/FireIcon.vue';
import FlagIcon from '@stories/icons/Mono/FlagIcon.vue';
import FlashIcon from '@stories/icons/Mono/FlashIcon.vue';
import FlashlightIcon from '@stories/icons/Mono/FlashlightIcon.vue';
import FolderLockIcon from '@stories/icons/Mono/FolderLockIcon.vue';
import FrameIcon from '@stories/icons/Mono/FrameIcon.vue';
import FullScreenIcon from '@stories/icons/Mono/FullScreenIcon.vue';
import GameControllerIcon from '@stories/icons/Mono/GameControllerIcon.vue';
import GiftIcon from '@stories/icons/Mono/GiftIcon.vue';
import GlassesIcon from '@stories/icons/Mono/GlassesIcon.vue';
import HamburgerIcon from '@stories/icons/Mono/HamburgerIcon.vue';
import HandIcon from '@stories/icons/Mono/HandIcon.vue';
import HomeIcon from '@stories/icons/Mono/HomeIcon.vue';
import ImageEditIcon from '@stories/icons/Mono/ImageEditIcon.vue';
import ImageIcon from '@stories/icons/Mono/ImageIcon.vue';
import MoveIcon from '@stories/icons/Mono/MoveIcon.vue';
import DocumentAddIcon from '@stories/icons/Mono/DocumentAddIcon.vue';
import DocumentDeleteIcon from '@stories/icons/Mono/DocumentDeleteIcon.vue';
import DocumentEditIcon from '@stories/icons/Mono/DocumentEditIcon.vue';
import ParagraphIcon from '@stories/icons/Mono/ParagraphIcon.vue';
import PhoneHandsetIcon from '@stories/icons/Mono/PhoneHandsetIcon.vue';
import PlusCircleIcon from '@stories/icons/Mono/PlusCircleIcon.vue';
import PlusIcon from '@stories/icons/Mono/PlusIcon.vue';
import PointerIcon from '@stories/icons/Mono/PointerIcon.vue';
import SaveIcon from '@stories/icons/Mono/SaveIcon.vue';
import SettingsIcon from '@stories/icons/Mono/SettingsIcon.vue';
import LineIcon from '@stories/icons/Mono/LineIcon.vue';
import TableIcon from '@stories/icons/Mono/TableIcon.vue';
import TrashIcon from '@stories/icons/Mono/TrashIcon.vue';
import UserIcon from '@stories/icons/Mono/UserIcon.vue';
import ArrowsVerticalIcon from '@stories/icons/Mono/ArrowsVerticalIcon.vue';
import SelectButton from '@stories/components/SelectButton/SelectButton.vue';
import ToggleSwitch from '@stories/components/ToggleSwitch/ToggleSwitch.vue';
import TriangleIcon from '@stories/icons/Mono/TriangleIcon.vue';
import Button from '@stories/components/Button/Button.vue';
import Slider from '@stories/components/Slider/Slider.vue';
import type { ISBOption, ISliderOptions } from '@interfaces/componentsProp';
import Modal from '@stories/components/Modal/Modal.vue';
import MenuDial from '@stories/components/MenuDial/MenuDial.vue';
import Popup from '@stories/components/Popup/Popup.vue';

const gentleIcons = [
  Age18Icon,
  AirplaneIcon,
  AlarmIcon,
  AlignRightIcon,
  AlignLeftIcon,
  AlignCenterIcon,
  AnchorIcon,
  AnchorLinkIcon,
  ArchiveIcon,
  ArrowForwardIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowsVerticalIcon,
  AtIcon,
  AwardIcon,
  BackspaceIcon,
  BadgeIcon,
  BallFootballIcon,
  BallIcon,
  BanknoteIcon,
  BellIcon,
  BellOffIcon,
  BoxIcon,
  BrightnessIcon,
  BulbIcon,
  CalculatorIcon,
  CalendarIcon,
  CalendarAddIcon,
  CalendarRemoveIcon,
  CardsIcon,
  ChartLineIcon,
  ChartPieIcon,
  ChatIcon,
  ChatWritingIcon,
  CheckmarkIcon,
  ChemistryFlaskIcon,
  CodeIcon,
  CoinsIcon,
  ColorPaletteIcon,
  CompassIcon,
  ConstructionWorkerIcon,
  ContactsIcon,
  CropIcon,
  CrossIcon,
  CrossCircleIcon,
  CubeIcon,
  CupIcon,
  CursorIcon,
  DiamondIcon,
  DiaryIcon,
  DiceIcon,
  DigIcon,
  DislikeIcon,
  DisplayIcon,
  DocumentIcon,
  DocumentAddIcon,
  DocumentDeleteIcon,
  DocumentEditIcon,
  DollarIcon,
  DotsHorizontalIcon,
  DotsVerticalIcon,
  DownloadIcon,
  DropIcon,
  DumbbelIcon,
  EarthIcon,
  EditIcon,
  EncyclopediaIcon,
  ExitIcon,
  EyeIcon,
  FeedbackIcon,
  FilterIcon,
  FingerprintIcon,
  FireIcon,
  FlagIcon,
  FlashIcon,
  FlashlightIcon,
  FolderLockIcon,
  FrameIcon,
  FullScreenIcon,
  GameControllerIcon,
  GiftIcon,
  GlassesIcon,
  HamburgerIcon,
  HandIcon,
  HomeIcon,
  ImageIcon,
  ImageEditIcon,
  LineIcon,
  LineDashedIcon,
  LineDottedIcon,
  LineDiagonalIcon,
  MoveIcon,
  ParagraphIcon,
  PhoneHandsetIcon,
  PlusCircleIcon,
  PlusIcon,
  PointerIcon,
  SaveIcon,
  SettingsIcon,
  TableIcon,
  TrashIcon,
  TriangleIcon,
  UserIcon,
];
const visibleDrawer = ref(true);
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
</script>

<template>
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
        color: 'white',
        link: 'https://developer.mozilla.org/en-US/docs/Web/CSS/font-family',
        linkBlank: true,
        textStyle: 'bold',
      },
      {
        label: 'Second',
        theme: 'red',
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
    orientation="vertical"
    width="400"
    min="0"
    max="18"
    step="2"
    backgroundColor="black"
    theme="blue"
    isSmooth
  />
  <Button @click="visible = true" textColor="white" theme="sky" label="I'm a button"></Button>
  <Button @click="visible = true" theme="sky" darknessTheme="600" label="I'm a button"></Button>
  <Button @click="visible = true" theme="sky" darknessTheme="700" label="I'm a button"></Button>
  <SelectButton :options="options" size="large" v-model:value="value">
    <template #1Icon>
      <TrashIcon />
    </template>
  </SelectButton>
  <ToggleSwitch />
  <Drawer v-model:visible="visibleDrawer" theme="sky" closeIcon="CropIcon">
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
  <main class="main">
    <h2 class="title"><span class="mono">Mono</span> icons</h2>
    <ul class="iconsList">
      <li class="iconsItem" v-for="icon of gentleIcons" :key="icon.__name">
        <component :is="icon" class="icon" />
        <span class="iconName">{{ icon.__name!.slice(0, -4) }}</span>
      </li>
    </ul>
    <button class="testButton" @click="visibleDrawer = !visibleDrawer">Нажми меня</button>
  </main>
</template>

<style scoped>
.main {
  margin: 20px;
  font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
}
.title {
  font-size: 48px;
  width: max-content;
  margin: 0 auto 40px auto;
}
.iconsList {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  gap: 10px;
}
.iconsItem {
  font-size: 14px;
}
.icon {
  display: block;
  width: max-content;
  margin: 0 auto 5px auto;
}
.iconName {
  font-weight: bold;
  display: block;
  width: max-content;
  margin: 0 auto;
}
.mono {
  color: green;
  font-style: italic;
}
.testButton {
  position: absolute;
  right: 50px;
  top: 50px;
  background-color: red;
  color: white;
  padding: 10px;
  border-radius: 5px;
}
</style>
