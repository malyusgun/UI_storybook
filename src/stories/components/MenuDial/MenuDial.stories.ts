import type { Meta, StoryObj } from '@storybook/vue3';

import MenuDial from './MenuDial.vue';

const meta: Meta = {
  title: 'Components/MenuDial',
  component: MenuDial,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A component that represents a button with a drop-down list.',
      },
    },
  },
  argTypes: {
    items: { control: 'object' },
    size: { control: 'select', options: ['small', 'normal', 'large', 'huge'] },
    direction: { control: 'select', options: ['up', 'down', 'left', 'right'] },
    darknessTheme: { control: 'select', options: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] },
    darknessIconColor: { control: 'select', options: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] },
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
    iconColor: {
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
} satisfies Meta<typeof MenuDial>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    items: [
      {
        label: 'First',
      },
      {
        label: 'Second',
      },
    ],

    theme: 'white',
  },
};

export const Full: Story = {
  args: {
    items: [
      {
        label: 'font-family link',
        theme: 'green',
        link: 'https://developer.mozilla.org/en-US/docs/Web/CSS/font-family',
        linkBlank: true,
      },
      {
        label: 'Second',
        theme: 'green',
        textStyle: 'italic',
      },
    ],

    theme: 'sky',
  },
};

export const Down: Story = {
  args: {
    items: [
      {
        label: 'font-family link',
        theme: 'green',
        darknessTheme: 700,
        link: 'https://developer.mozilla.org/en-US/docs/Web/CSS/font-family',
        linkBlank: true,
      },
      {
        label: 'Second',
        theme: 'green',
        darknessTheme: 800,
        textStyle: 'italic',
      },
    ],
    theme: 'red',
    darknessTheme: 700,
    direction: 'down',
  },
};

export const Huge: Story = {
  args: {
    items: [
      {
        label: 'font-family link',
        theme: 'green',
        darknessTheme: 700,
        link: 'https://developer.mozilla.org/en-US/docs/Web/CSS/font-family',
        linkBlank: true,
      },
      {
        label: 'Second',
        theme: 'green',
        darknessTheme: 800,
        textStyle: 'italic',
      },
    ],

    theme: 'red',
    darknessTheme: 700,
    direction: 'right',
    size: 'normal',
  },
};
