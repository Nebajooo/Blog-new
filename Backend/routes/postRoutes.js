import express from "express";
import {
  authenticateToken,
  authorizeRoles,
} from "../middleware/authMiddleware.js";
import {
  createPost,
  getPosts,
  deletePost,
  updatePost,
} from "../controllers/postController.js";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

router.post(
  "/",
  authenticateToken,
  authorizeRoles("admin"),

  upload.single("image"),
  createPost
);
router.get("/", authenticateToken, getPosts);
router.delete("/:id", authenticateToken, authorizeRoles("admin"), deletePost);
router.put(
  "/:id",
  authenticateToken,
  authorizeRoles("admin"),
  upload.single("image"),
  updatePost
);
export default router;
