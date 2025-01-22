import type { Meta, StoryObj } from '@storybook/vue3';

import Rating from './Rating.vue';

const meta: Meta = {
  title: 'Components/Rating',
  component: Rating,
  tags: ['pick'],
  parameters: {
    docs: {
      description: {
        component: 'A component that is used as a rating.',
      },
    },
  },
  argTypes: {
    count: { control: 'number' },
    gap: { control: 'text' },
    size: { control: 'select', options: ['small', 'normal', 'large', 'huge'] },
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
    offTheme: {
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
} satisfies Meta<typeof Rating>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Simple: Story = {
  args: {},
};

export const Small: Story = {
  args: {
    size: 'small',
    theme: 'yellow',
    offTheme: 'black',
  },
};

export const Full: Story = {
  args: {
    theme: 'sky',
    darknessTheme: '400',
    count: 7,
    gap: '2px',
    size: 'huge',
  },
};
