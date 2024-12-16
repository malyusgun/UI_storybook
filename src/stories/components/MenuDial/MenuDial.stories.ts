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
    size: { control: 'select', options: ['small', 'medium', 'large', 'huge'] },
    direction: { control: 'select', options: ['top', 'bottom', 'left', 'right'] },
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
  },
  args: {
    // primary: false,
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  },
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
        label: 'First',
        theme: 'green',
      },
      {
        label: 'Second',
        theme: 'green',
      },
    ],

    theme: 'sky',
  },
};
