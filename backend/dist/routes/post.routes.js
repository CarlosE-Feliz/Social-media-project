"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const post_controller_1 = require("../controllers/post.controller");
const router = (0, express_1.Router)();
// Create a new post
router.post('/', (req, res, next) => {
    post_controller_1.PostController.createPost(req, res).catch(next);
});
// Get all posts
router.get('/', post_controller_1.PostController.getAllPosts);
// Get a post by ID
// router.get('/:id', PostController.getPostById);
// Update a post by ID
router.put('/:id', post_controller_1.PostController.updatePost);
// Delete a post by ID
router.delete('/:id', post_controller_1.PostController.deletePost);
exports.default = router;
