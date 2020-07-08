import { Request, Response , NextFunction } from 'express';
import { handleSuccess } from '@helpers/succesHandler';
import { ErrorHandler } from '@helpers/ErrorHandler';
import { createUserAxiosCall } from '@helpers/Axios/CreateUser';
import { IUser } from '@models/UserModel';
import { rechargeWalletAxiosCall } from '@helpers/Axios/RechargeWallet';
import { consultWalletAxiosCall } from '@helpers/Axios/ConsultWallet';

export const createUserCtrl = async (req : Request , res : Response , next: NextFunction) => {
    const user: IUser = req.body as unknown as IUser;
    try{
        const data =  await createUserAxiosCall(user);
        handleSuccess(201, data.message, res, next, data.user);
    }catch (e){
        next(new ErrorHandler(500, e.message));
    }
}

export const rechargeWalletCtrl = async (req : Request , res : Response , next: NextFunction) => {
    const user: IUser = {
        document : req.body.document,
        phone : req.body.phone
    } as unknown as IUser;
    const value = req.body.value;
    try{
        const data =  await rechargeWalletAxiosCall(user,value);
        handleSuccess(201, data.message , res, next, {balance : data.balance});
    }catch (e){
        next();
    }
}

export const consultWalletCtrl = async (req : Request , res : Response , next: NextFunction) => {
    const user: IUser = {
        document : req.body.document,
        phone : req.body.phone
    } as unknown as IUser;
    try{
        const data =  await consultWalletAxiosCall(user);
        handleSuccess(201, data.message , res, next, {balance : data.balance});
    }catch (e){
        next();
    }
}