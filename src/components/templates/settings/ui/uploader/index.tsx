"use client";
import Image from "next/image";
import { FaUpload } from "react-icons/fa";

const ImageUploader = ({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (url: string | null) => void;
}) => {
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    onChange(url);
  };

  return (
    <div className="flex items-center gap-4">
      <div className="w-16 h-16 relative rounded-full overflow-hidden">
        <Image
          src={value || "/default-avatar.jpg"}
          alt="Profile"
          width={64}
          height={64}
          className="object-cover w-full h-full"
        />
      </div>
      <label className="text-sm font-medium text-blue-600 cursor-pointer flex items-center gap-2">
        <FaUpload />
        <span>Upload Image</span>
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="hidden"
        />
      </label>
    </div>
  );
};

export default ImageUploader;
