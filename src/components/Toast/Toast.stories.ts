import type { Meta, StoryObj } from '@storybook/vue3';

import Toast from './Toast.vue';

const meta: Meta = {
  title: 'Components/Toast',
  component: Toast,
  tags: ['small_data'],
  parameters: {
    docs: {
      description: {
        component: 'A component is used to categorize content. Can be used with icons.',
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['small', 'normal', 'large', 'huge'] },
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
} satisfies Meta<typeof Toast>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Simple: Story = {
  args: {
    active: true,
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    theme: 'red',
    value: 'Dangerous',
    iconRight: 'Age18Icon',
  },
};
