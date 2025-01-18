import type { Meta, StoryObj } from '@storybook/vue3';

import Modal from './Modal.vue';
import { iconsSet } from '@/common/constants/icons';

const meta: Meta = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A container to display content in an overlay window.',
      },
    },
  },
  argTypes: {
    visible: { control: 'boolean' },
    width: { control: 'text' },
    height: { control: 'text' },
    header: { control: 'text' },
    default: { control: 'text' },
    headerDivider: { control: 'boolean' },
    dismissible: { control: 'boolean' },
    closeIcon: { control: 'select', options: Object.keys(iconsSet) },
    position: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight'],
    },
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
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Simple: Story = {
  args: {
    visible: true,
    header: 'Modal',
    default: 'This is a modal.',
  },
};

export const Full: Story = {
  args: {
    visible: true,
    header: 'Modal with veeeeeery long content',

    default:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci blanditiis consectetur consequuntur, culpa doloremque eaque est et hic in laudantium magni, maxime modi necessitatibus odit officia praesentium recusandae reiciendis velit.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci blanditiis consectetur consequuntur, culpa doloremque eaque est et hic in laudantium magni, maxime modi necessitatibus odit officia praesentium recusandae reiciendis velit.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci blanditiis consectetur consequuntur, culpa doloremque eaque est et hic in laudantium magni, maxime modi necessitatibus odit officia praesentium recusandae reiciendis velit.\nLorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci blanditiis consectetur consequuntur, culpa doloremque eaque est et hic in laudantium magni, maxime modi necessitatibus odit officia praesentium recusandae reiciendis velit.\nLorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci blanditiis consectetur consequuntur, culpa doloremque eaque est et hic in laudantium magni, maxime modi necessitatibus odit officia praesentium recusandae reiciendis velit.\nLorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci blanditiis consectetur consequuntur, culpa doloremque eaque est et hic in laudantium magni, maxime modi necessitatibus odit officia praesentium recusandae reiciendis velit.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci blanditiis consectetur consequuntur, culpa doloremque eaque est et hic in laudantium magni, maxime modi necessitatibus odit officia praesentium recusandae reiciendis velit.\nLorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci blanditiis consectetur consequuntur, culpa doloremque eaque est et hic in laudantium magni, maxime modi necessitatibus odit officia praesentium recusandae reiciendis velit.\nLorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci blanditiis consectetur consequuntur, culpa doloremque eaque est et hic in laudantium magni, maxime modi necessitatibus odit officia praesentium recusandae reiciendis velit.\nLorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci blanditiis consectetur consequuntur, culpa doloremque eaque est et hic in laudantium magni, maxime modi necessitatibus odit officia praesentium recusandae reiciendis velit.\n\n\n',

    width: '40%',
    height: '50%',
    theme: 'black',
    position: 'topRight',
    dismissible: true,
    closeIcon: 'CodeIcon',
    headerDivider: true,
  },
};
