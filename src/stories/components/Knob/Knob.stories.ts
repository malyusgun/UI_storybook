import type { Meta, StoryObj } from '@storybook/vue3';

import Knob from './Knob.vue';

const meta: Meta = {
  title: 'Components/Knob',
  component: Knob,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A component to define number inputs with a dial.',
      },
    },
  },
  argTypes: {
    buttons: { control: 'boolean' },
    showLabel: { control: 'boolean' },
    colorAsTheme: { control: 'boolean' },
    textBold: { control: 'boolean' },
    value: { control: 'number' },
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    fontSize: { control: 'text' },
    textBefore: { control: 'text' },
    textAfter: { control: 'text' },
    colorGaps: { control: 'object' },
    size: { control: 'select', options: ['small', 'normal', 'large', 'huge'] },
    background: { control: 'color' },
    darknessTheme: { control: 'select', options: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] },
    darknessNegativeTheme: {
      control: 'select',
      options: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    },
    darknessColor: { control: 'select', options: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] },
    theme: {
      control: 'select',
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
      control: 'select',
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
    color: {
      control: 'select',
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
  args: {},
};

export const Half: Story = {
  args: {
    textBold: true,
    colorAsTheme: true,
    showLabel: true,
    min: 0,
    max: 5000,
    theme: 'red',
    negativeTheme: 'yellow',
    value: 2500,
    textAfter: '',
    textBefore: '$',
    step: 1,
    fontSize: '1.3rem',
  },
};

export const Full: Story = {
  args: {
    value: 60,
    min: 0,
    max: 100,
    size: 'huge',

    colorGaps: [
      {
        start: 0,
        end: 20,
        color: 'red',
      },
      {
        start: 20,
        end: 40,
        color: 'orange',
        darknessColor: '400',
      },
      {
        start: 40,
        end: 60,
        color: 'yellow',
        darknessColor: '400',
      },
      {
        start: 60,
        end: 80,
        color: 'green',
        darknessColor: '600',
      },
    ],

    theme: 'blue',
    darknessTheme: '500',
    step: 2,
    textBold: true,
    colorAsTheme: true,
    textBefore: '',
    textAfter: '%',
    buttons: true,
  },
};
