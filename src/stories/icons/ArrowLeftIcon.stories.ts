import type { Meta, StoryObj } from '@storybook/vue3';

import ArrowLeftIcon from './ArrowLeftIcon.vue';

const meta: Meta = {
  title: 'Icons/ArrowLeft',
  component: ArrowLeftIcon,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['10', '20', '30', '40', '50', '60'] },
  },
  args: {
    color: 'white',
  },
} satisfies Meta<typeof ArrowLeftIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    color: 'black',
  },
};
