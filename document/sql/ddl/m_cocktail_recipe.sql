CREATE TABLE m_cocktail_recipe (
    cocktail_id UUID NOT NULL,
    material_id UUID NOT NULL,
    quantity INTEGER NOT NULL,
    create_at TIMESTAMP DEFAULT NOW(),
    update_at TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY(cocktail_id, material_id),
    FOREIGN KEY(cocktail_id) REFERENCES m_cocktail(id),
    FOREIGN KEY(material_id) REFERENCES m_material(id)
);
