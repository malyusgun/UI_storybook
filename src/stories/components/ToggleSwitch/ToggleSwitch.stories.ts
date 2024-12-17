import type { Meta, StoryObj } from '@storybook/vue3';

import ToggleSwitch from './ToggleSwitch.vue';

const meta: Meta = {
  title: 'Components/ToggleSwitch',
  component: ToggleSwitch,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A component that is used to select a boolean value.',
      },
    },
  },
  argTypes: {
    active: { control: 'boolean' },
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
    disabled: { control: 'boolean' },
  },
  args: {},
} satisfies Meta<typeof ToggleSwitch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    darkNegative: true,
    active: false,
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
