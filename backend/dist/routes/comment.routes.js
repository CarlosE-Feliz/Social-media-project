"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comment_controller_1 = require("../controllers/comment.controller");
const router = (0, express_1.Router)();
//Create a new comment
router.post("/", comment_controller_1.CommentController.createComment);
//Get all comments
router.get("/", comment_controller_1.CommentController.getAllComments);
//Get a comment by ID
router.get("/:id", comment_controller_1.CommentController.getComment);
//Update a comment by ID
router.put("/:id", comment_controller_1.CommentController.updateComment);
//Delete a comment by ID 
router.delete("/:id", comment_controller_1.CommentController.deleteComment);
