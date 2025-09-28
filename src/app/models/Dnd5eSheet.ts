// src/models/DnD5eSheet.ts

// 1. Tipagem para os Pontos de Vida (HP) e Dados de Vida (DADO DE VIDA)
export interface HealthStats {
    maxHp: number;        // PONTOS DE VIDA MAX
    currentHp: number;    // PONTOS DE VIDA ATUAL
    tempHp: number;       // TEMP
    hitDiceType: string;  // DADO DE VIDA (ex: 'd8', 'd10')
    hitDiceSpent: number; // GASTO
}

// 2. Tipagem para as Proficiências nos Testes de Resistência
export interface SavingThrowProficiencies {
    str: boolean; // Salvaguarda FORÇA
    dex: boolean; // Salvaguarda DESTREZA
    con: boolean; // Salvaguarda CONSTITUIÇÃO
    int: boolean; // Salvaguarda INTELIGÊNCIA
    wis: boolean; // Salvaguarda SABEDORIA
    cha: boolean; // Salvaguarda CARISMA
}

// 3. Tipagem para os valores dos Atributos (STR, DEX, CON, etc.)
// Estes campos serão usados para os valores do DB str_score, dex_score, etc.
export interface AttributesScore {
    str: number;
    dex: number;
    con: number;
    int: number;
    wis: number;
    cha: number;
}

// 4. Tipagem para as Proficiências em Perícias (JSONB: skills_proficiencies)
export interface SkillProficiencyMap {
    // 0: Nenhuma, 1: Proficiente, 2: Expertise (se aplicável)
    acrobatics: 0 | 1 | 2; // Acrobacia
    animalHandling: 0 | 1 | 2; // Lidar com Animais
    arcana: 0 | 1 | 2;     // Arcanismo
    athletics: 0 | 1 | 2;  // Atletismo
    deception: 0 | 1 | 2;  // Enganação
    history: 0 | 1 | 2;    // História
    insight: 0 | 1 | 2;    // Intuição
    intimidation: 0 | 1 | 2; // Intimidação
    investigation: 0 | 1 | 2; // Investigação
    medicine: 0 | 1 | 2;   // Medicina
    nature: 0 | 1 | 2;     // Natureza
    perception: 0 | 1 | 2; // Percepção
    performance: 0 | 1 | 2; // Atuação
    persuasion: 0 | 1 | 2; // Persuasão
    religion: 0 | 1 | 2;   // Religião
    sleightOfHand: 0 | 1 | 2; // Prestidigitação
    stealth: 0 | 1 | 2;    // Furtividade
    survival: 0 | 1 | 2;   // Sobrevivência
}

// 5. O Modelo Principal da Ficha D&D 5E
export interface DnD5eSheet {
    // Chaves e Relações
    id: string; // ID da tabela dnd5e_sheet
    sheetId: string; // Chave estrangeira para a tabela Sheet
    
    // Identificação e Progresso
    level: number;       // NÍVEL
    rpg_class: string;   // CLASSE
    subclass: string | null; // SUBCLASSE
    race: string;        // ESPÉCIE
    origin: string | null; // ORIGEM
    alignment: string | null; // Alinhamento

    // Combate e Defesa
    armor_class: number;       // CLASSE DE ARMADURA
    health: HealthStats;       // Combina os campos de HP e Dado de Vida
    speed: number;             // VELOCIDADE
    initiative_bonus: number;  // INICIATIVA
    proficiency_bonus: number; // BONUS DE PROFICIÊNCIA
    passive_perception: number; // PERCEPÇÃO PASSIVA

    // Atributos (Valores)
    scores: AttributesScore; // Valores de 1-20
    
    // Proficiências
    resProficiencies: SavingThrowProficiencies; // Salva Guardas
    skillProficiencies: SkillProficiencyMap;   // Perícias

    // Magia e Habilidades
    spellAbility: 'INT' | 'WIS' | 'CHA' | null; // ATRIBUTO DE CONJURAÇÃO
    spellSlots: any; // ESPAÇOS DE MAGIA (JSONB)
    spellsList: any; // TRUQUES & MAGIAS PREPARADAS (JSONB)

    // Itens e Habilidades Complexas
    weapons: any;      // ARMAS & TRUQUES DE DANO (JSONB)
    equipment: any;    // EQUIPAMENTO (JSONB)
    features: any;     // CARACTERÍSTICAS (Raciais/Classes/Talentos) (JSONB)
}