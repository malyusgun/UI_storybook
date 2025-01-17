import type { Meta, StoryObj } from '@storybook/vue3';

import Tag from './Tag.vue';
import { iconsSet } from '@/common/constants/icons';

const meta: Meta = {
  title: 'Components/Tag',
  component: Tag,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A component is used to categorize content. Can be used with icon.',
      },
    },
  },
  argTypes: {
    value: { control: 'text' },
    rounded: { control: 'boolean' },
    size: { control: 'select', options: ['small', 'normal', 'large', 'huge'] },
    iconLeft: { control: 'select', options: Object.keys(iconsSet) },
    iconRight: { control: 'select', options: Object.keys(iconsSet) },
    darknessTheme: {
      control: 'select',
      options: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    },
    darknessBackground: {
      control: 'select',
      options: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    },
    darknessBorder: {
      control: 'select',
      options: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    },
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
    background: {
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
    border: {
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
} satisfies Meta<typeof Tag>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Simple: Story = {
  args: {
    active: true,
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    theme: 'red',
    value: 'Dangerous',
    iconRight: 'Age18Icon',
  },
};

export const Normal_rounded: Story = {
  args: {
    size: 'normal',
    theme: 'green',
    value: 'Be calm',
    rounded: true,
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    theme: 'sky',
    value: 'Ice cream',
    iconLeft: 'CoinsIcon',
  },
};

export const Huge: Story = {
  args: {
    size: 'huge',
    theme: 'indigo',
    value: 'Unique',
    iconLeft: 'BallFootballIcon',
    iconRight: 'ArrowForwardIcon',
    darknessBackground: '300',
    darknessBorder: '500',
    border: 'indigo',
  },
};
