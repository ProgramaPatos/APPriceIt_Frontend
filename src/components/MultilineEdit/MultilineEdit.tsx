import React from "react";
import "./MultilineEdit.scss";
interface MultilineEditProps {
  value: string;
  setValue: (value: string) => void;
  isUpdatingEnable: boolean;
}

export const MultilineEdit = ({
  value,
  setValue,
  isUpdatingEnable,
}: MultilineEditProps) => {
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

  const onInput = (target: any) => {
    if (target.scrollHeight > 33) {
      target.style.height = "5px";
      target.style.height = target.scrollHeight - 16 + "px";
    }
  };

  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    onInput(textareaRef.current);
  }, [onInput, textareaRef]);

  return (
    <textarea
      className="MultilineEditInput"
      rows={1}
      aria-label="Field name"
      value={editingValue}
      onBlur={onBlur}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onInput={(event) => onInput(event.target)}
      ref={textareaRef}
    />
  );
};
