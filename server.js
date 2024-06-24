const express = require("express");
const connectDB = require("./config/config");
const Blog = require("./models/blog");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse JSON
app.use(express.json());

app.post("/api/blogs", async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/api/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.get("/api/blogs/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.put("/api/blogs/:id", async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.delete("/api/blogs", async (req, res) => {
  try {
    await Blog.deleteMany();
    res.json({ message: "All blogs deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.delete("/api/blogs/:id", async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog deleted successfully", deletedBlog: blog });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
const port = 4500;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
