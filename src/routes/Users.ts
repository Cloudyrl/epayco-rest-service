import { Router } from 'express'

import { joiValidator } from '@middlewares/joi'
import { createUserSchema, rechargeWalletSchema, consultWalletSchema } from '@shared/joiSchemas/User';
import { createUserCtrl, rechargeWalletCtrl, consultWalletCtrl } from '@controllers/User';


const router = Router();

router.post('/' , [joiValidator(createUserSchema)], createUserCtrl);
router.get('/wallet' , [joiValidator(consultWalletSchema)], consultWalletCtrl);
router.post('/wallet' , [joiValidator(rechargeWalletSchema)], rechargeWalletCtrl);

export default router;