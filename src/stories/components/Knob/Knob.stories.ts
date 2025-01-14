import type { Meta, StoryObj } from '@storybook/vue3';

import Knob from './Knob.vue';

const meta: Meta = {
  title: 'Components/Knob',
  component: Knob,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A component that is used as a Knob. Can be used with icon.',
      },
    },
  },
  argTypes: {
    buttons: { control: 'boolean' },
    showLabel: { control: 'boolean' },
    min: { control: 'text' },
    max: { control: 'text' },
    step: { control: 'text' },
    size: { control: 'Knob', options: ['small', 'normal', 'large', 'huge'] },
    darknessTheme: { control: 'Knob', options: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] },
    darknessNegativeTheme: {
      control: 'Knob',
      options: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    },
    theme: {
      control: 'Knob',
      options: [
        'white',
        'blue',
        'sky',
        'cyan',
        'teal',
        'green',
        'yellow',
        'orange',
        'pink',
        'fuchsia',
        'purple',
        'indigo',
        'rose',
        'red',
        'black',
      ],
    },
    negativeTheme: {
      control: 'Knob',
      options: [
        'white',
        'blue',
        'sky',
        'cyan',
        'teal',
        'green',
        'yellow',
        'orange',
        'pink',
        'fuchsia',
        'purple',
        'indigo',
        'rose',
        'red',
        'black',
      ],
    },
  },
} satisfies Meta<typeof Knob>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Simple: Story = {
  args: {
    options: [
      {
        value: 'First',
      },
      {
        value: 'Second',
      },
      {
        value: 'Third',
      },
    ],
  },
};

export const Full: Story = {
  args: {
    options: [
      {
        value: 'First',
        iconLeft: 'At',
        color: 'purple',
        darknessColor: '800',
        group: 'Group',
      },
      {
        value: 'Second',
        iconRightColor: 'red',
        iconRight: 'Age18',
        group: 'Group',
      },
      {
        iconLeft: 'Calendar',
        value: 'Third',
        iconRight: 'CheckMark',
        group: 'Group 2',
      },
      {
        value: 'Sssss',
      },
    ],
    groups: [
      { name: 'Group', background: 'white', iconLeft: 'Archive' },
      { name: 'Group 2', background: 'red', iconLeft: 'Badge' },
    ],
    placeholder: 'Knob a city',
    size: 'normal',
    width: '250px',
    theme: 'sky',
    background: 'sky',
    darknessTheme: '700',
    darknessBackground: '200',
    openIconColor: 'sky',
  },
};
