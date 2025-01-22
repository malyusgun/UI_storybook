import type { Meta, StoryObj } from '@storybook/vue3';

import Drawer from './Drawer.vue';
import { iconsSet } from '@/common/constants/icons';

const meta: Meta = {
  title: 'Components/Drawer',
  component: Drawer,
  tags: ['data'],
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
    darknessTheme: { control: 'select', options: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] },
    darknessTextColor: { control: 'select', options: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] },
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
    textColor: {
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
} satisfies Meta<typeof Drawer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Simple: Story = {
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
