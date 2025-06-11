"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = exports.Post = exports.User = void 0;
var user_model_1 = require("./user.model");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return __importDefault(user_model_1).default; } });
var post_model_1 = require("./post.model");
Object.defineProperty(exports, "Post", { enumerable: true, get: function () { return __importDefault(post_model_1).default; } });
var comment_model_1 = require("./comment.model");
Object.defineProperty(exports, "Comment", { enumerable: true, get: function () { return __importDefault(comment_model_1).default; } });
