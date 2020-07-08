import { Request, Response , NextFunction } from 'express';
import { handleSuccess } from '@helpers/succesHandler';
import { IUser } from '@models/UserModel';
import { createTransactionAxiosCall } from '@helpers/Axios/CreateTransaction';
import { confirmTransactionAxiosCall } from '@helpers/Axios/ConfirmTransaction';
import { ErrorHandler } from '@helpers/ErrorHandler';

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

export const confirmTransactionCtrl = async (req : Request , res : Response , next: NextFunction) => {
    try{
        const session_id = req.headers['authorization']?.split(' ')[1]
        const token = req.body.token
        if (!session_id) throw new ErrorHandler(401,"unauthorized")
        console.log(session_id)
        const data =  await confirmTransactionAxiosCall(session_id,token);
        handleSuccess(201, data.message, res, next, {message : data.message});
    }catch (e){
        next(e);
    }
}