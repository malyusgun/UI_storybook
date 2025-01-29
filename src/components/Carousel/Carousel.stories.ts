import type { Meta, StoryObj } from '@storybook/vue3';

import Carousel from './Carousel.vue';

const meta: Meta = {
  title: 'Components/Carousel',
  component: Carousel,
  tags: ['pick'],
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
} satisfies Meta<typeof Carousel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Simple: Story = {
  args: {},
};
