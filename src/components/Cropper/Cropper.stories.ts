import type { Meta, StoryObj } from '@storybook/vue3';

import Cropper from './Cropper.vue';

const meta: Meta = {
  title: 'Components/Cropper',
  component: Cropper,
  tags: ['pick'],
  parameters: {
    docs: {
      description: {
        component: 'A component to pick color. Can be with button.',
      },
    },
  },
  argTypes: {
    buttonProps: { control: 'object' },
    sameButtonColor: { control: 'boolean' },
    disabled: { control: 'boolean' },
    size: { control: 'select', options: ['small', 'normal', 'large', 'huge'] },
  },
} satisfies Meta<typeof Cropper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Simple: Story = {
  args: {},
};

export const Full: Story = {
  args: {
    buttonProps: {
      label: 'Pick color!',
      theme: 'red',
      textStyle: 'bold',
    },

    size: 'large',
    sameButtonColor: true,
  },
};
