import React, { Dispatch, SetStateAction, useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Input, Button, Spin } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Popover } from "../Common/Popover/Popover";
import useTasks from "../../Hooks/useTasks";
import { useAlertContext } from "../../Context/AlertContext";
import { colorPalette } from "../../Constants/labels";
import { LabelsService } from "../../API/LabelsService";
import { labelsActions } from "../../Store/actions/labels";
import type { Placement } from "@rc-component/trigger/lib/interface";
import { IState } from "../../Store/reducers";
import { ILabel } from "../../Interfaces/tasks";
import { InputRef } from "antd/lib/input/Input";
import "./LabelsPopover.scss";

interface IProps {
  children: React.ReactElement;
  open: boolean;
  onOpen: Dispatch<SetStateAction<boolean>>;
  className?: string;
  placement?: Placement;
  labels: ILabel[];
}

export const LabelsPopover: React.FC<IProps> = (props: IProps) => {
  const { children, open, onOpen, className, placement } = props;
  const { getLabels } = useTasks();
  const { setAlert } = useAlertContext();

  const { project } = useSelector((state: IState) => state.project);
  const { labels: allLabels } = useSelector((state: IState) => state.labels);

  const [labels, setLabels] = useState<ILabel[]>([]);
  const [selectedLabel, setSelectedLabel] = useState<ILabel | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const dispatch = useDispatch();

  let focusRef = useRef<InputRef | null>(null);
  const paletteRef = useRef(null);

  useEffect(() => {
    getLabels(project?.id);
  }, [project]);

  useEffect(() => {
    setLabels(allLabels);
  }, [allLabels]);

  useEffect(() => {
    return () => {
      if (!open) {
        setSelectedLabel(null);
        setLabels(allLabels);
      }
    };
  }, [open]);

  useEffect(() => {
    function handleClickOutside(event: any) {
      // @ts-ignore
      if (paletteRef.current && !paletteRef.current.contains(event.target)) {
        setSelectedLabel(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [paletteRef, allLabels]);

  const ColorPalette = () => (
    <div className="color-palette">
      {colorPalette.map((color) => (
        <Button
          key={color.value}
          style={{
            backgroundColor: `${color.value}`,
            width: "20px",
            height: "20px",
            borderColor: `${color.border}`,
            borderRadius: "5px",
            marginRight: "5px",
            padding: "0",
          }}
          onClick={() => {
            if (selectedLabel) {
              const updatedLabel = { ...selectedLabel, value: color.value, color: color.color };
              const updatedLabels = labels.map((label) => (label.id === selectedLabel.id ? updatedLabel : label));
              setSelectedLabel(updatedLabel);
              setLabels(updatedLabels);
            }
          }}
        />
      ))}
    </div>
  );

  const handleFocus = (label: ILabel) => {
    if (label) {
      // @ts-ignore
      focusRef.current = label;
      setSelectedLabel(label);
    }
  };

  const onUpdateLabels = async () => {
    setIsUpdating(true);
    try {
      const response = await LabelsService.updateProjectLabels(project?.id, labels);
      dispatch(labelsActions.updateLabels(response.data));
      setIsUpdating(false);
      setAlert({ type: "success", message: "Updated successfully!" });
    } catch (err) {
      setIsUpdating(false);
      setAlert({ type: "error", message: "Something went wrong!" });
      console.error(err);
    }
  };

  const content = (
    <div className="labels-popover-content">
      {labels.map((label, index) => (
        <Input
          ref={focusRef}
          key={label.id}
          value={label.label}
          style={{
            color: `${label.color}`,
            backgroundColor: `${label.value}`,
            width: "200px",
            marginBottom: "10px",
          }}
          onFocus={() => handleFocus(label)}
          onChange={(e) => {
            const newLabels = [...labels];
            newLabels[index].label = e.target.value;
            setLabels(newLabels);
          }}
        />
      ))}
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={(e) => {
          e.stopPropagation();
          const maxId = labels.reduce((max, label) => Math.max(max, label.id), 0);
          setLabels([
            ...labels,
            {
              id: maxId + 1,
              projectId: project?.id,
              label: "",
              value: "#F0F2F4",
              border: "#44546F",
              color: "#44546F",
            },
          ]);
        }}
        className="icon-button"
      >
        {labels.length === 0 && "Add Label"}
      </Button>
      {
        <>
          {selectedLabel && (
            <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }} ref={paletteRef}>
              <ColorPalette />
              <Button type="text" style={{ marginTop: "20px" }} onClick={onUpdateLabels}>
                {!isUpdating ? "Update" : <Spin size="small" className="loader" />}
              </Button>
            </div>
          )}
        </>
      }
    </div>
  );

  return (
    <Popover
      content={content}
      open={open}
      onOpen={onOpen}
      trigger="click"
      className={className}
      placement={placement}
      destroyTooltipOnHide
    >
      {children}
    </Popover>
  );
};
