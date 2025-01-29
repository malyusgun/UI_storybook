import type { Meta, StoryObj } from '@storybook/vue3';

import Table from './Table.vue';

const meta: Meta = {
  title: 'Components/Table',
  component: Table,
  tags: ['data'],
  parameters: {
    docs: {
      description: {
        component: 'A component is used to display data in tabular format.',
      },
    },
  },
  argTypes: {
    data: { control: 'object' },
    columns: { control: 'text' },
    fontSize: { control: 'text' },
    gap: { control: 'text' },
    size: { control: 'select', options: ['small', 'normal', 'large', 'huge'] },
    showAllLines: { control: 'boolean' },
    stripedRows: { control: 'boolean' },
    center: { control: 'boolean' },
    multipleSort: { control: 'boolean' },
    editable: { control: 'boolean' },
    noEditingSettings: { control: 'object' },
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
      ['Pete', '30', 'Chess'],
      ['John', '25', 'Football'],
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
        type: 'number',
        filterable: true,
        sortable: true,
        width: '50px',
      },
      {
        name: 'Hobbies',
        type: 'text',
        padding: '30px',
        filterable: true,
        sortable: true,
      },
      {
        name: 'Country',
        type: 'text',
      },
      {
        name: 'Is gay?',
        type: 'checkbox',
      },
      {
        name: 'Status',
        type: 'select',
        options: {
          options: [{ value: 'Married' }, { value: 'Oh no...(s)he is dead' }],
        },
      },
      {
        name: 'Children',
        type: 'rating',
        options: {
          theme: 'yellow',
        },
      },
      {
        name: 'Job progress',
        type: 'progressBar',
        options: {
          theme: 'red',
          width: '150px',
          size: 'small',
        },
      },
      {
        name: 'Strength',
        type: 'knob',
        options: {},
      },
    ],

    data: [
      ['Pete', '30', 'Chess', 'USA', false, 'Married', 0, 30, 2],
      ['John', '7', 'Football', 'Canada', true, 'Married', 0, 30, 2],
      ['Дима', '22', 'Frontend', 'Russia', false, 'Married', 0, 30, 2],
      ['Ксюша', '32', 'Frontend', 'Russia', false, 'Married', 0, 30, 2],
      ['Ксюша', '32', 'Backend', 'Russia', false, 'Married', 0, 30, 2],
    ],
    noEditingSettings: {
      columns: [2],
      rows: [3],
      cells: [[0, 6]],
    },
    fontSize: '24px',
    showAllLines: true,
    border: 'fuchsia',
    theme: 'black',
    stripedRows: true,
    darknessTextColor: '500',
    center: true,
    size: 'large',
    editable: true,
  },
};
