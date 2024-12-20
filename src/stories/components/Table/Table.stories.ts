import type { Meta, StoryObj } from '@storybook/vue3';

import Table from './Table.vue';

const meta: Meta = {
  title: 'Components/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A component that is used as a Table. Can be used with icon.',
      },
    },
  },
  argTypes: {
    columns: { control: 'object' },
    data: { control: 'object' },
    size: { control: 'select', options: ['small', 'normal', 'large', 'huge'] },
    fontSize: { control: 'text' },
    gap: { control: 'text' },
    width: { control: 'text' },
    showAllLines: { control: 'boolean' },
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
} satisfies Meta<typeof Table>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    columns: [
      {
        name: 'Name',
        type: 'text',
      },
      {
        name: 'Age',
        type: 'text',
      },
      {
        name: 'Hobbies',
        type: 'text',
      },
    ],
    data: [
      [
        {
          value: 'Pete',
        },
        {
          value: '30',
        },
        {
          value: 'Chess',
        },
      ],
      [
        {
          value: 'John',
        },
        {
          value: '25',
        },
        {
          value: 'Football',
        },
      ],
    ],
  },
};

export const Full: Story = {
  args: {
    columns: [
      {
        name: 'Name',
        type: 'text',
      },
      {
        name: 'Age',
        type: 'text',
      },
      {
        name: 'Hobbies',
        type: 'text',
      },
      {
        name: 'Country',
        type: 'text',
      },
    ],

    data: [
      [
        {
          value: 'Pete',
        },
        {
          value: '30',
        },
        {
          value: 'Chess',
        },
        {
          value: 'USA',
        },
      ],
      [
        {
          value: 'John',
        },
        {
          value: '25',
        },
        {
          value: 'Football',
        },
        {
          value: 'Canada',
        },
      ],
      [
        {
          value: 'Дима',
        },
        {
          value: '22',
        },
        {
          value: 'Frontend',
        },
        {
          value: 'Russia',
        },
      ],
    ],

    fontSize: '32px',
    showAllLines: true,
    gap: '70px',
    border: 'fuchsia',
    theme: 'black',
  },
};
