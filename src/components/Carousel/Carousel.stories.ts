import type { Meta, StoryObj } from '@storybook/vue3';

import Carousel from './Carousel.vue';

const meta: Meta = {
  title: 'Components/Carousel',
  component: Carousel,
  tags: ['data'],
  parameters: {
    docs: {
      description: {
        component: 'A component to define number inputs with a dial.',
      },
    },
  },
  argTypes: {
    itemsProps: { control: 'object' },
    innerWidth: { control: 'text' },
    perView: { control: 'number' },
    perScroll: { control: 'number' },
    circular: { control: 'boolean' },
    buttonsBelow: { control: 'boolean' },
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
  },
} satisfies Meta<typeof Carousel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Simple: Story = {
  args: {},
};

export const Half: Story = {
  args: {
    circular: true,
    perView: 2,
    perScroll: 1,

    itemsProps: [
      {
        header: 'First',
        text: 'Some text',
      },
      {
        header: 'Second',
        text: 'Some text',
      },
      {
        header: 'Third',
        text: 'Some text',
      },
      {
        header: 'Forth',
        text: 'Some text',
      },
    ],

    theme: 'sky',
  },
};

export const Full: Story = {
  args: {
    circular: true,
    perView: 2,
    perScroll: 2,

    itemsProps: [
      {
        header: 'First',
        text: 'Some text',
      },
      {
        header: 'Second',
        text: 'Some text',
      },
      {
        header: 'Third',
        text: 'Some text',
      },
      {
        header: 'Forth',
        text: 'Some text',
      },
      {
        header: 'Fifth',
        text: 'Some text',
      },
    ],

    buttonsBelow: true,
    theme: 'green',
    size: 'large',
    innerWidth: '500px',
  },
};
