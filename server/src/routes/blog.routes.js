import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { createBlog, deleteBlog, getBlog, getBlogs, getBlogsOfUser, searchBlogs, updateBlog } from "../controllers/blog.controllers.js";
import { upload } from "../middlewares/multer.middlewares.js";

const router = Router();

router.route("/create").post(verifyJWT,
    upload.fields([
        { name: "thumbnail", maxCount: 1 },
    ]),
    createBlog)
router.route("/").get(verifyJWT, getBlogs)
router.route("/user/:id").get(getBlogsOfUser)
router.route("/:id").get(getBlog)
router.route("/delete/:id").delete(verifyJWT, deleteBlog)
router.route("/update/:id").put(verifyJWT,updateBlog)
router.route("/search/key").get(searchBlogs)

export default router;