import type { Meta, StoryObj } from '@storybook/vue3';

import TreeList from './TreeList.vue';

const meta: Meta = {
  title: 'Components/TreeList',
  component: TreeList,
  tags: ['data'],
  parameters: {
    docs: {
      description: {
        component:
          'A component that is used to display hierarchical data. Can contain links to a new page or the same.',
      },
    },
  },
  argTypes: {
    items: { control: 'object' },
    maxWidth: { control: 'number' },
    expand: { control: 'boolean' },
    darknessTheme: { control: 'select', options: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] },
    darknessTextColor: { control: 'select', options: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] },
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
} satisfies Meta<typeof TreeList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Simple: Story = {
  args: {
    items: [
      {
        label: 'First',
        children: [
          {
            label: '1-1',
            children: [
              {
                label: '1-1-1',
                children: [
                  {
                    label: '1-1-1-1',
                    children: [
                      {
                        label: '1-1-1-1-1',
                        children: [
                          { label: '1-1-1-1-1-1' },
                          { label: '1-1-1-1-1-2' },
                          { label: '1-1-1-1-1-3' },
                          { label: '1-1-1-1-1-4' },
                        ],
                      },
                    ],
                  },
                  { label: '1-1-1-2' },
                  { label: '1-1-1-3' },
                ],
              },
              {
                label: '1-1-2',
              },
            ],
          },
          {
            label: '1-2',
          },
        ],
      },
      {
        label: 'Second',
        children: [
          {
            label: '2-1',
          },
        ],
      },
    ],
  },
};

export const Full: Story = {
  args: {
    items: [
      {
        label: 'Font-family (mdn web docs)',
        color: 'green',
        iconBefore: 'EncyclopediaIcon',
        iconColor: 'green',
        link: 'https://developer.mozilla.org/en-US/docs/Web/CSS/font-family',
        linkBlank: true,
        textStyle: 'bold',
        children: [
          {
            label: 'Font-family (mdn web docs) but same page (error?)',
            link: 'https://developer.mozilla.org/en-US/docs/Web/CSS/font-family',
            color: 'sky',
            iconBefore: 'EyeIcon',
            iconColor: 'white',
            textStyle: 'italic',
            isTriangleToColor: true,
            children: [
              {
                label: '1-1-1',
                color: 'red',
                iconAfter: 'DiceIcon',
                iconColor: 'red',
                darknessColor: '300',
                darknessIconColor: '700',
                children: [
                  {
                    label: '1-1-1-1',
                    children: [
                      { label: '1-1-1-1-1' },
                      { label: '1-1-1-1-2' },
                      { label: '1-1-1-1-3' },
                      { label: '1-1-1-1-4' },
                    ],
                  },
                  { label: '1-1-1-2' },
                  { label: '1-1-1-3' },
                ],
              },
              {
                label: '1-1-2',
              },
            ],
          },
          {
            label: '1-2',
          },
        ],
      },
      {
        label: 'Second',
        children: [
          {
            label: '2-1',
          },
        ],
      },
    ],

    expand: true,
    theme: 'black',
    darknessTheme: 800,
  },
};
