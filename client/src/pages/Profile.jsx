import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { EllipsisVertical, Pencil, Trash, Calendar, User, Clock, Book } from "lucide-react";
import { PuffLoader } from "react-spinners";

const BlogCard = ({ blog, options, openMenu, setOpenMenu, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await onDelete(blog._id);
    setIsDeleting(false);
  };

  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 overflow-hidden group relative">
      {options && (
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={() => setOpenMenu(openMenu === blog._id ? null : blog._id)}
            className="p-2 rounded-full bg-black/20 backdrop-blur-lg hover:bg-black/40 transition-colors duration-300"
          >
            <EllipsisVertical className="w-5 h-5" />
          </button>
          
          {openMenu === blog._id && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-900/95 backdrop-blur-lg rounded-xl border border-white/10 shadow-xl overflow-hidden">
              <Link
                to={`/edit/${blog._id}`}
                className="flex items-center gap-2 px-4 py-3 hover:bg-white/5 transition-colors duration-300"
              >
                <Pencil className="w-4 h-4" />
                <span>Edit Blog</span>
              </Link>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="w-full flex items-center gap-2 px-4 py-3 text-red-400 hover:bg-white/5 transition-colors duration-300"
              >
                {isDeleting ? (
                  <PuffLoader color="#F87171" size={16} />
                ) : (
                  <Trash className="w-4 h-4" />
                )}
                <span>{isDeleting ? "Deleting..." : "Delete Blog"}</span>
              </button>
            </div>
          )}
        </div>
      )}
      
      {isDeleting && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-20">
          <div className="text-center">
            <PuffLoader color="#3B82F6" size={40} />
            <p className="mt-4 text-sm text-gray-300">Deleting blog...</p>
          </div>
        </div>
      )}
      
      <Link to={`/blog/${blog._id}`} className={isDeleting ? 'pointer-events-none' : ''}>
        {blog.thumbnail && (
          <div className="relative h-48 overflow-hidden">
            <img
              src={blog.thumbnail}
              alt={blog.title}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
        )}
        
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            {blog.title}
          </h3>
          <p className="text-gray-300 mb-4 line-clamp-2">{blog.description}</p>
          <div className="flex items-center text-sm text-gray-400">
            <Calendar className="w-4 h-4 mr-2" />
            {new Date(blog.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </div>
        </div>
      </Link>
    </div>
  );
};

function Profile() {
  const { id } = useParams();
  const currentUser = useSelector((state) => state.auth.userId);
  const [options, setOptions] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUser = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/user/profile/${id}`,
        { withCredentials: true }
      );

      if (response.status === 200) {
        setUser(response.data?.data);

        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/blogs/user/${id}`
        );
        if (res.status === 200) {
          setBlogs(res.data?.data);
        }

        if (currentUser === id) {
          setOptions(true);
        }
      }
    } catch (error) {
      navigate("*", { replace: true });
    }
    setLoading(false);
  };

  const deleteBlog = async (blogId) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/v1/blogs/delete/${blogId}`,
        { withCredentials: true }
      );

      if (response.status === 200) {
        setOpenMenu(null); // Close the menu after successful deletion
        toast.success("Blog deleted successfully");
        setBlogs(blogs.filter(blog => blog._id !== blogId));
      }
    } catch (error) {
      toast.error("Something went wrong while deleting the blog");
    }
  };

  useEffect(() => {
    getUser();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black">
        <PuffLoader color="#3B82F6" />
        <p className="mt-4 text-gray-400">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
            <User className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            {user.fullname}
          </h1>
          
          <div className="flex flex-col items-center gap-4 text-gray-400 mb-6">
            <p className="flex items-center">
              @{user.username}
            </p>
            <p className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              Joined {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="inline-flex items-center px-4 py-2 bg-white/5 backdrop-blur-lg rounded-full">
            <Book className="w-4 h-4 mr-2 text-blue-400" />
            <span className="text-gray-300">
              {blogs?.length} Blog{blogs?.length !== 1 && "s"}
            </span>
          </div>
        </div>

        {blogs?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <BlogCard
                key={blog._id}
                blog={blog}
                options={options}
                openMenu={openMenu}
                setOpenMenu={setOpenMenu}
                onDelete={deleteBlog}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400">No blogs published yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;