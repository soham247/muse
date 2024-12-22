import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import { Link } from "react-router-dom";

function SearchedContent() {
    const key = useParams().key
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);

  const getBlogs = async () => {
    try{
        const response = await axios(
            `${import.meta.env.VITE_API_URL}/api/v1/blogs/search/key?key=${key}`,
            {withCredentials: true}
        )

        if(response.status === 200) {
            setBlogs(response.data?.data)
        }
    } catch (error) {
        console.log(error)
    } finally {
        setLoading(false)
    }
  }

  useEffect(() => {
    getBlogs()
  }, [key])
  
  
  return (
    <div>
      {loading ? (
        <div className="h-screen flex justify-center items-center">
          <PuffLoader color="#006eff" />
        </div>
      ) : (
        <div className="w-[90%] md:w-[80%] mx-auto">
          {blogs
            ? blogs.map((blog) => (
                <Link to={`/blog/${blog._id}`} key={blog._id}>
                  <div className="px-4 pb-3 shadow-md my-4 flex justify-around h-[25vh]">
                    {blog.thumbnail && (
                      <img
                        src={blog.thumbnail}
                        alt={blog.title}
                        className="w-1/3 h-full object-cover"
                      />
                    )}
                    <div>
                    <h1 className="text-2xl font-bold mt-2 text-center">
                      {blog.title}
                    </h1>
                    <p className="text-sm my-1 mr-3 italic">
                      by {blog.author?.fullname}
                    </p>
                    <p className="mt-5 text-xs italic text-white/50">Last updated on {new Date(blog.createdAt)
                        .toLocaleDateString()
                        .replaceAll("/", " . ")}
                    </p>
                    </div>
                  </div>
                </Link>
              ))
            : "Something went wrong"}
        </div>
      )}
    </div>
  );
}

export default SearchedContent;
