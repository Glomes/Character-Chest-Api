import { Router } from 'express';
import sheetRoutes from './SheetRoutes'; 

const router = Router();


router.use('/v1/sheets', sheetRoutes);

export default router;