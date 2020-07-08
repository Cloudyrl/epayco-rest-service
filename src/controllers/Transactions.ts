import { Request, Response , NextFunction } from 'express';
import { handleSuccess } from '@helpers/succesHandler';
import { IUser } from '@models/UserModel';
import { createTransactionAxiosCall } from '@helpers/Axios/CreateTransaction';

export const createTransactionCtrl = async (req : Request , res : Response , next: NextFunction) => {
    const user : IUser = {
        document : req.body.document,
        phone : req.body.phone
    } as unknown as IUser
    const value = req.body.value
    try{
        const data =  await createTransactionAxiosCall(user,value);
        handleSuccess(201, data.message, res, next, {session_id : data.session_id});
    }catch (e){
        next(e);
    }
}