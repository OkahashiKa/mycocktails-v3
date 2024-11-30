CREATE TABLE m_material (
    id UUID NOT NULL,
    name VARCHAR(100) NOT NULL,
    category_id UUID NOT NULL,
    create_at TIMESTAMP NOT NULL,
    update_at TIMESTAMP NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(category_id) REFERENCES m_material_category(id)
);