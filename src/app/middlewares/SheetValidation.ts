import { Request, Response, NextFunction } from 'express';
import { CreateSheetDTO, UpdateSheetDTO, SystemType } from '../models/Sheet';

// Lista de sistemas suportados para validação
const SUPPORTED_SYSTEMS: SystemType[] = ['DND5E', 'CTHULHU7E'];

/**
 * Valida os dados para a criação (POST) de uma nova ficha.
 * Exige: name, system e specificSheetData.
 */
export const validateCreateSheet = (req: Request, res: Response, next: NextFunction) => {
    const data: CreateSheetDTO = req.body;

    // 1. Verificação de campos obrigatórios para criação
    if (!data.name || !data.system || !data.specificSheetData) {
        return res.status(400).json({ 
            error: 'Dados ausentes',
            message: 'Os campos "name", "system" e "specificSheetData" são obrigatórios para criar uma ficha.' 
        });
    }

    // 2. Verificação de tipo de sistema
    if (!SUPPORTED_SYSTEMS.includes(data.system)) {
        return res.status(400).json({
            error: 'Sistema inválido',
            message: `O sistema "${data.system}" não é suportado. Sistemas válidos: ${SUPPORTED_SYSTEMS.join(', ')}`
        });
    }
    
    // Passa para o Controller se tudo estiver OK
    next();
};


/**
 * Valida os dados para a atualização (PUT) de uma ficha.
 * Exige: Pelo menos um campo principal (name, player, notes) OU o specificSheetData.
 */
export const validateUpdateSheet = (req: Request, res: Response, next: NextFunction) => {
    const data: UpdateSheetDTO = req.body;

    // Remove o campo 'system' que não deve ser atualizado
    const { system, ...updateData } = data;
    
    // Verifica se há pelo menos um campo para atualizar
    const hasData = Object.keys(updateData).length > 0;

    if (!hasData) {
        return res.status(400).json({
            error: 'Dados de atualização ausentes',
            message: 'Pelo menos um campo (name, player, notes, specificSheetData) deve ser fornecido para atualização.'
        });
    }

    // Se houver dados e eles forem válidos, passa para o Controller
    next();
};
