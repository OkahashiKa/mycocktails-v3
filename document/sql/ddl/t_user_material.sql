CREATE TABLE t_user_material (
    user_id UUID NOT NULL,
    material_id UUID NOT NULL,
    create_at TIMESTAMP NOT NULL,
    update_at TIMESTAMP NOT NULL,
    delete_at TIMESTAMP,
    PRIMARY KEY(user_id, material_id)
);
