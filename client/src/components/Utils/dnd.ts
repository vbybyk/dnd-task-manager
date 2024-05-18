import { arrayMove as dndKitArrayMove } from "@dnd-kit/sortable";

export const removeAtIndex = (array: any[], index: number) => {
  return [...array.slice(0, index), ...array.slice(index + 1)];
};

export const insertAtIndex = (array: any[], index: number, item: any) => {
  return [...array.slice(0, index), item, ...array.slice(index)];
};

export const arrayMove = (array: any[], oldIndex: number, newIndex: number) => {
  return dndKitArrayMove(array, oldIndex, newIndex);
};

export const moveBetweenContainers = (
  items: any,
  activeContainer: any,
  activeIndex: any,
  overContainer: any,
  overIndex: any,
  item: any
) => {
  return {
    ...items,
    [activeContainer]: removeAtIndex(items[activeContainer], activeIndex),
    [overContainer]: insertAtIndex(items[overContainer], overIndex, item),
  };
};
