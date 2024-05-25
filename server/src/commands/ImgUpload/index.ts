import { v2 as cloudinary } from "cloudinary";

export const uploadImage = async (file: any) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
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
