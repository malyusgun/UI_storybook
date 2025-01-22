import type { Meta, StoryObj } from '@storybook/vue3';

import ProgressBar from './ProgressBar.vue';

const meta: Meta = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  tags: ['small_data'],
  parameters: {
    docs: {
      description: {
        component: 'A process status indicator.',
      },
    },
  },
  argTypes: {
    value: { control: 'number' },
    max: { control: 'number' },
    width: { control: 'text' },
    height: { control: 'text' },
    labelBefore: { control: 'text' },
    labelAfter: { control: 'text' },
    showLabel: { control: 'boolean' },
    noBorder: { control: 'boolean' },
    size: { control: 'select', options: ['small', 'normal', 'large', 'huge'] },
    fontSize: { control: 'text' },
    colorGaps: { control: 'object' },
    colorInactiveGaps: { control: 'object' },
    darknessTheme: { control: 'select', options: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] },
    darknessInactiveTheme: {
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
    inactiveTheme: {
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
} satisfies Meta<typeof ProgressBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Simple: Story = {
  args: {
    value: 40,
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    value: 40,
    theme: 'red',
    inactiveTheme: 'red',
    labelAfter: '/100',
    width: '500px',
  },
};

export const Full: Story = {
  args: {
    colorGaps: [
      {
        start: 0,
        end: 10,
        color: 'purple',
        darknessColor: '700',
      },
      {
        start: 10,
        end: 20,
        color: 'red',
      },
      {
        start: 20,
        end: 30,
        color: 'orange',
      },
      {
        start: 30,
        end: 40,
        color: 'yellow',
      },
      {
        start: 40,
        end: 50,
        color: 'green',
      },
    ],

    size: 'huge',
    value: 35,
    max: 50,
    labelAfter: '',
    showLabel: true,
    labelBefore: '$',
    inactiveTheme: 'white',
    darknessInactiveTheme: '400',
    noBorder: true,
  },
};
