/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { LuImageUp } from "react-icons/lu";
import toast from "react-hot-toast";
import { useAuth } from "../AuthProvider/AuthContext";
import { useNavigate } from "react-router-dom";

const CreateNote = () => {
  const { user } = useAuth();
  const userId = user?._id;
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("personal");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const saveTimeout = useRef<NodeJS.Timeout | null>(null);

  const autosave = async () => {
    if (!title && !content) return;
    if (!image) {
      toast.error("Please upload an image to autosave.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("content", content);
    formData.append("userId", userId || "");
    formData.append("image", image);

    try {
      setIsSaving(true);
      await axios.post(
        "https://note-organize-app-backend.vercel.app/api/v1/notes/create-note",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Note created successfully!");
    } catch (error) {
      toast.error("Autosave failed.");
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    if (saveTimeout.current) clearTimeout(saveTimeout.current);

    saveTimeout.current = setTimeout(() => {
      autosave();
    }, 2000);

    return () => {
      if (saveTimeout.current) clearTimeout(saveTimeout.current);
    };
  }, [title, category, content, image]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await autosave();
      navigate("/dashboard/all-notes");
    } catch (err) {
      toast.error("Failed to create note before redirecting");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
      <h1 className="text-2xl font-bold mb-6 text-indigo-600">
        Create New Note
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter note title"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="personal">Personal</option>
            <option value="work">Work</option>
            <option value="creativity">Creativity</option>
            <option value="ideas">Ideas</option>
            <option value="todo">To-Do</option>
            <option value="important">Important</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
            <LuImageUp className="text-indigo-600 text-lg" />
            Upload Image
          </label>

          <div className="relative border border-dashed border-indigo-400 rounded-lg p-4 text-center hover:bg-indigo-50 transition cursor-pointer">
            <input
              type="file"
              accept="image/*"
              id="image-upload"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <p className="text-sm text-gray-500">
              Click or drag to upload your note image
            </p>
            {image && (
              <p className="text-sm text-gray-700 mt-2 font-medium">
                Selected: {image.name}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={5}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Write your note here..."
          ></textarea>
        </div>

        <div>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Save Note
          </button>
          {isSaving && (
            <p className="text-sm text-indigo-600 mt-2 animate-pulse">
              Saving...
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreateNote;
