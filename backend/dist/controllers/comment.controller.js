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
exports.CommentController = void 0;
class CommentController {
    static createComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Logic for creating a comment
            if (req) {
                res.status(201).send({ message: 'Comment created successfully', comment: req.body });
            }
        });
    }
    static updateComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Logic for updating a comment
            if (req) {
                res.status(200).send({ message: 'Comment updated successfully', comment: req.body });
            }
        });
    }
    static deleteComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Logic for deleting a comment
            if (req) {
                res.status(200).send({ message: 'Comment deleted successfully', comment: req.body });
            }
        });
    }
    static getComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Logic for getting a specific comment
            if (req) {
                res.status(200).send({ message: 'Comment requested', comment: req.body });
            }
        });
    }
    static getAllComments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Logic for getting all comments
            if (req) {
                res.status(200).send({ message: 'All comments fetched', comments: req.body });
            }
        });
    }
}
exports.CommentController = CommentController;
