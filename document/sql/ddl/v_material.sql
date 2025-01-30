CREATE VIEW v_material
AS SELECT 
m.id,
m.name,
m.category_id,
mc.name AS category_name,
m.create_at,
m.update_at
FROM m_material m
LEFT OUTER JOIN m_material_category mc
ON m.category_id = mc.id;