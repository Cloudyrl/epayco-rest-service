import { Router } from 'express'

import { joiValidator } from '@middlewares/joi'
import { createUserSchema, rechargeWalletSchema } from '@shared/joiSchemas/User';
import { createUserCtrl, rechargeWalletCtrl } from '@controllers/User';


const router = Router();

router.post('/' , [joiValidator(createUserSchema)], createUserCtrl);
router.post('/wallet' , [joiValidator(rechargeWalletSchema)], rechargeWalletCtrl);

export default router;