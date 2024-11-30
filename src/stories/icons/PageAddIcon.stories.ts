import type { Meta, StoryObj } from '@storybook/vue3';

import PageAddIcon from './PageAddIcon.vue';

const meta: Meta = {
  title: 'Icons/PageAdd',
  component: PageAddIcon,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['10', '20', '30', '40', '50', '60'] },
  },
  args: {
    color: 'white',
  },
} satisfies Meta<typeof PageAddIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    color: 'black',
  },
};
