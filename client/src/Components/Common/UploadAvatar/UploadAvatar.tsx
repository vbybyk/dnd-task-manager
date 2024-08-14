import { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload, Avatar } from "antd";
import ImgCrop from "antd-img-crop";
import type { GetProp, UploadProps, UploadFile } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { uploadUserImage } from "../../../Utils/img-upload";
import "./UploadAvatar.scss";

interface IUploadAvatar {
  imageUrl: string;
  setImageUrl: (url: string) => void;
}

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

export const UploadAvatar = (props: IUploadAvatar) => {
  const { imageUrl, setImageUrl } = props;
  const [loading, setLoading] = useState(false);

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as FileType);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const handleChange: UploadProps["onChange"] = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      setLoading(false);
      setImageUrl(info.file.response);
    }
  };

  const customRequest = async ({ onProgress, onError, onSuccess, file }) => {
    try {
      onProgress({ percent: 0 });
      const result = await uploadUserImage(file);
      if (result) {
        onProgress({ percent: 100 });
        onSuccess(result, file);
      } else {
        onError(new Error("Something went wrong"));
      }
    } catch (e) {
      onError(e);
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <ImgCrop rotationSlider>
      <Upload
        name="avatar"
        listType="picture-circle"
        className="avatar-uploader"
        showUploadList={false}
        customRequest={customRequest}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        onPreview={onPreview}
      >
        {imageUrl ? <Avatar icon={<UserOutlined />} src={imageUrl} size={100} /> : uploadButton}
      </Upload>
    </ImgCrop>
  );
};
