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
    color: {
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
    // onClick: fn(),
  },
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
