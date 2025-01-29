import type { Meta, StoryObj } from '@storybook/vue3';

import Popup from './Popup.vue';
import Button from '@components/Button/Button.vue';

const meta: Meta = {
  title: 'Components/Popup',
  component: Popup,
  tags: ['data'],
  parameters: {
    docs: {
      description: {
        component: 'A component that is used as a Popup. Can be used with icon.',
      },
    },
  },
  argTypes: {
    default: { control: 'text' },
    parentSelector: { control: 'text' },
    maxWidth: { control: 'text' },
    maxHeight: { control: 'text' },
    padding: { control: 'text' },
    darknessTheme: { control: 'select', options: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] },
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
  },
} satisfies Meta<typeof Popup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Simple: Story = {
  args: {
    default:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet fugiat harum maiores placeat\n    soluta, vel velit voluptas. Accusamus aut, error et minima neque praesentium, ratione,\n    reprehenderit repudiandae saepe ut vero! Lorem ipsum dolor sit amet, consectetur adipisicing\n    elit. Amet fugiat harum maiores placeat soluta, vel velit voluptas. Accusamus aut, error et\n    minima neque praesentium, ratione, reprehenderit repudiandae saepe ut vero!',
    maxWidth: '200px',
    maxHeight: '100px',
  },
};

export const Full: Story = {
  render: (args) => ({
    components: { Popup, Button },
    setup() {
      return { args };
    },
    template:
      '<Popup v-bind="args"><Button label="Создать" theme="sky" /><p style="display: inline-block; padding: 0 30px"></p><Button label="Удалить" theme="red" /></Popup>',
  }),
  args: {
    theme: 'black',
  },
};
