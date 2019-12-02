import { Router } from 'express';
import { awsRouter } from './aws/aws.router';

let router = Router();
router.use('/aws', awsRouter);

export let apiRouter = router;

