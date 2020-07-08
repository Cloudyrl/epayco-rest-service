import { Router } from 'express';
import UserRouter from './Users';
import TransactionRouter from './Transaction';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/user', UserRouter);
router.use('/transaction', TransactionRouter);

// Export the base-router
export default router;
