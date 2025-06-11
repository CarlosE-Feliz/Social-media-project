import { Request, Response } from "express";

interface LikeRequest extends Request {
    body: {
        userId: number; // ID of the user who liked the post
        postId: number; // ID of the post that was liked
        caption?: string; // Optional caption for the like
        createdAt?: Date; // Optional field for the date the like was created
    
    };
}

interface LikeResponse extends Response {
    json: (body: any) => this;
}

export class LikeController {
    static async createLike(req: LikeRequest, res: LikeResponse): Promise<void> {
        // Logic for creating a like
        if (req.body) {
            res.status(201).json({ message: 'Like created successfully', like: req.body });
        } else {
            res.status(400).json({ message: 'Invalid request data' });
        }
    }

    static async deleteLike(req: LikeRequest, res: LikeResponse): Promise<void> {
        // Logic for deleting a like
        if (req.body) {
            res.status(200).json({ message: 'Like deleted successfully', like: req.body });
        } else {
            res.status(400).json({ message: 'Invalid request data' });
        }
    }

    static async getLikesByPost(req: Request, res: Response): Promise<void> {
        // Logic for getting likes by post ID
        const postId = req.params.postId;
        if (postId) {
            res.status(200).json({ message: `Likes for post ${postId}`, likes: [] }); // Replace with actual likes data
        } else {
            res.status(400).json({ message: 'Post ID is required' });
        }
    }
}