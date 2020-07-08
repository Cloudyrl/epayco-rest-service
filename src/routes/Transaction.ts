import { Router } from 'express'

import { joiValidator } from '@middlewares/joi'
import { createTransactionCtrl } from '@controllers/Transactions';
import { createTransactionSchema } from '@shared/joiSchemas/Transaction';


const router = Router();

router.post('/' , [joiValidator(createTransactionSchema)], createTransactionCtrl);

export default router;