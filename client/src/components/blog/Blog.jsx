import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { PuffLoader } from "react-spinners";
import { Calendar, User, Clock, ArrowLeft } from "lucide-react";

function Blog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getBlog = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/blogs/${id}`
      );

      if (response.status === 200) {
        setBlog(response.data?.data);
      }
    } catch (error) {
      setError(error.message);
      navigate("*");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black">
        <PuffLoader color="#3B82F6" />
        <p className="mt-4 text-gray-400">Loading article...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black">
        <div className="text-center p-8 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10">
          <h2 className="text-2xl font-semibold mb-4 text-red-400">
            Failed to load article
          </h2>
          <p className="text-gray-300 mb-6">{error}</p>
          <button
            onClick={() => getBlog()}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors duration-300"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Articles
        </button>

        <article className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 overflow-hidden">
          {/* Hero Section */}
          {blog.thumbnail && (
            <div className="relative w-full aspect-video">
              <img
                src={blog.thumbnail}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
            </div>
          )}

          {/* Content Section */}
          <div className="p-6 md:p-8">
            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-6">
              <Link
                to={`/profile/${blog.author?._id}`}
                className="flex items-center hover:text-blue-400 transition-colors duration-300"
              >
                <User className="w-4 h-4 mr-2" />
                {blog.author?.fullname}
              </Link>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                {new Date(blog.updatedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                {new Date(blog.updatedAt).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              {blog.title}
            </h1>

            {/* Content */}
            <div className="prose prose-invert prose-lg max-w-none">
              <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                {blog.content}
              </p>
            </div>

            {/* Share Section */}
            <div className="mt-12 pt-6 border-t border-white/10">
              <p className="text-gray-400 text-sm">Share this article:</p>
              <div className="flex flex-wrap gap-4 mt-3">
                <button
                  onClick={() =>
                    window.open(
                      `https://twitter.com/share?url=${encodeURIComponent(
                        window.location.href
                      )}&text=Check+out+this+article!`,
                      "_blank"
                    )
                  }
                  className="flex-1 px-4 py-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-colors duration-300"
                >
                  Twitter
                </button>
                <button
                  onClick={() =>
                    window.open(
                      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                        window.location.href
                      )}`,
                      "_blank"
                    )
                  }
                  className="flex-1 px-4 py-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-colors duration-300"
                >
                  Facebook
                </button>
                <button
                  onClick={() =>
                    window.open(
                      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                        window.location.href
                      )}`,
                      "_blank"
                    )
                  }
                  className="flex-1 px-4 py-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-colors duration-300"
                >
                  LinkedIn
                </button>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

export default Blog;
