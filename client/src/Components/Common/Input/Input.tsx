import cn from "classnames";
import { Input as AntdInput } from "antd";
import "./Input.scss";

interface IInput {
  field: any;
  label: string;
  htmlFor: string;
  className?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: any;
  style?: any;
}

export const Input = (props: IInput) => {
  const { field, label, htmlFor, className = "", placeholder, required, disabled, error, style } = props;
  return (
    <div className={cn("Input", className)} style={style}>
      <label htmlFor={htmlFor} className={cn("input-label", required && "required")}>
        {label}
      </label>
      <AntdInput {...field} placeholder={placeholder} required={required} disabled={disabled} />
      {error && <p className="field-error">{error?.message}</p>}
    </div>
  );
};
