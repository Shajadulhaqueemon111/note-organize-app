import React, { useState } from "react";
import axios from "axios";
import { LuImageUp } from "react-icons/lu";
const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("content", content);
    if (image) {
      formData.append("image", image);
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/notes",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Note created:", res.data);
      // Clear form
      setTitle("");
      setCategory("");
      setContent("");
      setImage(null);
      alert("Note created successfully!");
    } catch (err) {
      console.error("Error creating note:", err);
      alert("Failed to create note.");
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

        {/* Category */}
        <div>
          <label className="block font-medium mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select category</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Creative">Creative</option>
          </select>
        </div>

        {/* Image Upload */}
        <div>
          <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
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
        </div>
      </form>
    </div>
  );
};

export default CreateNote;
