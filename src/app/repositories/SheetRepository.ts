import pool from '../../database/db';
import { PoolClient } from 'pg';
import { CreateSheetDTO, UpdateSheetDTO, Sheet } from '../models/Sheet'; 
import { DnD5eSheet } from '../models/Dnd5eSheet'; 

class SheetRepository {

    // [C] CREATE: Cria ficha principal e ficha específica em Transação
    async create(data: CreateSheetDTO): Promise<Sheet> {
        const client: PoolClient = await pool.connect();

        try {
            await client.query('BEGIN');
            
            const sheetQuery = `
                INSERT INTO sheet (name, player, system, notes)
                VALUES ($1, $2, $3, $4)
                RETURNING id, name, system, player, created_at, updated_at, notes;
            `;
            const sheetValues = [data.name, data.player || null, data.system, data.notes || null];
            const sheetResult = await client.query<Sheet>(sheetQuery, sheetValues);
            const newSheet: Sheet = sheetResult.rows[0];
            const newSheetId = newSheet.id;

            if (data.system === 'DND5E') {
                const dndData = data.specificSheetData as DnD5eSheet;
                
                const dndQuery = `
                    INSERT INTO dnd5e_sheet (
                        sheet_id, level, rpg_class, race, 
                        str_score, dex_score, con_score, int_score, wis_score, cha_score,
                        health_stats, skills_proficiencies, weapons, features
                    )
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14);
                `;
                
                const dndValues = [
                    newSheetId, dndData.level || 1, dndData.rpg_class, dndData.race,
                    dndData.scores.str, dndData.scores.dex, dndData.scores.con, 
                    dndData.scores.int, dndData.scores.wis, dndData.scores.cha,
                    dndData.health, dndData.skillProficiencies, dndData.weapons, dndData.features,
                ];
                
                // CORRIGIDO: Passando dndQuery e dndValues
                await client.query(dndQuery, dndValues); 
            }
            
            await client.query('COMMIT');
            return newSheet; 

        } catch (error) {
            await client.query('ROLLBACK');
            throw error; 
        } finally {
            client.release();
        }
    }
    
    // [R] READ ALL: Lista todas as fichas principais
    async findAll(): Promise<Sheet[]> {
        const query = `SELECT id, name, player, system, created_at, updated_at FROM sheet ORDER BY created_at DESC`;
        const result = await pool.query<Sheet>(query);
        return result.rows;
    }

    // [R] READ BY ID: Busca ficha principal e dados específicos
    async findById(id: string): Promise<Sheet | null> {
        const mainSheetQuery = `
            SELECT id, name, player, system, notes, created_at, updated_at 
            FROM sheet 
            WHERE id = $1;
        `;
        const mainResult = await pool.query<Sheet>(mainSheetQuery, [id]);

        if (mainResult.rowCount === 0) return null;

        const sheet = mainResult.rows[0];
        let specificData: any = {};
        let childTableName: string | null = null;
        
        if (sheet.system === 'DND5E') {
            childTableName = 'dnd5e_sheet';
        } else if (sheet.system === 'CTHULHU7E') {
            childTableName = 'cthulhu7e_sheet';
        }

        if (childTableName) {
            const specificSheetQuery = `SELECT * FROM ${childTableName} WHERE sheet_id = $1;`;
            const specificResult = await pool.query(specificSheetQuery, [id]);
            
            if (specificResult.rowCount! > 0) { 
                specificData = specificResult.rows[0];
            }
        }
        
        return { ...sheet, specificSheetData: specificData } as Sheet; 
    }

    // [U] UPDATE: Atualiza a ficha principal e a filha em Transação
    async update(id: string, data: UpdateSheetDTO): Promise<Sheet | null> {
        const client: PoolClient = await pool.connect();
        
        try {
            await client.query('BEGIN');
            
            const mainUpdateFields: string[] = [];
            const mainUpdateValues: any[] = [];
            let paramIndex = 1;

            if (data.name !== undefined) { mainUpdateFields.push(`name = $${paramIndex++}`); mainUpdateValues.push(data.name); }
            if (data.player !== undefined) { mainUpdateFields.push(`player = $${paramIndex++}`); mainUpdateValues.push(data.player); }
            if (data.notes !== undefined) { mainUpdateFields.push(`notes = $${paramIndex++}`); mainUpdateValues.push(data.notes); }

            let currentSheet: Sheet | null = null;
            
            if (mainUpdateFields.length > 0) {
                mainUpdateValues.push(id); 
                const mainUpdateQuery = `
                    UPDATE sheet 
                    SET ${mainUpdateFields.join(', ')}, updated_at = NOW()
                    WHERE id = $${paramIndex}
                    RETURNING *;
                `;
                const result = await client.query<Sheet>(mainUpdateQuery, mainUpdateValues);
                currentSheet = result.rows[0] || null;
            } else {
                 const result = await client.query<Sheet>('SELECT * FROM sheet WHERE id = $1', [id]);
                 currentSheet = result.rows[0] || null;
            }

            if (!currentSheet) {
                await client.query('ROLLBACK');
                return null;
            }
            
            if (currentSheet.system === 'DND5E' && data.specificSheetData) {
                const specificData = data.specificSheetData;
                const dndUpdateFields: string[] = [];
                const dndUpdateValues: any[] = [];
                let dndParamIndex = 1;

                if (specificData.level !== undefined) {
                    dndUpdateFields.push(`level = $${dndParamIndex++}`);
                    dndUpdateValues.push(specificData.level);
                }
                
                if (specificData.health) {
                    dndUpdateFields.push(`health_stats = health_stats || $${dndParamIndex++}::jsonb`);
                    dndUpdateValues.push(JSON.stringify(specificData.health));
                }
                
                if (dndUpdateFields.length > 0) {
                    dndUpdateValues.push(id); 
                    const dndUpdateQuery = `
                        UPDATE dnd5e_sheet 
                        SET ${dndUpdateFields.join(', ')}
                        WHERE sheet_id = $${dndParamIndex}
                        RETURNING *;
                    `;
                    await client.query(dndUpdateQuery, dndUpdateValues);
                }
            }
            
            await client.query('COMMIT');
            return currentSheet; 

        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }
    
    // [D] DELETE: Deleta a ficha principal (e a filha via CASCADE)
    async delete(id: string): Promise<boolean> {
        const query = `DELETE FROM sheet WHERE id = $1 RETURNING id;`;
        const result = await pool.query(query, [id]);
        
        return result.rowCount! > 0;
    }
}

export default new SheetRepository();