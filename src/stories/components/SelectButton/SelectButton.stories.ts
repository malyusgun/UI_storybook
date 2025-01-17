import type { Meta, StoryObj } from '@storybook/vue3';

import SelectButton from './SelectButton.vue';

const meta: Meta = {
  title: 'Components/SelectButton',
  component: SelectButton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A component that is used to select a value from a list using a button.',
      },
    },
  },
  argTypes: {
    options: {
      control: 'object',
    },
    size: { control: 'select', options: ['small', 'normal', 'large', 'huge'] },
    rounded: { control: 'boolean' },
    darknessTheme: { control: 'select', options: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] },
    darknessTextColor: { control: 'select', options: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] },
    darknessActiveBackgroundColor: {
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
    activeBackgroundColor: {
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
    disabled: { control: 'boolean' },
  },
  args: {},
} satisfies Meta<typeof SelectButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Simple: Story = {
  args: {
    options: [
      {
        label: 'First',
      },
      {
        label: 'Second',
      },
    ],

    rounded: false,
    disabled: false,
  },
};

export const LargeFull: Story = {
  args: {
    options: [
      {
        label: 'First',
        color: 'white',
        darknessColor: '900',
        backgroundColor: 'black',
      },
      {
        label: 'Second',
        color: 'red',
        activeColor: 'blue',
        darknessColor: '700',
        backgroundColor: 'yellow',
      },
      {
        label: 'Third',
        activeColor: 'green',
        darknessColor: '700',
        backgroundColor: 'purple',
      },
    ],
    activeBackgroundColor: 'red',
    rounded: true,
    disabled: false,
    size: 'large',
  },
};
