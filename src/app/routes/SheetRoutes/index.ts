import { Router } from 'express';
import SheetController from '../../controllers/SheetController';
import { validateCreateSheet, validateUpdateSheet } from '../../middlewares/SheetValidation';

const router = Router();

// [C] CREATE: Cria uma nova ficha (POST /api/v1/sheets)
router.post('/', validateCreateSheet, SheetController.store);

// [R] READ ALL: Lista todas as fichas (GET /api/v1/sheets)
router.get('/', SheetController.index);

// [R] READ ONE: Detalha uma ficha por ID (GET /api/v1/sheets/:id)
router.get('/:id', SheetController.show);

// [U] UPDATE: Atualiza uma ficha por ID (PUT /api/v1/sheets/:id)
router.put('/:id', validateUpdateSheet, SheetController.update);

// [D] DELETE: Exclui uma ficha por ID (DELETE /api/v1/sheets/:id)
router.delete('/:id', SheetController.destroy);

export default router;
