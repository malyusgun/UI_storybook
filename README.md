# FeatherUI

> UI-библиотека компонентов на Vue, созданная с целью получить опыт
> и использовать в других проектах ввиду её предполагаемой в будущем
> лёгкости и простоте.

## Список компонентов:
- Table;
- TreeList;
- Carousel;
- Popup;
- Modal;
- Drawer;

- MenuDial;
- Paginator;
- Slider;
- Knob;
- ColorPicker;
- Select;
- InputDiv;
- SelectButton;
- Button;
- Rating;
- ToggleSwitch;
- Checkbox;

- Toast;
- ProgressBar;
- Tag;
- Divider.

---
## Общая информация
### Components count: 22
### Bundle size: 336.6KB

---

## Важные моменты при разработке
### Общее начало шаблона для компонентов:
```  
const props = withDefaults(defineProps<IProps>(), {  
   
});    
const emit = defineEmits(['']);  
const visible = defineModel();  
// watch(, () => {});
// const computed1 = computed(() => );
```
- I*Componentname*Props вместо ```IProps```;
- watchers после defineModel;
- далее - computeds;
- затем - функции (handlers).
### После создания иконки:
1. Добавить иконку в iconsSet (src/common/constants/icons);
2. Добавить иконку в соответствующий массив в App.vue.
---
## Настройка окружения
### Установка зависимостей:
```sh
yarn
```
### Просмотр существующих иконок в виде списка и тестирование компонентов:
```sh
yarn dev
```
### Проверка типов, компиляция и минимизация для production:
```sh
yarn build
```