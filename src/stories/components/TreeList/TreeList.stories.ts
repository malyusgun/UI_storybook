import type { Meta, StoryObj } from '@storybook/vue3';

import TreeList from './TreeList.vue';

const meta: Meta = {
  title: 'Components/TreeList',
  component: TreeList,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A component that is used to select a value from a list using a TreeList.',
      },
    },
  },
  argTypes: {
    items: { control: 'array' },
    maxWidth: { control: 'number' },
    expand: { control: 'boolean' },
    disabled: { control: 'boolean' },
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
} satisfies Meta<typeof TreeList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    items: [
      {
        label: 'First',
        children: [
          {
            label: '1-1',
            children: [
              {
                label: '1-1-1',
              },
              {
                label: '1-1-2',
              },
            ],
          },
          {
            label: '1-2',
          },
        ],
      },
      {
        label: 'Second',
        children: [
          {
            label: '2-1',
          },
        ],
      },
    ],
  },
};

export const Full: Story = {
  args: {},
};
