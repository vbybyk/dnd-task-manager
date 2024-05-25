import { v2 as cloudinary } from "cloudinary";

export const uploadImage = async (file: any) => {
  cloudinary.config({
    cloud_name: "dvw1phdxp",
    api_key: "376416937869165",
    api_secret: "kdMg3xPKMM3AUu8PZDryEVRMWK4",
  });

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ public_id: `tasks/${Date.now()}` }, (error, result) => {
      if (error) reject(error);
      else resolve(result?.url);
    });

    stream.write(file);
    stream.end();
  });
};
