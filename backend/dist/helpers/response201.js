"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.created = void 0;
const created = (res, message, data) => {
    const response = {
        success: true,
        message
    };
    if (data) {
        response.data = data;
    }
    res.status(201).json(response);
};
exports.created = created;
