import {Request, Response} from 'express';

interface CommentRequest extends Request {
    body: {
        // Define expected comment fields here, e.g.:
        postId: string;
        commTxt: string;
        createdAt: Date;
        userId: string;
    };
}

interface CommentResponse extends Response {
    json: (body: any) => this;
}

export class CommentController {
    static async createComment(req: CommentRequest, res: CommentResponse) {
        // Logic for creating a comment
        if (req) {
            res.status(201).send({ message: 'Comment created successfully', comment: req.body });
        }
    }

    static async updateComment(req: CommentRequest, res: CommentResponse) {
        // Logic for updating a comment
        if (req) {
            res.status(200).send({ message: 'Comment updated successfully', comment: req.body });
        }
    }

    static async deleteComment(req: CommentRequest, res: CommentResponse) {
        // Logic for deleting a comment
        if (req) {
            res.status(200).send({ message: 'Comment deleted successfully', comment: req.body });
        }
    }

    static async getComment(req: CommentRequest, res: CommentResponse) {
        // Logic for getting a specific comment
        if (req) {
            res.status(200).send({ message: 'Comment requested', comment: req.body });
        }
    }

    static async getAllComments(req: CommentRequest, res: CommentResponse) {
        // Logic for getting all comments
        if (req) {
            res.status(200).send({ message: 'All comments fetched', comments: req.body });
        }
    }
}