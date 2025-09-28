import { Request, Response } from 'express';
import SheetRepository from '../repositories/SheetRepository'; 
import { CreateSheetDTO, UpdateSheetDTO } from '../models/Sheet'; // Importando UpdateSheetDTO

class SheetController {
    
    /**
     * Lida com a requisição POST para criação de uma nova ficha.
     */
    async store(req: Request, res: Response): Promise<Response> {
        // Os dados já foram validados pelo middleware
        const data: CreateSheetDTO = req.body; 

        try {
            const newSheet = await SheetRepository.create(data);
            
            // 201 Created é o código de sucesso para POST
            return res.status(201).json({ 
                message: "Ficha criada com sucesso!", 
                sheet: newSheet 
            });
            
        } catch (error) {
            console.error('Erro no Controller ao criar ficha:', error);
            // Retorna 500 para erros internos (falha no DB, na transação, etc.)
            return res.status(500).json({ 
                error: 'Falha na criação da ficha.', 
                details: error instanceof Error ? error.message : 'Erro desconhecido.'
            });
        }
    }

    /**
     * Lida com a requisição GET para listar todas as fichas.
     */
    async index(req: Request, res: Response): Promise<Response> {
        try {
            const sheets = await SheetRepository.findAll();
            return res.json(sheets);
        } catch (error) {
            console.error('Erro no Controller ao buscar fichas:', error);
            return res.status(500).json({ error: 'Falha ao buscar fichas.' });
        }
    }
    
    /**
     * Lida com a requisição GET para detalhar uma ficha por ID.
     */
    async show(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        try {
            const sheet = await SheetRepository.findById(id);

            if (!sheet) {
                return res.status(404).json({ error: 'Ficha não encontrada.' });
            }

            return res.json(sheet);
        } catch (error) {
            console.error('Erro no Controller ao detalhar ficha:', error);
            return res.status(500).json({ error: 'Falha ao buscar ficha.' });
        }
    }

    /**
     * Lida com a requisição PUT para atualizar uma ficha por ID.
     */
    async update(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        // Os dados já foram validados pelo middleware
        const data: UpdateSheetDTO = req.body; 

        try {
            const updatedSheet = await SheetRepository.update(id, data);

            if (!updatedSheet) {
                return res.status(404).json({ error: 'Ficha não encontrada para atualização.' });
            }

            return res.json({
                message: "Ficha atualizada com sucesso!",
                sheet: updatedSheet
            });
        } catch (error) {
            console.error('Erro no Controller ao atualizar ficha:', error);
            return res.status(500).json({ 
                error: 'Falha na atualização da ficha.',
                details: error instanceof Error ? error.message : 'Erro desconhecido.'
            });
        }
    }

    /**
     * Lida com a requisição DELETE para remover uma ficha por ID.
     */
    async destroy(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        try {
            const deleted = await SheetRepository.delete(id);

            if (!deleted) {
                return res.status(404).json({ error: 'Ficha não encontrada para exclusão.' });
            }

            // 204 No Content é o código ideal para sucesso em DELETE
            return res.status(204).send(); 
        } catch (error) {
            console.error('Erro no Controller ao excluir ficha:', error);
            return res.status(500).json({ error: 'Falha na exclusão da ficha.' });
        }
    }
}

export default new SheetController();
