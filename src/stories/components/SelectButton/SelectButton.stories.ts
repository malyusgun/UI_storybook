import type { Meta, StoryObj } from '@storybook/vue3';

import SelectButton from './SelectButton.vue';
import { fn } from '@storybook/test';

const meta: Meta = {
  title: 'Components/SelectButton',
  component: SelectButton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A component that is used to select a value from a list using a button.',
      },
    },
  },
  argTypes: {
    options: {
      control: 'array',
    },
    size: { control: 'select', options: ['small', 'medium', 'large', 'huge'] },
    rounded: { control: 'boolean' },
    activeBgColor: {
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
    border: {
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
    disabled: { control: 'boolean' },
  },
  args: {
    // primary: false,
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    onClick: fn(),
  },
} satisfies Meta<typeof SelectButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    options: [
      {
        label: 'First',
      },
      {
        label: 'Second',
      },
    ],

    rounded: false,
    disabled: false,
  },
};

export const LargeFull: Story = {
  args: {
    options: [
      {
        label: 'First',
        color: 'white',
        backgroundColor: 'black',
      },
      {
        label: 'Second',
        activeColor: 'blue',
        backgroundColor: 'yellow',
      },
      {
        label: 'Third',
        activeColor: 'green',
        backgroundColor: 'purple',
      },
    ],

    border: 'sky',
    activeBgColor: 'red',
    rounded: true,
    disabled: false,
    size: 'large',
  },
};
