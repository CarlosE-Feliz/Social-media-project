"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = void 0;
const models_1 = require("../models");
const response201_1 = require("../helpers/response201");
class PostController {
    static createPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            try {
                const { caption, imageUrl, fullname, userId } = req.body;
                // Validate user field
                if (!userId) {
                    return res.status(400).json({
                        success: false,
                        message: 'User ID is required to create a post'
                    });
                }
                // Find the user to get full name
                const user = yield models_1.User.findByPk(userId);
                if (!user) {
                    return res.status(404).json({
                        success: false,
                        message: 'User not found'
                    });
                }
                // Create the post
                const newPost = yield models_1.Post.create({
                    caption,
                    imageUrl,
                    fullname: fullname || user.fullname, // Use user's fullname if not provided
                    userId,
                    CreatedAt: new Date()
                });
                res.status(201).json({
                    success: true,
                    message: 'Post created successfully',
                    post: [{
                            id: newPost.id,
                            caption: (_a = newPost.caption) !== null && _a !== void 0 ? _a : '',
                            imageUrl: (_b = newPost.imageUrl) !== null && _b !== void 0 ? _b : '',
                            fullname: (_c = newPost.fullname) !== null && _c !== void 0 ? _c : '',
                            userId: newPost.userId,
                            createdAt: newPost.createdAt
                        }]
                });
            }
            catch (error) {
                console.error('Error creating post:', error);
                res.status(500).json({
                    success: false,
                    message: 'Internal server error while creating post',
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
            // // Logic for creating a post
            // if(req){
            //     req.body.createdAt = new Date();
            //     req.body.fullname = 'John Doe'; // Example static value, replace with actual logic
            //     req.body.userId = '12345'; // Example static value, replace with actual logic
            //     req.body.caption = 'This is a sample post'; // Example static value, replace with actual logic
            //     req.body.imageUrl = 'http://example.com/image.jpg'; // Example static value, replace with actual logic
            //     // Here you would typically save the post to the database
            //     await Post.create(req.body);
            //     res.status(201).send({ message: 'Post created successfully', post: req.body }); 
            // }
        });
    }
    static updatePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Logic for creating a post
            if (req) {
                res.status(201).send({ message: 'Post updated successfully', post: req.body });
            }
        });
    }
    static deletePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Logic for creating a post
            if (req) {
                res.status(201).send({ message: 'Post deleted successfully', post: req.body });
            }
        });
    }
    static getPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Logic for creating a post
            if (req) {
                res.status(201).send({ message: 'Post requested', post: req.body });
            }
        });
    }
    static getAllPosts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield models_1.Post.findAll({
                    attributes: ['id', 'caption', 'imageUrl', 'fullname', 'userId'],
                    order: [['createdAt', 'DESC']]
                });
                (0, response201_1.created)(res, 'All post fetched', { posts });
            }
            catch (error) {
                console.error('Error fetching posts', error);
            }
        });
    }
}
exports.PostController = PostController;
