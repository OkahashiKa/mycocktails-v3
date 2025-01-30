CREATE TABLE m_cocktail (
    id UUID NOT NULL,
    name VARCHAR(100) NOT NULL,
    remarks VARCHAR(1000),
    image TEXT,
    create_at TIMESTAMP DEFAULT NOW(),
    update_at TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY(id)
);