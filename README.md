# UI_Storybook

> UI-библиотека компонентов на Vue, созданная с целью получить опыт
> и использовать в других проектах ввиду её предполагаемой в будущем
> лёгкости и простоте.

## Список компонентов:
- TreeList;
- MenuDial;
- Popup;
- Slider;
- Drawer;
- Modal;
- SelectButton;
- Button;
- ToggleSwitch;
- Divider.

## Components count: 10
## Bundle size: 248.7KB

### Настройка окружения

```sh
yarn
```

### Просмотр существующих иконок в виде списка и тестирование компонентов

```sh
yarn dev
```

### Проверка типов, компиляция и минимизация для production

```sh
yarn build
```

## Важные моменты при разработке

После создания иконки:
1. Добавить иконку в iconsSet (src/common/constants/icons);
2. Добавить иконку в соответствующий массив в App.vue.