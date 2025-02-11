import type { Meta, StoryObj } from '@storybook/vue3';

import Toast from './Toast.vue';
import Button from '@components/Button/Button.vue';
import { iconsSet } from '@/common/constants/icons';

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
    type: { control: 'select', options: ['success', 'info', 'warn', 'error'] },
    size: { control: 'select', options: ['small', 'normal', 'large', 'huge'] },
    position: {
      control: 'select',
      options: ['topRight', 'bottomRight', 'bottomLeft', 'topLeft', 'top', 'bottom'],
    },
    active: { control: 'boolean' },
    static: { control: 'boolean' },
    width: { control: 'text' },
    header: { control: 'text' },
    text: { control: 'text' },
    icon: { control: 'select', options: Object.keys(iconsSet) },
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
  render: (args) => ({
    components: { Toast, Button },
    data() {
      return {
        active: false,
      };
    },
    setup() {
      return { args };
    },
    template: '<Toast v-model="active" v-bind="args" /><Button @click="active = true" label="Open toast"/>',
  }),
};

export const Info: Story = {
  args: {
    active: true,
    type: 'info',
    static: true,
  },
};

export const Warn: Story = {
  args: {
    active: true,
    type: 'warn',
    static: true,
  },
};

export const Error: Story = {
  args: {
    active: true,
    type: 'error',
    static: true,
  },
};

export const Small: Story = {
  args: {
    active: true,
    size: 'small',
    static: true,
    theme: 'black',
    width: '400px',
  },
};

export const Large: Story = {
  args: {
    active: true,
    size: 'large',
    width: '400px',
    text: 'This is a text of large toast!',
    icon: 'Award',
    theme: 'sky',
    static: true,
  },
};

export const Huge: Story = {
  args: {
    active: true,
    size: 'huge',
    width: '500px',
    text: 'Oh, so huge... mmm.....',
    icon: 'Badge',
    theme: 'purple',
    header: 'Custom header',
    static: true,
  },
};
