import { Router } from "express";
import { LikeController } from "../controllers/likes.controller";

const router = Router();
// Create a new like
router.post("/", LikeController.createLike);
// Delete a like
router.delete("/", LikeController.deleteLike);
// Get likes by post ID
router.get("/:postId", LikeController.getLikesByPost);

export default router;