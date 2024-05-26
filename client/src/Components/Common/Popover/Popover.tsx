import { Popover as AntdPopover } from "antd";
import type { ActionType } from "@rc-component/trigger/lib/interface";

interface IPopover {
  content: JSX.Element;
  title?: string;
  trigger?: ActionType | ActionType[];
  open: boolean;
  onOpen: (open: boolean) => void;
  children: JSX.Element;
}

export const Popover = (props: IPopover) => {
  const { content, title, trigger, open, onOpen, children } = props;

  return (
    <AntdPopover content={content} title={title} trigger={trigger} open={open} onOpenChange={onOpen}>
      {children}
    </AntdPopover>
  );
};
