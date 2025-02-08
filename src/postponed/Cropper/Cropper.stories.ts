// import type { Meta, StoryObj } from '@storybook/vue3';
//
// import Cropper from './Cropper.vue';
//
// const meta: Meta = {
//   title: 'Components/Cropper',
//   component: Cropper,
//   tags: ['pick'],
//   parameters: {
//     docs: {
//       description: {
//         component: 'A component to pick color. Can be with button.',
//       },
//     },
//   },
//   argTypes: {
//     menuPosition: { control: 'select', options: ['top', 'right', 'bottom', 'left'] },
//     src: { control: 'text' },
//     width: { control: 'number' },
//     height: { control: 'number' },
//   },
// } satisfies Meta<typeof Cropper>;
//
// export default meta;
//
// type Story = StoryObj<typeof meta>;
//
// export const Simple: Story = {
//   args: {
//     src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoFRQjM-wM_nXMA03AGDXgJK3VeX7vtD3ctA&s',
//   },
// };
//
// export const Full: Story = {
//   args: {
//     buttonProps: {
//       label: 'Pick color!',
//       theme: 'red',
//       textStyle: 'bold',
//     },
//
//     size: 'large',
//     sameButtonColor: true,
//   },
// };
