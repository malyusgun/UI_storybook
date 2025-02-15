import type { Meta, StoryObj } from '@storybook/vue3';

import Slider from './Slider.vue';

const meta: Meta = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['pick'],
  parameters: {
    docs: {
      description: {
        component: 'A component to provide input with a drag handle.',
      },
    },
  },
  argTypes: {
    options: { control: 'object' },
    width: { control: 'text' },
    min: { control: 'text' },
    max: { control: 'text' },
    step: { control: 'text' },
    size: { control: 'select', options: ['small', 'normal', 'large', 'huge'] },
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
    isSmooth: { control: 'boolean' },
    darknessTheme: { control: 'select', options: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] },
    darknessBackgroundColor: {
      control: 'select',
      options: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    },
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
    backgroundColor: {
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
  args: {},
} satisfies Meta<typeof Slider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Simple: Story = {
  args: {},
};

export const Full: Story = {
  args: {
    min: '0',
    max: '20',
    step: '2',
    size: 'large',
    backgroundColor: 'black',
    theme: 'blue',
    isSmooth: true,

    options: [
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
        value: 18,
        color: 'purple',
      },
      {
        label: 20,
        value: 20,
        color: 'purple',
      },
    ],

    width: '300',
  },
};

export const Smooth: Story = {
  args: {
    max: '1000',
    isSmooth: true,
    width: '300',
    size: 'normal',
    backgroundColor: 'blue',
    theme: 'black',
  },
};
