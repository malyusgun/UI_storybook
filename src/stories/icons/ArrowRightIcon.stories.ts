import type { Meta, StoryObj } from '@storybook/vue3';

import ArrowRightIcon from './ArrowRightIcon.vue';

const meta: Meta = {
  title: 'Icons/ArrowRight',
  component: ArrowRightIcon,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['10', '20', '30', '40', '50', '60'] },
  },
  args: {
    color: 'white',
  },
} satisfies Meta<typeof ArrowRightIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    color: 'black',
  },
};
