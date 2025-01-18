import type { Meta, StoryObj } from '@storybook/vue3';

import Checkbox from './Checkbox.vue';

const meta: Meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'An extension of standard checkbox.',
      },
    },
  },
  argTypes: {
    invalid: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    name: { control: 'text' },
    size: { control: 'select', options: ['small', 'normal', 'large', 'huge'] },
    labelPos: { control: 'select', options: ['left', 'top', 'right', 'bottom'] },
    darknessTheme: { control: 'select', options: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] },
    darknessActiveTheme: {
      control: 'select',
      options: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    },
    darknessTextColor: {
      control: 'select',
      options: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    },
    darknessBorder: {
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
    activeTheme: {
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
    textColor: {
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
    borderColor: {
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
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Simple: Story = {
  args: {
    active: true,
  },
};

export const Small: Story = {
  args: {
    active: false,
    size: 'small',
    theme: 'yellow',
    activeTheme: 'blue',
    darknessTheme: '300',
    darknessActiveTheme: '700',
    label: 'Are you gay?',
  },
};

export const Large: Story = {
  args: {
    active: true,
    size: 'large',
    theme: 'green',
    activeTheme: 'sky',
    darknessTheme: '700',
    darknessActiveTheme: '300',
    label: 'Checkbox',
    labelPos: 'top',
    invalid: true,
  },
};

export const Huge: Story = {
  args: {
    active: false,
    size: 'huge',
    theme: 'indigo',
    activeTheme: 'purple',
    darknessTheme: '500',
    darknessActiveTheme: '500',
    label: 'Checkbox',
    textColor: 'blue',
    invalid: false,
    disabled: true,
    labelPos: 'left',
  },
};
