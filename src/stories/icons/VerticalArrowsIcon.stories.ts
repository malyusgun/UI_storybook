import type { Meta, StoryObj } from '@storybook/vue3';

import VerticalArrowsIcon from './VerticalArrowsIcon.vue';

const meta: Meta = {
  title: 'Icons/VerticalArrows',
  component: VerticalArrowsIcon,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['10', '20', '30', '40', '50', '60'] },
  },
  args: {
    color: 'white',
  },
} satisfies Meta<typeof VerticalArrowsIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    color: 'black',
  },
};
