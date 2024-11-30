import type { Meta, StoryObj } from '@storybook/vue3';

import ParagraphIcon from './ParagraphIcon.vue';

const meta: Meta = {
  title: 'Icons/Paragraph',
  component: ParagraphIcon,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['10', '20', '30', '40', '50', '60'] },
  },
  args: {
    color: 'white',
  },
} satisfies Meta<typeof ParagraphIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    color: 'black',
  },
};
