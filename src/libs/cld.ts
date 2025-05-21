"use server";
import { arrayBufferToBase64 } from "../utils/buffer";
import { v2 as cld } from "cloudinary";

cld.config({
  api_key: process.env.CLD_KEY,
  api_secret: process.env.CLD_SECRET,
  cloud_name: process.env.CLD_NAME,
});
export async function uploadFile(buffer: ArrayBuffer, fileType: string) {
  const base64String = arrayBufferToBase64(buffer);
  const dataUri = `data:${fileType};base64,${base64String}`;

  try {
    const result = await cld.uploader.upload(dataUri, {
      folder: "connect-rosario",
    });
    return {
      ok: true,
      uploadedAsset: {
        secureUrl: result.secure_url,
        publicId: result.public_id,
        width: result.width,
        height: result.height,
        size: result.bytes,
      },
    };
  } catch {
    return {
      ok: false,
      uploadedAsset: null,
    };
  }
}

export async function deleteFile(publicId: string) {
  try {
    await cld.uploader.destroy(publicId);

    return {
      ok: true,
    };
  } catch {
    return {
      ok: false,
    };
  }
}
