import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { createBlog, deleteBlog, getBlog, getBlogs, searchBlogs, updateBlog } from "../controllers/blog.controllers.js";

const router = Router();

router.route("/create").post(verifyJWT, createBlog)
router.route("/").get(verifyJWT, getBlogs)
router.route("/:id").get(getBlog)
router.route("/delete/:id").delete(verifyJWT, deleteBlog)
router.route("/update/:id").put(verifyJWT,updateBlog)
router.route("/searchblogs").get(searchBlogs)

export default router;