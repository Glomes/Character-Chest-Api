export type SystemType = 'DND5E' | 'CTHULHU7E';

export interface Sheet {
    id: string;
    name: string;
    player: string | null;
    system: SystemType;
    notes: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateSheetDTO {
    name: string;
    player?: string;
    system: SystemType;
    notes?: string;
    
     specificSheetData: any; 
    }

export interface UpdateSheetDTO {
    name?: string;
    player?: string;
    notes?: string;
    system?: SystemType; 
    specificSheetData?: any; 
}