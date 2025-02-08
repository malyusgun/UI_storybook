export const getImageInfo = (image: string | File, instance: HTMLImageElement) => {
  instance.src = typeof image === 'string' ? image : URL.createObjectURL(image);

  instance.onload = function () {
    return [instance, 0, 0, instance.width, instance.height];
  };
};

export const calcContainerRect = () => {
  const container = document.querySelector('#canvas-container');
  return container?.getBoundingClientRect();
};
