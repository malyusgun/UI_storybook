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
    total: { control: 'number' },
    itemsPerPage: { control: 'number' },
    itemsPerPageOptions: { control: 'object' },
    size: { control: 'select', options: ['small', 'normal', 'large', 'huge'] },
    fontSize: { control: 'text' },
    darknessTheme: { control: 'select', options: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] },
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
  },
  args: {},
} satisfies Meta<typeof Paginator>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Simple: Story = {
  args: {},
};

export const Full: Story = {
  args: {
    itemsPerPageOptions: ['10', '20', '30'],
  },
};
