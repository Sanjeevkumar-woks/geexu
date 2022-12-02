import {
  getBlogsByFilter,
  getBlogById,
  deleteBlogById,
  addBlogs,
  updateBlogById,
} from "../helper.js";
import express from "express";
const router = express.Router();

//search blogs
router.get("/", async (req, res) => {
  if (req.query.rating) {
    req.query.rating = +req.query.rating;
  }
  const blogs = await getBlogsByFilter(req);
  res.send(blogs);
});

//Get blogs by Id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const blog = await getBlogById(id);
  blog ? res.send(blog) : res.status(404).send({ message: "no blogs found" });
});

//Delete blogs by Id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const blog = await deleteBlogById(id);
  res.send(blog);
});

//Add blogs 
router.post("/", async (req, res) => {
  const newblogs = req.body;
  const result = await addBlogs(newblogs);
  res.send(result);
});

//Update blogs
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updateBlog = req.body;
  const result = await updateBlogById(id, updateBlog);
  res.send(result);
});

export const blogsRouter = router;
