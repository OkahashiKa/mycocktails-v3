CREATE TABLE m_cocktail (
    id UUID NOT NULL,
    name VARCHAR(100) NOT NULL,
    remarks VARCHAR(1000),
    image BYTEA,
    create_at TIMESTAMP NOT NULL,
    update_at TIMESTAMP NOT NULL,
    PRIMARY KEY(id)
);