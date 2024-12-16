import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { EllipsisVertical, Pencil, Trash } from 'lucide-react'
import { PuffLoader } from 'react-spinners'

function Profile() {
    const { id } = useParams();
    const currentUser = useSelector((state) => state.auth.user);
    const [options, setOptions] = useState(false);
    const [openMenu, setOpenMenu] = useState(null); // Track which blog's menu is open
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);

    const getUser = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/v1/user/profile/${id}`,
                { withCredentials: true }
            );

            if (response.status === 200) {
                setUser(response.data?.data);
                if (currentUser?._id === id) {
                    setOptions(true);
                }
            }
        } catch (error) {
            navigate('*', { replace: true });
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
                toast.success('Blog deleted successfully');
                navigate(`/home`);
            }
        } catch (error) {
            toast.error('Something went wrong');
        }
    };

    useEffect(() => {
        getUser();
    }, [id]);

    if(loading) {
        return (
            <div className='h-screen flex justify-center items-center'>
                <PuffLoader color="#006eff" />
            </div>
        )
    }

    return (
        <div className="text-center mt-8">
            <h1 className="text-3xl font-bold text-blue-700">{user.fullname}</h1>
            <p>@{user.username}</p>
            <p>joined on {new Date(user.createdAt).toLocaleDateString()}</p>
            <h2 className="text-xl font-semibold my-4">
                {user.blogs?.length} Blog{user.blogs?.length > 1 && 's'}
            </h2>
            <hr className="mx-20 my-10" />
            <div className="w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {user.blogs?.map((blog) => (
                    <div className="shadow-md p-4 relative" key={blog._id}>
                        {options && (
                            <div>
                                <div className="flex justify-end">
                                    <EllipsisVertical
                                        onClick={() =>
                                            setOpenMenu(openMenu === blog._id ? null : blog._id)
                                        }
                                    />
                                </div>
                                {openMenu === blog._id && (
                                    <div className="absolute right-0 mt-4 flex flex-col gap-2 backdrop-blur px-2 py-3 shadow-lg rounded-md text-white/80">
                                        <Link
                                            to={`/edit/${blog._id}`}
                                            className="hover:text-blue-500 flex items-center gap-3"
                                        >
                                            <Pencil size={16} />
                                            <span>Edit</span>
                                        </Link>
                                        <button
                                            className="text-red-500/80 flex items-center gap-3"
                                            onClick={() => deleteBlog(blog._id)}
                                        >
                                            <Trash size={16} />
                                            <span>Delete</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                        <Link to={`/blog/${blog._id}`}>
                            <div>
                                <h3>{blog.title}</h3>
                                <p>{blog.description}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Profile;

