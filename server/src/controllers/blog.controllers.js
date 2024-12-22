import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Blog } from "../models/blog.models.js";
import { User } from "../models/user.models.js";
import { deleteFromCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";

const createBlog = asyncHandler( async(req, res) => {
    const {title, description, content} = req.body

    if([title, description, content].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required")
    }

    const file = req.files?.thumbnail?.[0]

    if(!file) {
        throw new ApiError(400, "Thumbnail is required")
    }

    let thumbnail;
    try {
        thumbnail = await uploadOnCloudinary(file.buffer)
    } catch (error) {
        console.log(error)
        throw new ApiError(500, "Something went wrong while uploading image on cloudinary")
    };

    const blog = await Blog.create({
        thumbnail: thumbnail?.url || "",
        title,
        description,
        content,
        author: req.user._id
    })

    if(!blog) {
        throw new ApiError(500, "Something went wrong while creating blog")
    }

    await User.findByIdAndUpdate(req.user._id, {
        $push: { blogs: blog._id },
    });

    return res
    .status(201)
    .json(new ApiResponse(201, blog, "Blog created successfully"))
})

const getBlogs = asyncHandler(async(req, res) => {
    const page = req.query.page || 1
    const limit = req.query.limit || 10

    const blogs = await Blog.find()
    .sort({createdAt: -1})
    .skip((page - 1) * limit)
    .limit(limit)
    .populate("author", "fullname _id")

    if(!blogs) {
        throw new ApiError(500, "Something went wrong while fetching blogs")
    }

    return res
    .status(200)
    .json(new ApiResponse(200, blogs, "Blogs fetched successfully"))
})

const getBlog = asyncHandler(async(req, res) => {
    const blog = await Blog.findById(req.params.id).populate("author", "fullname")

    if(!blog) {
        throw new ApiError(404, "Blog not found")
    }

    return res
    .status(200)
    .json(new ApiResponse(200, blog, "Blog fetched successfully"))
})

const deleteBlog = asyncHandler(async(req, res) => {

    const blog = await Blog.findByIdAndDelete(req.params.id)
    
    if(!blog) {
        throw new ApiError(404, "Blog not found")
    }

    if(blog.thumbnail) {
        const urlParts = blog.thumbnail.split("/")
        const publicId = urlParts[urlParts.length - 1].split(".")[0]
        
        const deletedImage = await deleteFromCloudinary(publicId)
        if(!deletedImage) {
            throw new ApiError(500, "Something went wrong while deleting image from cloudinary")
        }
    }

    return res
    .status(200)
    .json(new ApiResponse(200, blog, "Blog deleted successfully"))
})

const updateBlog = asyncHandler(async(req, res) => {

    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {new: true})

    if(!blog) {
        throw new ApiError(404, "Blog not found")
    }

    return res
    .status(200)
    .json(new ApiResponse(200, blog, "Blog updated successfully"))
})

const searchBlogs = asyncHandler(async (req, res) => {
    // const page = parseInt(req.query.page) || 1;
    // const limit = parseInt(req.query.limit) || 10;
    // const key = req.query.key || "demo";
    const {key, page, limit} = req.query
    console.log("Search Term: ", key);  // Log the search term

    const blogs = await Blog.find({
        $or: [
            { title: { $regex: key, $options: "$i" } },
            { description: { $regex: key, $options: "$i" } },
            { content: { $regex: key, $options: "$i" } },
        ]
    })
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .populate("author")

    if (!blogs) {
        return res.status(500).json(new ApiResponse(500, null, "Failed to fetch blogs."));
    }

    return res
        .status(200)
        .json(new ApiResponse(200, blogs, "Blogs fetched successfully"));
});


export {
    createBlog,
    getBlogs,
    getBlog,
    deleteBlog,
    updateBlog,
    searchBlogs
}