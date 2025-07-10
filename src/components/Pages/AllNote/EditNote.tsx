/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { LuImageUp } from "react-icons/lu";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const EditNote = () => {
  const { _id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [createdAt, setCreatedAt] = useState("");
  const [existingImage, setExistingImage] = useState("");

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) return;

        const res = await axios.get(
          `https://note-organize-app-backend.vercel.app/api/v1/notes/${_id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const note = res.data.data;
        setTitle(note.title);
        setContent(note.content);
        setCategory(note.category);
        setCreatedAt(new Date(note.createdAt).toISOString().split("T")[0]);
        setExistingImage(note.image);
      } catch {
        toast.error("Failed to load note details");
      }
    };

    fetchNote();
  }, [_id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("content", content);
    formData.append("createdAt", createdAt);
    formData.append("isArchived", "false");
    formData.append("isDeleted", "false");

    if (image) {
      formData.append("image", image);
    } else {
      formData.append("image", existingImage);
    }

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) return toast.error("Token missing!");

      const res = await axios.patch(
        `https://note-organize-app-backend.vercel.app/api/v1/notes/${_id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res);
      toast.success("Note updated successfully!");
      navigate("/dashboard/all-notes");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
      <h1 className="text-2xl font-bold mb-6 text-indigo-600">Edit Note</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full border rounded-lg px-4 py-2"
          >
            <option value="">Select category</option>
            <option value="personal">Personal</option>
            <option value="work">Work</option>
            <option value="Creativity">Creativity</option>
            <option value="ideas">Ideas</option>
            <option value="todo">To-Do</option>
            <option value="important">Important</option>
          </select>
        </div>

        <div>
          <label className="flex items-center gap-2 font-medium text-sm mb-1">
            <LuImageUp className="text-indigo-600" />
            Upload Image
          </label>
          <div className="relative border border-dashed border-indigo-400 rounded-lg p-4 text-center">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <p className="text-sm text-gray-500">
              Click or drag to upload your note image
            </p>
            {image ? (
              <p className="text-sm text-gray-700 mt-2 font-medium">
                Selected: {image.name}
              </p>
            ) : (
              existingImage && (
                <img
                  src={existingImage}
                  alt="Previous"
                  className="mt-2 w-28 h-20 object-cover mx-auto rounded-md"
                />
              )
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
            className="w-full border rounded-lg px-4 py-2"
          ></textarea>
        </div>

        <div>
          <label className="block font-medium mb-1">Date</label>
          <input
            type="date"
            value={createdAt}
            onChange={(e) => setCreatedAt(e.target.value)}
            required
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Update Note
        </button>
      </form>
    </div>
  );
};

export default EditNote;
