import { Router } from 'express';
import {PostController} from '../controllers/post.controller';

const router = Router();

// Create a new post
router.post('/', (req, res, next) => {
  PostController.createPost(req, res).catch(next);
});

// Get all posts
router.get('/', PostController.getAllPosts);

// Get a post by ID
// router.get('/:id', PostController.getPostById);

// Update a post by ID
router.put('/:id', PostController.updatePost);

// Delete a post by ID
router.delete('/:id', PostController.deletePost);

export default router;