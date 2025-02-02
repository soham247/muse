import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Sparkles, Image, Type, FileText, Send, FilePlus } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

const BlogForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inputs, setInputs] = useState({
    thumbnail: null,
    title: "",
    description: "",
    content: "",
  });
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (isEditMode) {
      getBlogDetails();
    }
  }, [id]);

  const getBlogDetails = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/blogs/${id}`
      );

      if (response.status === 200) {
        setInputs(prev => ({
          ...prev,
          title: response.data.data?.title,
          description: response.data.data?.description,
          content: response.data.data?.content,
        }));
      }
    } catch (error) {
      toast.error("Failed to get blog details");
    }
  };

  const handleInputs = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    setInputs((prevState) => ({
      ...prevState,
      thumbnail: file,
    }));
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation for create mode
    if (!isEditMode && (
      inputs.thumbnail === null ||
      inputs.title === "" ||
      inputs.description === "" ||
      inputs.content === ""
    )) {
      toast.error("All fields are required");
      return;
    }

    // Validation for edit mode
    if (isEditMode && (
      inputs.title === "" ||
      inputs.description === "" ||
      inputs.content === ""
    )) {
      toast.error("All fields are required");
      return;
    }

    setIsSubmitting(true);

    try {
      let response;
      
      if (isEditMode) {
        // Update existing blog
        response = await axios.put(
          `${import.meta.env.VITE_API_URL}/api/v1/blogs/update/${id}`,
          {
            title: inputs.title,
            description: inputs.description,
            content: inputs.content,
          },
          { withCredentials: true }
        );
      } else {
        // Create new blog
        const formData = new FormData();
        formData.append("thumbnail", inputs.thumbnail);
        formData.append("title", inputs.title);
        formData.append("description", inputs.description);
        formData.append("content", inputs.content);

        response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/v1/blogs/create`,
          formData,
          {
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      }

      if (response.status === 200 || response.status === 201) {
        toast.success(`Blog ${isEditMode ? "updated" : "posted"} successfully`);
        navigate(`/blog/${response.data.data._id}`, { replace: true });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || `Failed to ${isEditMode ? "update" : "post"} blog`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
            {isEditMode ? "Update Your" : "Create Your"}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 ml-2">
              Story
            </span>
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Thumbnail Input - Only show in create mode */}
            {!isEditMode && (
              <div className="p-6 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300">
                <div className="flex items-center gap-2 mb-4">
                  <Image className="w-5 h-5 text-blue-400" />
                  <label htmlFor="thumbnail" className="text-lg font-medium">
                    Thumbnail
                  </label>
                </div>
                <label
                  htmlFor="thumbnail"
                  className="flex flex-col items-center justify-center p-4 border border-dashed border-blue-400 rounded-lg cursor-pointer hover:bg-blue-900/20 transition-all duration-300"
                >
                  <FilePlus className="w-10 h-10 text-blue-400 mb-2" />
                  <span className="text-blue-400 font-medium hover:underline">
                    Browse Files
                  </span>
                  <input
                    type="file"
                    name="thumbnail"
                    id="thumbnail"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileInput}
                  />
                </label>
                {preview && (
                  <div className="mt-4">
                    <img
                      src={preview}
                      alt="Thumbnail Preview"
                      className="max-w-full max-h-48 rounded-lg shadow-lg mx-auto"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Title Input */}
            <div className="p-6 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300">
              <div className="flex items-center gap-2 mb-4">
                <Type className="w-5 h-5 text-purple-400" />
                <label htmlFor="title" className="text-lg font-medium">
                  Title
                </label>
              </div>
              <input
                className="w-full py-3 px-4 rounded-lg bg-black/50 border border-white/10 focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all duration-300"
                type="text"
                name="title"
                placeholder="Enter your blog title"
                value={inputs.title}
                onChange={handleInputs}
                required
              />
            </div>

            {/* Description Input */}
            <div className="p-6 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-pink-400" />
                <label htmlFor="description" className="text-lg font-medium">
                  Description
                </label>
              </div>
              <input
                className="w-full py-3 px-4 rounded-lg bg-black/50 border border-white/10 focus:border-pink-400 focus:ring-1 focus:ring-pink-400 transition-all duration-300"
                type="text"
                name="description"
                placeholder="Brief description of your blog"
                value={inputs.description}
                onChange={handleInputs}
                required
              />
            </div>

            {/* Content Input */}
            <div className="p-6 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-blue-400" />
                <label htmlFor="content" className="text-lg font-medium">
                  Content
                </label>
              </div>
              <textarea
                name="content"
                placeholder="Write your blog content here..."
                value={inputs.content}
                onChange={handleInputs}
                className="w-full h-64 py-3 px-4 rounded-lg bg-black/50 border border-white/10 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all duration-300 resize-none"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto md:min-w-[200px] mx-auto flex items-center justify-center gap-2 px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-blue-700 to-purple-700 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                `${isEditMode ? "Updating..." : "Publishing..."}`
              ) : (
                <>
                  {isEditMode ? "Update" : "Publish"} <Send className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BlogForm;