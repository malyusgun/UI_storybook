import type { Meta, StoryObj } from '@storybook/vue3';

import Table from './Table.vue';

const meta: Meta = {
  title: 'Components/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A component is used to display data in tabular format.',
      },
    },
  },
  argTypes: {
    columns: { control: 'text' },
    fontSize: { control: 'text' },
    gap: { control: 'text' },
    size: { control: 'select', options: ['small', 'normal', 'large', 'huge'] },
    showAllLines: { control: 'boolean' },
    stripedRows: { control: 'boolean' },
    center: { control: 'boolean' },
    multipleSort: { control: 'boolean' },
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
} satisfies Meta<typeof Table>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Simple: Story = {
  args: {
    columns: [
      {
        name: 'Name',
        type: 'text',
      },
      {
        name: 'Age',
        type: 'number',
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
        sortable: true,
        initSort: 'none',
      },
      {
        name: 'Age',
        type: 'number',
        sortable: true,
        filterable: true,
        initSort: 'down',
      },
      {
        name: 'Hobbies',
        type: 'text',
        padding: '30px',
        filterable: true,
        sortable: true,
        initSort: 'none',
      },
      {
        name: 'Country',
        type: 'text',
        initSort: 'none',
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
          value: '7',
        },
        {
          value: 'Football',
        },
        {
          value: 'Canadaaaaaaaaaaaa',
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
      [
        {
          value: 'Ксюша',
        },
        {
          value: '32',
        },
        {
          value: 'Frontend',
        },
        {
          value: 'Russia',
        },
      ],
      [
        {
          value: 'Ксюша',
        },
        {
          value: '32',
        },
        {
          value: 'Backend',
        },
        {
          value: 'Russia',
        },
      ],
    ],
    fontSize: '24px',
    showAllLines: true,
    border: 'fuchsia',
    theme: 'black',
    stripedRows: true,
    darknessTextColor: '500',
    center: true,
    size: 'large',
  },
};
