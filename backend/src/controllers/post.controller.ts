import { Request, Response } from 'express';
import { Post, User } from '../models';
import { created } from '../helpers/response201';

interface PostRequest extends Request {
    body: {
        // Define expected post fields here, e.g.:
        caption?: string;
        imageUrl?: string;
        fullname?: string;
        userId: string;
        createdAt: Date
        // etc.
    };
}

interface PostResponseBody{
    success: boolean;
    message: string;
    post?:{
        id: number;
        caption: string;
        imageUrl: string;
        userId: number;
        fullname: string;
        createdAt: Date;
    }[];
    error?: string;

}

interface PostResponse extends Response {
    json: (body: PostResponseBody) => this;
}



 export class PostController {
    static async createPost(req: PostRequest, res: PostResponse) {
        try{
            const { caption, imageUrl, fullname, userId } = req.body;

            // Validate user field
            if(!userId){
                return res.status(400).json({
                    success:false,
                    message: 'User ID is required to create a post'
                });
            }

            // Find the user to get full name
            const user = await User.findByPk(userId);
            if(!user){
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            // Create the post
            const newPost = await Post.create({
                caption,
                imageUrl,
                fullname: fullname || user.fullname, // Use user's fullname if not provided
                userId,
                CreatedAt: new Date()
            });

            res.status(201).json({
                success:true,
                message: 'Post created successfully',
                post: [{
                    id: newPost.id,
                    caption: newPost.caption ?? '',
                    imageUrl: newPost.imageUrl ?? '',
                    fullname: newPost.fullname ?? '',
                    userId: newPost.userId,
                    createdAt: newPost.createdAt
                }]
            })
        }   catch(error) {
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
    }

    static async updatePost(req: PostRequest, res: PostResponse) {
        // Logic for creating a post
        if(req){
            res.status(201).send({ message: 'Post updated successfully', post: req.body }); 
        }
    }

    static async deletePost(req: PostRequest, res: PostResponse) {
        // Logic for creating a post
        if(req){
            res.status(201).send({ message: 'Post deleted successfully', post: req.body }); 
        }
    }

    static async getPost(req: PostRequest, res: PostResponse) {
        // Logic for creating a post
        if(req){
            res.status(201).send({ message: 'Post requested', post: req.body }); 
        }
    }

    static async getAllPosts(req: PostRequest, res: PostResponse) {
        
        try {
            const posts = await Post.findAll({
                attributes: ['id', 'caption', 'imageUrl', 'fullname', 'userId'],
                order: [['createdAt', 'DESC']]
            });
            created(res, 'All post fetched',{posts})
        } catch (error) {
            console.error('Error fetching posts', error);
        }
    }
}