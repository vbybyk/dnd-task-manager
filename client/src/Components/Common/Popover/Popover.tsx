import { Popover as AntdPopover } from "antd";
import type { ActionType, Placement } from "@rc-component/trigger/lib/interface";

interface IPopover {
  content: JSX.Element;
  title?: string;
  trigger?: ActionType | ActionType[];
  open: boolean;
  onOpen: (open: boolean) => void;
  children: JSX.Element;
  className?: string;
  style?: React.CSSProperties;
  placement?: Placement;
}

export const Popover = (props: IPopover) => {
  const { content, title, trigger, open, onOpen, children, className, style, placement } = props;

  return (
    <AntdPopover
      content={content}
      title={title}
      trigger={trigger}
      open={open}
      onOpenChange={onOpen}
      className={className}
      style={style}
      placement={placement}
    >
      {children}
    </AntdPopover>
  );
};
