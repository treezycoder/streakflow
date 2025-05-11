"use client";

import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks/useOutSideClick";

import { motion } from "framer-motion";
import { FaRegClock, FaUser, FaHashtag } from "react-icons/fa";
import { setSettings } from "@/redux/slices/app";
import ImageUploader from "../uploader";
import ToggleSwitch from "../toggle";
import Button from "@/components/button";
import { showSuccess } from "@/lib/utils/toast";

const SettingsForm = () => {
  const { settings } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState(settings);
  const [errors, setErrors] = useState({ name: "", age: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggle = (key: keyof typeof settings, value: boolean) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleImageChange = (url: string | null) => {
    setFormData((prev) => ({ ...prev, image: url }));
  };

  const validate = () => {
    let valid = true;
    const newErrors = { name: "", age: "" };
    if (!formData.name) {
      newErrors.name = "Name is required";
      valid = false;
    }
    if (formData.age < 1 || formData.age > 100) {
      newErrors.age = "Age must be between 1 and 100";
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    dispatch(setSettings(formData));
    showSuccess("Saved Successfully");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-2xl mx-auto p-6 rounded-2xl shadow-sm backdrop-blur-lg bg-white/10 dark:bg-gray-900 border border-white/10"
    >
      <h2 className="text-2xl font-poppins tracking-tight font-semibold text-gray-900 dark:text-white mb-6">
        User Settings
      </h2>

      <div className="flex flex-col gap-6">
        <ImageUploader value={formData.image} onChange={handleImageChange} />

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
            <FaUser /> Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            className="px-3 py-2 rounded-lg bg-white dark:bg-zinc-900 dark:text-white border border-gray-300 dark:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
            <FaHashtag /> Age
          </label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="px-3 py-2 rounded-lg bg-white  dark:text-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.age && <p className="text-sm text-red-500">{errors.age}</p>}
        </div>

        <div className="flex flex-col gap-4">
          <ToggleSwitch
            label="Dark Mode"
            checked={formData.darkMode}
            onChange={(val) => handleToggle("darkMode", val)}
          />

          {/* <ToggleSwitch
            label="Push Notifications"
            checked={formData.pushNotifications}
            onChange={(val) => handleToggle("pushNotifications", val)}
          /> */}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
            <FaRegClock className=" dark:text-white" /> Reminder Time
          </label>
          <input
            type="time"
            name="reminderTime"
            value={formData.reminderTime}
            onChange={handleChange}
            className="px-3 py-2 rounded-lg bg-white dark:bg-zinc-900  dark:text-white border  border-gray-300 dark:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="pt-4">
          <Button
            variants="primary"
            className="font-inter"
            onClick={handleSubmit}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default SettingsForm;
