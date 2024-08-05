import { useState, useCallback, useRef } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

interface TextEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  handleUpload: (file: File) => Promise<string>;
  placeholder?: string;
  className?: string;
  onFocus?: () => void;
  onBlur?: () => void;
}

const modules = {
  toolbar: [
    [{ header: 2 }, { header: 3 }],
    [{ color: [] }],
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    ["clean"],
  ],
};

const TextEditor = (props: TextEditorProps) => {
  const [value, setValue] = useState("");
  const reactQuillRef = useRef<ReactQuill>(null);

  const imageHandler = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = async () => {
      if (input !== null && input.files !== null) {
        const file = input.files[0];
        const url = await props.handleUpload(file);
        const quill = reactQuillRef.current;
        if (quill) {
          const range = quill.getEditor().getSelection();
          range && quill.getEditor().insertEmbed(range.index, "image", url);
        }
      }
    };
  }, [reactQuillRef]);

  return (
    <ReactQuill
      ref={reactQuillRef}
      theme="snow"
      value={props?.value ?? value}
      onChange={props?.onChange ?? setValue}
      modules={{
        toolbar: {
          container: modules.toolbar,
          handlers: {
            image: imageHandler,
          },
        },
      }}
      {...props}
    />
  );
};

export default TextEditor;
