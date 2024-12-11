import type { Meta, StoryObj } from '@storybook/vue3';

import Drawer from './Drawer.vue';
import { iconsSet } from '@/common/constants/icons';

const meta: Meta = {
  title: 'Components/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  argTypes: {
    visible: { control: 'boolean' },
    position: { control: 'select', options: ['left', 'right', 'top', 'bottom'] },
    width: { control: 'number' },
    header: { control: 'text' },
    default: { control: 'text' },
    footer: { control: 'text' },
    isModal: { control: 'boolean' },
    isDismissible: { control: 'boolean' },
    closeIcon: { control: 'select', options: Object.keys(iconsSet) },
    isHeaderDivider: { control: 'boolean' },
    isFooterDivider: { control: 'boolean' },
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
    // onClick: fn(),
  },
} satisfies Meta<typeof Drawer>;

export default meta;

type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
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
    isHeaderDivider: true,
    isFooterDivider: true,

    default:
      '  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto dicta dolorum eaque explicabo illo. Beatae et eveniet itaque libero sint. Atque blanditiis consequuntur dolorum explicabo, facilis iste nulla numquam provident.',

    isModal: true,
  },
};
