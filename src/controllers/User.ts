import { Request, Response, NextFunction } from "express";
import { handleSuccess } from "@helpers/succesHandler";
import { ErrorHandler } from "@helpers/ErrorHandler";
import { createUserAxiosCall } from "@helpers/Axios/CreateUser";
import { IUser } from "@models/UserModel";
import { rechargeWalletAxiosCall } from "@helpers/Axios/RechargeWallet";
import { consultWalletAxiosCall } from "@helpers/Axios/ConsultWallet";
import { consultWalletSchema } from '@shared/joiSchemas/User';

export const createUserCtrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user: IUser = (req.body as unknown) as IUser;
  try {
    const data = await createUserAxiosCall(user);
    handleSuccess(201, data.message, res, next, data.user);
  } catch (e) {
    next(new ErrorHandler(500, e.message));
  }
};

export const rechargeWalletCtrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: IUser = ({
      document: req.body.document,
      phone: req.body.phone,
    } as unknown) as IUser;
    const value = req.body.value;
    const data = await rechargeWalletAxiosCall(user, value);
    handleSuccess(201, data.message, res, next, { balance: data.balance });
  } catch (e) {
    next(e);
  }
};

export const consultWalletCtrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await consultWalletSchema.validateAsync(req.query)
    const user: IUser = ({
      document: req.query.document,
      phone: req.query.phone,
    } as unknown) as IUser;
    const data = await consultWalletAxiosCall(user);
    handleSuccess(201, data.message, res, next, { balance: data.balance });
  } catch (e) {
    next(e);
  }
};
