import type { Meta, StoryObj } from '@storybook/vue3';

import Divider from './Divider.vue';

const meta: Meta = {
  title: 'Components/Divider',
  component: Divider,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A component that is used to separate content.',
      },
    },
  },
  argTypes: {
    height: { control: 'number' },
    type: { control: 'select', options: ['solid', 'dashed', 'dotted'] },
    darknessColor: { control: 'select', options: [100, 200, 300, 400, 500, 600, 700, 800, 900] },
    color: {
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
} satisfies Meta<typeof Divider>;

export default meta;

type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  args: {},
};

export const RedDashed: Story = {
  args: {
    height: 2,
    color: 'red',
    type: 'dashed',
  },
};
