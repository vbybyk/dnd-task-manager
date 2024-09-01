import { CaretDown, Equals, CaretDoubleUp } from "@phosphor-icons/react";
import { Tooltip } from "antd";
import "./PriorityIcon.scss";

export type IPriority = "low" | "medium" | "high";
interface IPriorityIcon {
  priority: IPriority;
}

export const PriorityIcon = (props: IPriorityIcon) => {
  const { priority } = props;
  const icon = {
    low: <CaretDown size={16} color="#0a66e4" weight="bold" />,
    medium: <Equals size={16} color="rgb(245, 205, 71)" weight="bold" />,
    high: <CaretDoubleUp size={16} color="#c9372c" weight="bold" />,
  };

  return (
    <div className="PriorityIcon">
      <Tooltip title={`${priority} priority`} overlayClassName="priority-tooltip" arrow={false}>
        {icon[priority]}
      </Tooltip>
    </div>
  );
};
