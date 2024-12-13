import type { Meta, StoryObj } from '@storybook/vue3';

import Slider from './Slider.vue';
import type { TThemeColor } from '@interfaces/common';

const meta: Meta = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A component to provide input with a drag handle.',
      },
    },
  },
  argTypes: {
    options: { control: 'array' },
    width: { control: 'text' },
    min: { control: 'text' },
    max: { control: 'text' },
    step: { control: 'text' },
    size: { control: 'select', options: ['small', 'medium', 'large', 'huge'] },
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
    isSmooth: { control: 'boolean' },
    theme: {
      control: 'select',
      options: [
        'white',
        'slate',
        'blue',
        'sky',
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
        'slate',
        'blue',
        'sky',
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
  args: {
    // primary: false,
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  },
} satisfies Meta<typeof Slider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

export const Full: Story = {
  args: {
    min: '0',
    max: '10',
    step: '2',
    size: 'small',
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
    ],
  },
};
