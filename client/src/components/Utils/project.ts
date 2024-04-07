import { IContainer, ITask } from "../Interfaces/tasks";

export const transformData = (dataArray: ITask[], containers: IContainer[]) => {
  let result: Record<number, ITask[]> = {};
  containers.forEach((container) => {
    result[container.id] = [];
  });

  dataArray.forEach((item) => {
    result[item.containerId].push(item);
    result[item.containerId].sort((a: any, b: any) => a.sortId - b.sortId);
  });

  return result;
};

export const flattenData = (items: Record<number, ITask[]>) => {
  return Object.values(items).flat();
};
