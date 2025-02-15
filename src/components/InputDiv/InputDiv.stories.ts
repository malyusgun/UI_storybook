import type { Meta, StoryObj } from '@storybook/vue3';

import InputDiv from './InputDiv.vue';

const meta: Meta = {
  title: 'Components/InputDiv',
  component: InputDiv,
  tags: ['pick'],
  parameters: {
    docs: {
      description: {
        component: 'One of the options for implementing input.',
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['small', 'normal', 'large', 'huge'] },
    secret: { control: 'boolean' },
    dashed: { control: 'boolean' },
    numbersOnly: { control: 'boolean' },
    bottomOnly: { control: 'boolean' },
    scheme: { control: 'text' },
    regex: { control: 'text' },
    gap: { control: 'text' },
    inputsGap: { control: 'text' },
    darknessTheme: { control: 'select', options: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] },
    darknessTextColor: {
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
} satisfies Meta<typeof InputDiv>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Simple: Story = {
  args: {},
};

export const Full: Story = {
  args: {
    secret: true,
    dashed: true,
    numbersOnly: true,
    bottomOnly: false,
    scheme: '2-4-3-1',
    size: 'large',
    theme: 'sky',
  },
};

export const Full2: Story = {
  args: {
    secret: false,
    dashed: true,
    numbersOnly: false,
    bottomOnly: true,
    scheme: '4by3',
    size: 'large',
    theme: 'white',
    textColor: 'blue',
  },
};
