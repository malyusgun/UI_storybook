import type { Meta, StoryObj } from '@storybook/vue3';

import NavigationIcon from './NavigationIcon.vue';

const meta: Meta = {
  title: 'Icons/Navigation',
  component: NavigationIcon,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['10', '20', '30', '40', '50', '60'] },
  },
  args: {
    color: 'white',
  },
} satisfies Meta<typeof NavigationIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    color: 'black',
  },
};
