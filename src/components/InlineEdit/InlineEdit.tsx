import React from "react";
import "./InlineEdit.scss";
interface InlineEditProps {
  value: string;
  setValue: (value: string) => void;
  isUpdatingEnable: boolean;
}

export const InlineEdit = ({
  value,
  setValue,
  isUpdatingEnable,
}: InlineEditProps) => {
  const [editingValue, setEditingValue] = React.useState(value);

  const onChange = (event: any) => setEditingValue(event.target.value);

  const onKeyDown = (event: any) => {
    if (event.key === "Enter" || event.key === "Escape") {
      event.target.blur();
    }
  };

  const onBlur = (event: any) => {
    if (event.target.value.trim() === "") {
      setEditingValue(value);
    } else {
      setValue(event.target.value);
    }
  };

  if (isUpdatingEnable) {
    return (
      <input
        className="InlineEditInput"
        type="text"
        aria-label="Field name"
        value={editingValue}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
      />
    );
  } else {
    return <div>{editingValue}</div>;
  }
};
