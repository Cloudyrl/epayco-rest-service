import { Request, Response , NextFunction } from 'express';
import { handleSuccess } from '@helpers/succesHandler';
import { ErrorHandler } from '@helpers/ErrorHandler';
import { createUserAxiosCall } from '@helpers/Axios/CreateUser';
import { IUser } from '@models/UserModel';

export const createUserCtrl = async (req : Request , res : Response , next: NextFunction) => {
    const user: IUser = req.body as unknown as IUser;
    try{
        const data =  await createUserAxiosCall(user);
        handleSuccess(201, data.message, res, next, data.user);
    }catch (e){
        next(new ErrorHandler(500, e.message));
    }
}