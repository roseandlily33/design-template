const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Project = require("../models/Project");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// --- CREATE ACCOUNT ---
router.post("/create-account", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("/create-account called with:", { email });
    if (!email || !password) {
      console.log("Missing email or password");
      return res.status(400).json({ error: "Email and password required" });
    }
    const existing = await User.findOne({ email });
    if (existing) {
      console.log("Email already in use:", email);
      return res.status(409).json({ error: "Email already in use" });
    }
    const hash = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hash });
    await user.save();
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      // in production we require SameSite=None and Secure; for local dev use Lax
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    console.log("Account created for userId:", user._id);
    return res.json({ message: "Account created", userId: user._id });
  } catch (err) {
    console.error("Error in /create-account:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

// Middleware to protect routes
function authMiddleware(req, res, next) {
  try {
    console.log("authMiddleware called");
    const token = req.cookies?.token;
    console.log("Token from cookies:", token);
    if (!token) {
      console.log("No token found in cookies");
      return res.status(401).json({ error: "Not authenticated" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    console.error("Invalid token in authMiddleware:", err);
    return res.status(401).json({ error: "Invalid token" });
  }
}
// --- AUTH STATUS ---
router.get("/me", authMiddleware, async (req, res) => {
  try {
    console.log("/me called for userId:", req.userId);
    const user = await User.findById(req.userId).select("email lastLogin");
    if (!user) {
      console.log("User not found for userId:", req.userId);
      return res.status(404).json({ error: "User not found" });
    }
    console.log("Returning user info:", user);
    return res.json({ loggedIn: true, user });
  } catch (err) {
    console.error("Error in /me:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

// --- LOGIN ---
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("/login called with:", { email });
    const user = await User.findOne({ email });
    if (!user) {
      console.log("Invalid credentials: user not found for", email);
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      console.log("Invalid credentials: wrong password for", email);
      return res.status(401).json({ error: "Invalid credentials" });
    }
    user.lastLogin = new Date();
    await user.save();
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    console.log("User logged in:", user._id);
    return res.json({ message: "Logged in", userId: user._id });
  } catch (err) {
    console.error("Error in /login:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

router.post("/logout", (req, res) => {
  try {
    res.clearCookie("token");
    console.log("User logged out");
    return res.json({ message: "Logged out" });
  } catch (err) {
    console.error("Error in /logout:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

router.get("/project/:id", authMiddleware, async (req, res) => {
  try {
    console.log("/project/:id called for id:", req.params.id);
    const project = await Project.findById(req.params.id);
    if (!project) {
      console.log("Project not found for id:", req.params.id);
      return res.status(404).json({ error: "Project not found" });
    }
    console.log("Returning project:", project);
    return res.json(project);
  } catch (err) {
    console.error("Error in /project/:id:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

// --- LIST PROJECTS FOR USER ---
router.get("/projects", authMiddleware, async (req, res) => {
  try {
    console.log("/projects called for userId:", req.userId);
    const user = await User.findById(req.userId).select("projects");
    if (!user) {
      console.log("User not found for userId:", req.userId);
      return res.status(404).json({ error: "User not found" });
    }
    // populate project basic info
    const projects = await Project.find({ _id: { $in: user.projects } }).select(
      "title createdAt updatedAt",
    );
    console.log("Returning projects for user:", projects.length);
    return res.json({ projects });
  } catch (err) {
    console.error("Error in /projects:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

router.post("/project", authMiddleware, async (req, res) => {
  try {
    const { project } = req.body;
    console.log(
      "/project called for userId:",
      req.userId,
      "project:",
      project?.title,
    );
    let user = await User.findById(req.userId);
    if (!user) {
      console.log("User not found for userId:", req.userId);
      return res.status(404).json({ error: "User not found" });
    }
    let proj;
    // Only update if _id is present and belongs to the user
    if (
      project._id &&
      user.projects.map((id) => id.toString()).includes(project._id.toString())
    ) {
      proj = await Project.findByIdAndUpdate(project._id, project, {
        new: true,
      });
      console.log("Project updated:", proj);
    } else {
      // Check for existing project with same title for this user
      const existingProj = await Project.findOne({
        title: project.title,
        _id: { $in: user.projects },
      });
      if (existingProj) {
        // Update the existing project
        proj = await Project.findByIdAndUpdate(existingProj._id, project, {
          new: true,
        });
        console.log("Project updated by title:", proj);
      } else {
        // Create new project
        proj = new Project(project);
        await proj.save();
        user.projects.push(proj._id);
        await user.save();
        console.log("Project created:", proj);
      }
    }
    // Return updated project list for dropdown refresh
    const projects = await Project.find({ _id: { $in: user.projects } }).select(
      "title createdAt updatedAt",
    );
    return res.json({ project: proj, projects });
  } catch (err) {
    console.error("Error in /project:", err);
    return res.status(500).json({ error: "Server error" });
  }
});
// --- DELETE PROJECT ---
router.delete("/project/:id", authMiddleware, async (req, res) => {
  try {
    const projectId = req.params.id;
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (!user.projects.includes(projectId)) {
      return res
        .status(403)
        .json({ error: "Not authorized to delete this project" });
    }
    user.projects = user.projects.filter(
      (pid) => pid.toString() || pid._id !== projectId,
    );
    await user.save();
    await Project.findByIdAndDelete(projectId);
    return res.json({ message: "Project deleted" });
  } catch (err) {
    console.error("Error in DELETE /project/:id:", err);
    return res.status(500).json({ error: "Server error" });
  }
});
// --- PUBLIC GET SHARED PROJECT ---
router.get("/shared-project/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    if (!project.shared) {
      return res.status(403).json({ error: "Project is not shared" });
    }
    return res.json(project);
  } catch (err) {
    console.error("Error in /shared-project/:id:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

// --- SHARE PROJECT (set shared flag) ---
router.patch("/project/:id/share", authMiddleware, async (req, res) => {
  try {
    const projectId = req.params.id;
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (!user.projects.includes(projectId)) {
      return res
        .status(403)
        .json({ error: "Not authorized to share this project" });
    }
    const project = await Project.findByIdAndUpdate(
      projectId,
      { shared: true },
      { new: true },
    );
    console.log("Project shared:", projectId);
    return res.json({ message: "Project shared", project });
  } catch (err) {
    console.error("Error in PATCH /project/:id/share:", err);
    return res.status(500).json({ error: "Server error" });
  }
});
module.exports = router;
