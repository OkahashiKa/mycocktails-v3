CREATE TABLE m_material_category (
    id UUID NOT NULL,
    name VARCHAR(100) NOT NULL,
    create_at TIMESTAMP DEFAULT NOW(),
    update_at TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY(id)
);