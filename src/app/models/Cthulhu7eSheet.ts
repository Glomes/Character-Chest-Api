// --- Tipagens aninhadas para Campos Complexos (JSONB) ---

// 1. Tipagem para os Pontos de Recurso
export interface ResourcePoints {
    maxSanity: number;           // PONTOS DE SANIDADE MAX
    currentSanity: number;       // PONTOS DE SANIDADE ATUAL
    maxMagicPoints: number;      // PONTOS DE MAGIA MAX
    currentMagicPoints: number;  // PONTOS DE MAGIA ATUAL
    maxHitPoints: number;        // PONTOS DE VIDA MAX
    currentHitPoints: number;    // PONTOS DE VIDA ATUAL
}

// 2. Tipagem para as Estatísticas Derivadas e Bônus
export interface DerivedStats {
    idea: number;                // INT + 5 ou INT x 5 (depende da regra, usando o valor final)
    know: number;                // EDU + 5 ou EDU x 5
    luck: number;                // POD + 5 ou POD x 5
    damageBonus: string;         // BÔNUS NO DANO (ex: '+1D4')
    build: number;               // CONSTR. (Tamanho + Força)
}

// 3. Tipagem para as Habilidades (Mapeamento de Habilidade para Porcentagem)
// Vamos usar um mapa genérico, pois há muitas habilidades
export interface SkillMap {
    [skillName: string]: number; // Ex: { 'antropologia': 1, 'arqueologia': 5, 'esquiva': 30 }
}

// 4. Tipagem para Armas e Combate Manual (JSONB: weapons)
export interface Weapon {
    name: string;                // Nome da arma (ex: Pistola, Chute, Agarrar)
    skillPercentage: number;     // % da Habilidade usada
    damage: string;              // Dano (ex: '1D10', '1D3+bd')
    range: string;               // Alcance (Mãos ou Distância)
    ammo?: number;               // Munição (para armas de fogo)
}

// 5. Tipagem para Transtornos Mentais (JSONB: disorders)
export interface MentalDisorders {
    active: boolean;             // O Investigador está insano no momento?
    temporaryDisorders: string[]; // Transtornos temporários (ex: Fobia, Amnésia)
    permanentDisorders: string[]; // Transtornos permanentes
}


// --- O Modelo Principal da Ficha Cthulhu 7E ---
export interface Cthulhu7eSpecificData {
    // Chaves e Relações (Estas seriam definidas no Repositório/DB, mas as incluímos aqui por clareza do modelo)
    // id: string; // ID da tabela cthulhu7e_sheet
    // sheetId: string; // Chave estrangeira para a tabela Sheet
    
    // Identificação e História (Detalhes do Investigador)
    occupation: string;
    age: number;
    sex: string | null;
    birthplace: string | null;
    academicHistory: string | null; // FORM. ACADÊMICA
    
    // Estatísticas Principais (FOR, DES, INT, etc. - Mapeadas diretamente do DB)
    forScore: number; // FORÇA
    desScore: number; // DESTREZA
    intScore: number; // INTELIGÊNCIA
    conScore: number; // CONSTITUIÇÃO
    apaScore: number; // APARÊNCIA
    podScore: number; // PODER
    tamScore: number; // TAMANHO
    eduScore: number; // EDUCAÇÃO
    
    // Pontos de Recurso
    resources: ResourcePoints;
    
    // Estatísticas Derivadas
    derivedStats: DerivedStats;

    // Habilidades e Perícias
    skills: SkillMap; // Proficiências em Perícias (JSONB)
    mythosCthulhu: number; // 99-Mitos de Cthulhu (%)
    
    // Combate
    weaponsList: Weapon[]; // ARMAS & COMBATE (JSONB)
    dodgePercentage: number; // ESQUIVA (%) (DESx2%)
    
    // Estado e Histórico
    equipment: object;        // EQUIPAMENTO (JSONB)
    artifactsSpells: object;  // ARTEFATOS & MAGIAS (JSONB)
    disorders: MentalDisorders; // TRANSTORNOS MENTAIS
}
