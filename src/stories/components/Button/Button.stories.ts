import type { Meta, StoryObj } from '@storybook/vue3';

import Button from './Button.vue';

const meta: Meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A component that is used as a button. Can be used with icon.',
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    size: { control: 'select', options: ['small', 'normal', 'large', 'huge'] },
    textStyle: { control: 'select', options: ['bold', 'italic'] },
    iconPos: { control: 'select', options: ['left', 'top', 'right', 'bottom'] },
    width: { control: 'text' },
    darknessTheme: { control: 'select', options: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] },
    darknessTextColor: {
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
  },
  args: {},
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Simple: Story = {
  args: {},
};

export const LargeFull: Story = {
  args: {
    label: 'Press me!',
    size: 'large',
    textStyle: 'bold',
    iconPos: 'left',
    width: '200',
    theme: 'sky',
    textColor: 'white',
    border: 'black',
  },
};
