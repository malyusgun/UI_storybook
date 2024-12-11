import type { Meta, StoryObj } from '@storybook/vue3';

import ToggleSwitch from './ToggleSwitch.vue';

const meta: Meta = {
  title: 'Components/ToggleSwitch',
  component: ToggleSwitch,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['small', 'medium', 'large', 'huge'] },
    negativeTheme: {
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
    darkNegative: { control: 'boolean' },
  },
  args: {
    // primary: false,
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    // onClick: fn(),
  },
} satisfies Meta<typeof ToggleSwitch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    darkNegative: true,
  },
};

export const SmallLight: Story = {
  args: {
    darkNegative: false,
    negativeTheme: 'yellow',
    theme: 'red',
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    darkNegative: true,
    negativeTheme: 'purple',
    theme: 'green',
    size: 'large',
  },
};

export const Huge: Story = {
  args: {
    darkNegative: true,
    negativeTheme: 'blue',
    theme: 'orange',
    size: 'huge',
  },
};
