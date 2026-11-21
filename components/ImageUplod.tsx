"use client";
import { useState } from "react";

interface ImageUploadProps {
  value?: string;
  onUpload: (url: string) => void;
}

const CLOUD_NAME = "v8n1guka";
const UPLOAD_PRESET = "kk_halal_mart_present";

export default function ImageUpload({ value, onUpload }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMsg("");
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (!res.ok || !data.secure_url) {
        throw new Error(data?.error?.message || "फोटो अपलोड गर्न सकिएन।");
      }

      onUpload(data.secure_url);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "अपलोड गर्दा समस्या आयो।";
      setErrorMsg(message);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div className="my-3 space-y-2">
      <label className="block w-full text-center bg-green-600 active:bg-green-700 text-white py-3 px-4 rounded-xl font-semibold cursor-pointer transition">
        {uploading
          ? "फोटो अपलोड हुँदैछ..."
          : "📷 फोटो छान्नुहोस् / खिच्नुहोस्"}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={uploading}
          className="hidden"
        />
      </label>

      {errorMsg && (
        <p className="text-sm text-red-600 font-medium">{errorMsg}</p>
      )}

      {value && (
        <div className="mt-2">
          <img
            src={value}
            alt="Uploaded product preview"
            className="w-28 h-28 object-cover rounded-lg border border-gray-200"
          />
        </div>
      )}
    </div>
  );
}