import type { Meta, StoryObj } from '@storybook/vue3';

import Paginator from './Paginator.vue';

const meta: Meta = {
  title: 'Components/Paginator',
  component: Paginator,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A component to display data in paged format and provide navigation between pages.',
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
} satisfies Meta<typeof Paginator>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Simple: Story = {
  args: {},
};
