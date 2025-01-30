CREATE TABLE m_material (
    id UUID NOT NULL,
    name VARCHAR(100) NOT NULL,
    category_id UUID NOT NULL,
    create_at TIMESTAMP DEFAULT NOW(),
    update_at TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY(id),
    FOREIGN KEY(category_id) REFERENCES m_material_category(id)
);