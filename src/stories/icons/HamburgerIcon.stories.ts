import type { Meta, StoryObj } from '@storybook/vue3';

import HamburgerIcon from './HamburgerIcon.vue';

const meta: Meta = {
  title: 'Icons/Hamburger',
  component: HamburgerIcon,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['10', '20', '30', '40', '50', '60'] },
  },
  args: {
    color: 'white',
  },
} satisfies Meta<typeof HamburgerIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    color: 'black',
  },
};
