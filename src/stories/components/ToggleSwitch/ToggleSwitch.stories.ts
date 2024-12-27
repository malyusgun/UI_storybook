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
    size: { control: 'select', options: ['small', 'normal', 'large', 'huge'] },
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
    darknessTheme: { control: 'select', options: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] },
    darknessNegativeTheme: {
      control: 'select',
      options: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    },
    disabled: { control: 'boolean' },
  },
  args: {},
} satisfies Meta<typeof ToggleSwitch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Simple: Story = {
  args: {
    active: false,
  },
};

export const SmallLight: Story = {
  args: {
    negativeTheme: 'yellow',
    theme: 'red',
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    negativeTheme: 'purple',
    theme: 'green',
    size: 'large',
  },
};

export const Huge: Story = {
  args: {
    negativeTheme: 'blue',
    theme: 'orange',
    size: 'huge',
  },
};
