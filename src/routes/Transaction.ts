import { Router } from 'express'

import { joiValidator } from '@middlewares/joi'
import { createTransactionCtrl, confirmTransactionCtrl } from '@controllers/Transactions';
import { createTransactionSchema, confirmTransactionSchema } from '@shared/joiSchemas/Transaction';


const router = Router();

router.post('/' , [joiValidator(createTransactionSchema)], createTransactionCtrl);
router.put('/confirm' , [joiValidator(confirmTransactionSchema)], confirmTransactionCtrl);

export default router;