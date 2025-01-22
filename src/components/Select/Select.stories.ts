import type { Meta, StoryObj } from '@storybook/vue3';

import Select from './Select.vue';
import { iconsSet } from '@/common/constants/icons';

const meta: Meta = {
  title: 'Components/Select',
  component: Select,
  tags: ['pick'],
  parameters: {
    docs: {
      description: {
        component: 'A component that is used to choose an item from a list.',
      },
    },
  },
  argTypes: {
    width: { control: 'text' },
    filtered: { control: 'boolean' },
    disabled: { control: 'boolean' },
    noHighlight: { control: 'boolean' },
    selected: { control: 'text' },
    fontSize: { control: 'text' },
    placeholder: { control: 'text' },
    name: { control: 'text' },
    openIcon: { control: 'select', options: Object.keys(iconsSet) },
    size: { control: 'select', options: ['small', 'normal', 'large', 'huge'] },
    darknessTheme: { control: 'select', options: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] },
    darknessOpenIcon: { control: 'select', options: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] },
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
    openIconColor: {
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
    placeholderColor: {
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
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Simple: Story = {
  args: {
    options: [
      {
        value: 'First',
      },
      {
        value: 'Second',
      },
      {
        value: 'Third',
      },
    ],
  },
};

export const Full: Story = {
  args: {
    options: [
      {
        value: 'First',
        iconLeft: 'At',
        color: 'purple',
        darknessColor: '800',
        group: 'Group',
      },
      {
        value: 'Second',
        iconRightColor: 'red',
        iconRight: 'Age18',
        group: 'Group',
      },
      {
        iconLeft: 'Calendar',
        value: 'Third',
        iconRight: 'CheckMark',
        group: 'Group 2',
      },
      {
        value: 'Sssss',
      },
    ],

    groups: [
      { name: 'Group', background: 'white', iconLeft: 'Archive' },
      { name: 'Group 2', background: 'red', iconLeft: 'Badge' },
    ],

    placeholder: 'Select a city',
    size: 'normal',
    width: '250px',
    theme: 'sky',
    darknessTheme: '200',
    openIconColor: 'sky',
    filtered: true,
  },
};
