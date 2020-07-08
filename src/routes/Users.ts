import { Router } from 'express'

import { joiValidator } from '@middlewares/joi'
import { createUserSchema } from '@shared/joiSchemas/User';
import { createUserCtrl } from '@controllers/User';


const router = Router();

router.post('/' , [joiValidator(createUserSchema)], createUserCtrl);

export default router;