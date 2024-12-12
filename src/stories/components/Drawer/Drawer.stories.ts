import type { Meta, StoryObj } from '@storybook/vue3';

import Drawer from './Drawer.vue';
import { iconsSet } from '@/common/constants/icons';
import { fn } from '@storybook/test';

const meta: Meta = {
  title: 'Components/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A component that displayed as an overlay. Can be used as a sidebar or tooltip.',
      },
    },
  },
  argTypes: {
    visible: { control: 'boolean' },
    position: { control: 'select', options: ['left', 'right', 'top', 'bottom'] },
    width: { control: 'number' },
    header: { control: 'text' },
    default: { control: 'text' },
    footer: { control: 'text' },
    modal: { control: 'boolean' },
    dismissible: { control: 'boolean' },
    closeIcon: { control: 'select', options: Object.keys(iconsSet) },
    headerDivider: { control: 'boolean' },
    footerDivider: { control: 'boolean' },
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
    onClose: fn(),
  },
} satisfies Meta<typeof Drawer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    visible: true,
    default: 'Какой-то текст.',
  },
};

export const BlackFull: Story = {
  args: {
    visible: true,
    width: 200,
    theme: 'black',
    closeIcon: 'CrossIcon',
    header: 'Drawer',
    footer: 'The end.',
    headerDivider: true,
    footerDivider: true,

    default:
      '  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto dicta dolorum eaque explicabo illo. Beatae et eveniet itaque libero sint. Atque blanditiis consequuntur dolorum explicabo, facilis iste nulla numquam provident.',

    modal: false,
    dismissible: false,
  },
};
