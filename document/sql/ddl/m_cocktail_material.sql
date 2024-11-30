CREATE TABLE m_cocktail_material (
    cocktail_id UUID NOT NULL,
    material_id UUID NOT NULL,
    quantity INTEGER NOT NULL,
    create_at TIMESTAMP NOT NULL,
    update_at TIMESTAMP NOT NULL,
    PRIMARY KEY(cocktail_id, material_id),
    FOREIGN KEY(cocktail_id) REFERENCES m_cocktail(id),
    FOREIGN KEY(material_id) REFERENCES m_material(id)
);
