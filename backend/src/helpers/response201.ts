import { Response } from 'express';

interface SuccessResponse<T> {
    success: boolean;
    message: string;
    data?: T;
}
export const created = <T>(
    res: Response,
    message: string,
    data?: T
): void => {
    const response: SuccessResponse<T> = {
        success: true,
        message
    };

    if(data){
        response.data = data
    }

    res.status(201).json(response)
}