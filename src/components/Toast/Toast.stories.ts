import type { Meta, StoryObj } from '@storybook/vue3';

import Toast from './Toast.vue';
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
};

export const Info: Story = {
  args: {
    active: true,
    type: 'info',
  },
};

export const Warn: Story = {
  args: {
    active: true,
    type: 'warn',
  },
};

export const Error: Story = {
  args: {
    active: true,
    type: 'error',
  },
};

export const Small: Story = {
  args: {
    active: true,
    size: 'small',
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
  },
};
