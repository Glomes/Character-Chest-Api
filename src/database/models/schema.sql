CREATE TABLE IF NOT EXISTS sheet (
       id UUID PRIMARY KEY DEFAULT gen_random_uuid(), 
    name VARCHAR(255) NOT NULL,
    player VARCHAR(255),
    system VARCHAR(100) NOT NULL,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS dnd5e_sheet (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sheet_id UUID NOT NULL UNIQUE, 
    class VARCHAR(100), -- CLASSE [cite: 10]
    subclass VARCHAR(100), -- SUBCLASSE [cite: 17]
    race VARCHAR(100), -- ESPÉCIE [cite: 16] (Onde a ficha usa 'Espécie')
    origin VARCHAR(100), -- ORIGEM [cite: 9]
    alignment VARCHAR(50), -- Alinhamento
    level INTEGER NOT NULL DEFAULT 1, -- NÍVEL [cite: 8]
    armor_class INTEGER DEFAULT 10, -- CLASSE DE ARMADURA [cite: 1]
    max_hp INTEGER, -- PONTOS DE VIDA MAX [cite: 19]
    current_hp INTEGER, -- PONTOS DE VIDA ATUAL [cite: 18]
    temp_hp INTEGER DEFAULT 0, -- PONTOS DE VIDA TEMP [cite: 11]
    hit_dice_type VARCHAR(10), -- DADO DE VIDA [cite: 3, 4] (Ex: d8, d10)
    hit_dice_gasto INTEGER DEFAULT 0, -- DADO DE VIDA GASTO [cite: 12]
    speed INTEGER DEFAULT 30, -- VELOCIDADE [cite: 26]
    initiative_bonus INTEGER, -- INICIATIVA [cite: 25]
    proficiency_bonus INTEGER, -- BONUS DE PROFICIÊNCIA [cite: 23]
    passive_perception INTEGER, -- PERCEPÇÃO PASSIVA [cite: 28]

    -- Atributos Principais (FOR, DES, CON, INT, SAB, CAR)
    -- Os valores individuais são essenciais para cálculos de bônus/testes.
    str_score INTEGER NOT NULL, -- FORÇA VALOR [cite: 42, 37]
    dex_score INTEGER NOT NULL, -- DESTREZA VALOR [cite: 52, 49]
    con_score INTEGER NOT NULL, -- CONSTITUIÇÃO VALOR [cite: 68, 65]
    int_score INTEGER NOT NULL, -- INTELIGÊNCIA VALOR [cite: 30, 24]
    wis_score INTEGER NOT NULL, -- SABEDORIA VALOR [cite: 52, 48]
    cha_score INTEGER NOT NULL, -- CARISMA VALOR [cite: 71, 66]

    -- Testes de Resistência e Perícias (Salva Guarda e Perícias)
    -- Usaremos JSONB para guardar um MAPA de proficiências e valores calculados,
    -- mas podemos também criar campos BOOLEAN ou INTEGER para as proficiências (0 ou 1)
    
    -- Proficiências em Testes de Resistência (TRUE/FALSE para 'A' de Apto/Proficiente)
    res_str_prof BOOLEAN DEFAULT FALSE,
    res_dex_prof BOOLEAN DEFAULT FALSE,
    res_con_prof BOOLEAN DEFAULT FALSE,
    res_int_prof BOOLEAN DEFAULT FALSE,
    res_wis_prof BOOLEAN DEFAULT FALSE,
    res_cha_prof BOOLEAN DEFAULT FALSE,

    -- Perícias: Armazenaremos como JSONB para flexibilidade,
    -- onde a chave é a perícia e o valor é a proficiência (Ex: 0=Não, 1=Prof., 2=Exp.)
    skills_proficiencies JSONB,
    
    -- Itens Complexos (JSONB)
    weapons JSONB, -- ARMAS & TRUQUES DE DANO [cite: 32]
    equipment JSONB, -- EQUIPAMENTO [cite: 160] (Ex: lista de itens e moedas)
    features JSONB, -- CARACTERÍSTICAS DE CLASSE [cite: 53][cite_start], RACIAIS [cite: 79] [cite_start]& TALENTOS [cite: 80]
    
    -- Campos Adicionais (página 2)
    spell_ability VARCHAR(10), -- ATRIBUTO DE CONJURAÇÃO [cite: 91] (Ex: 'INT', 'WIS', 'CHA')
    spell_slots JSONB, -- ESPAÇOS DE MAGIA [cite: 94] (Total e Gastos por nível)
    spells_list JSONB, -- TRUQUES & MAGIAS PREPARADAS [cite: 126]
    
    -- Outros detalhes da ficha (página 2)
    appearance TEXT, -- APARÊNCIA [cite: 90]
    backstory TEXT, -- HISTÓRIA & PERSONALIDADE [cite: 125]
    languages JSONB, -- IDIOMAS [cite: 149]

    -- Restrição de Chave Estrangeira
    CONSTRAINT fk_sheet
        FOREIGN KEY (sheet_id)
        REFERENCES sheet (id)
        ON DELETE CASCADE
);