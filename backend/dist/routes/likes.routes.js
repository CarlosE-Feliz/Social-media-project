"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const likes_controller_1 = require("../controllers/likes.controller");
const router = (0, express_1.Router)();
// Create a new like
router.post("/", likes_controller_1.LikeController.createLike);
// Delete a like
router.delete("/", likes_controller_1.LikeController.deleteLike);
// Get likes by post ID
router.get("/:postId", likes_controller_1.LikeController.getLikesByPost);
exports.default = router;
