import { useState, useCallback, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ header: 1 }, { header: 2 }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    ["clean"],
  ],
};

const TextEditor = (props: any) => {
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
          const range = quill.getEditorSelection();
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
