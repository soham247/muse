import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { Search, Clock, User, ChevronRight } from "lucide-react";

const SearchedContent = () => {
  const { key } = useParams();
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);

  const getBlogs = async () => {
    try {
      const response = await axios(
        `${import.meta.env.VITE_API_URL}/api/v1/blogs/search/key?key=${key}`,
        { withCredentials: true }
      );

      if (response.status === 200) {
        setBlogs(response.data?.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    getBlogs();
  }, [key]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex justify-center items-center">
        <div className="p-8 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Search className="w-8 h-8 text-blue-400" />
              <h1 className="text-xl md:text-3xl font-bold">
                Search Results for{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                  "{key}"
                </span>
              </h1>
            </div>
            <p className="text-gray-400">
              Found {blogs.length} matching results
            </p>
          </div>

          {blogs?.length > 0 ? (
            <div className="space-y-6">
              {blogs.map((blog) => (
                <Link to={`/blog/${blog._id}`} key={blog._id}>
                  <article className="group p-6 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 mb-4">
                    <div className="flex flex-col md:flex-row gap-6">
                      {blog.thumbnail && (
                        <div className="w-full md:w-1/3">
                          <img
                            src={blog.thumbnail}
                            alt={blog.title}
                            className="w-full h-48 md:h-full object-cover rounded-lg"
                          />
                        </div>
                      )}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h2 className="text-2xl font-bold mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                            {blog.title}
                          </h2>
                          <div className="flex items-center gap-2 text-gray-400 mb-4">
                            <User className="w-4 h-4" />
                            <span className="text-sm">
                              by {blog.author?.fullname}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-gray-400">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm">
                              {new Date(blog.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )}
                            </span>
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transform group-hover:translate-x-1 transition-all duration-300" />
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center p-12 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10">
              <h2 className="text-2xl font-semibold mb-2">No Results Found</h2>
              <p className="text-gray-400">
                Try searching with different keywords or browse our latest
                posts.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchedContent;
