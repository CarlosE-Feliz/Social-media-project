import { Router } from "express";
import { CommentController } from "../controllers/comment.controller";

const router = Router();

//Create a new comment
router.post("/", CommentController.createComment);
//Get all comments
router.get("/", CommentController.getAllComments);
//Get a comment by ID
router.get("/:id", CommentController.getComment);
//Update a comment by ID
router.put("/:id", CommentController.updateComment);
//Delete a comment by ID 
router.delete("/:id", CommentController.deleteComment);