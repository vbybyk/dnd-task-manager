import { CaretDown, CaretUp, Equals } from "@phosphor-icons/react";

interface IPriority {
  priority: "low" | "medium" | "high";
}

export const PriorityIcon = (props: IPriority) => {
  const { priority } = props;
  const icon = {
    low: <CaretDown size={16} color="#0a66e4" weight="bold" />,
    medium: <Equals size={16} color="rgb(245, 205, 71)" weight="bold" />,
    high: <CaretUp size={16} color="#c9372c" weight="bold" />,
  };

  return <>{icon[priority]}</>;
};
