CREATE TABLE t_user_material (
    user_id UUID NOT NULL,
    material_id UUID NOT NULL,
    create_at TIMESTAMP DEFAULT NOW(),
    update_at TIMESTAMP DEFAULT NOW(),
    delete_at TIMESTAMP,
    PRIMARY KEY(user_id, material_id)
);
