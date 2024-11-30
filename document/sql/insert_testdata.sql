-- PostgresSQL
-- insert m_material_category deta.
INSERT INTO m_material_category (id, name, create_at, update_at) VALUES ('01937d8f-7a5e-728a-819b-479d0cc41535', 'スピッツ', NOW(), NOW());
INSERT INTO m_material_category (id, name, create_at, update_at) VALUES ('01937d8f-cdba-747b-ba61-ccaf3c32281d', 'リキュール', NOW(), NOW());
INSERT INTO m_material_category (id, name, create_at, update_at) VALUES ('01937d90-19dd-7d48-9075-240b43c5b388', 'ワイン', NOW(), NOW());
INSERT INTO m_material_category (id, name, create_at, update_at) VALUES ('01937d91-e325-7112-b732-2d1a02c13f2b', 'ジュース', NOW(), NOW());
INSERT INTO m_material_category (id, name, create_at, update_at) VALUES ('01937d92-20ca-7592-b42f-2dd722b35ac8', '炭酸飲料', NOW(), NOW());
INSERT INTO m_material_category (id, name, create_at, update_at) VALUES ('01937d92-53b8-78de-9c39-4a37562a9bdf', 'シロップ', NOW(), NOW());
INSERT INTO m_material_category (id, name, create_at, update_at) VALUES ('01937d92-8546-7275-a8f4-9f2fad244e00', 'その他', NOW(), NOW());

-- insert m_material deta.
INSERT INTO m_material (id, name, category_id, create_at, update_at)VALUES ('01937d9b-f9f5-7b9f-94fb-964117388598', 'ジン', '01937d8f-7a5e-728a-819b-479d0cc41535', NOW(), NOW());
INSERT INTO m_material (id, name, category_id, create_at, update_at)VALUES ('01937d9c-8b09-754a-96d8-62e07f416e49', 'ウォッカ', '01937d8f-7a5e-728a-819b-479d0cc41535', NOW(), NOW());
INSERT INTO m_material (id, name, category_id, create_at, update_at)VALUES ('01937d9d-0d12-7f40-8926-5d5a3fc87834', 'ラム', '01937d8f-7a5e-728a-819b-479d0cc41535', NOW(), NOW());
INSERT INTO m_material (id, name, category_id, create_at, update_at)VALUES ('01937d9d-7d5e-71b7-8775-c26337907873', 'テキーラ', '01937d8f-7a5e-728a-819b-479d0cc41535', NOW(), NOW());
INSERT INTO m_material (id, name, category_id, create_at, update_at)VALUES ('01937d9d-cfc8-7563-a239-9c0d76a06c0f', 'カシス', '01937d8f-cdba-747b-ba61-ccaf3c32281d', NOW(), NOW());
INSERT INTO m_material (id, name, category_id, create_at, update_at)VALUES ('01937d9e-5fe0-738b-8409-4514900761af', 'ピーチ', '01937d8f-cdba-747b-ba61-ccaf3c32281d', NOW(), NOW());
INSERT INTO m_material (id, name, category_id, create_at, update_at)VALUES ('01937d9e-c67a-7013-8878-7a110ecc39c3', 'ライチ', '01937d8f-cdba-747b-ba61-ccaf3c32281d', NOW(), NOW());
INSERT INTO m_material (id, name, category_id, create_at, update_at)VALUES ('01937d9e-fe57-7ad9-b5e8-c4333dc79cff', 'カルーア', '01937d8f-cdba-747b-ba61-ccaf3c32281d', NOW(), NOW());
INSERT INTO m_material (id, name, category_id, create_at, update_at)VALUES ('01937d9f-7311-77aa-bf07-e04061ce739a', '赤ワイン', '01937d90-19dd-7d48-9075-240b43c5b388', NOW(), NOW());
INSERT INTO m_material (id, name, category_id, create_at, update_at)VALUES ('01937d9f-bf92-7ace-85e1-22d1df5c4ce4', '白ワイン', '01937d90-19dd-7d48-9075-240b43c5b388', NOW(), NOW());
INSERT INTO m_material (id, name, category_id, create_at, update_at)VALUES ('01937da1-11ce-777c-9bc3-4d62bb23e680', 'ロゼ', '01937d90-19dd-7d48-9075-240b43c5b388', NOW(), NOW());
INSERT INTO m_material (id, name, category_id, create_at, update_at)VALUES ('01937da1-51ca-7736-83f6-eac01bacb0fd', 'ヴェルモット', '01937d90-19dd-7d48-9075-240b43c5b388', NOW(), NOW());
INSERT INTO m_material (id, name, category_id, create_at, update_at)VALUES ('01937da2-2692-7939-843d-afc16e1d7431', 'オレンジジュース', '01937d91-e325-7112-b732-2d1a02c13f2b', NOW(), NOW());
INSERT INTO m_material (id, name, category_id, create_at, update_at)VALUES ('01937da2-d620-7b4d-9fa7-93606fd58b42', 'レモンジュース', '01937d91-e325-7112-b732-2d1a02c13f2b', NOW(), NOW());
INSERT INTO m_material (id, name, category_id, create_at, update_at)VALUES ('01937da3-3055-7ee6-9657-d4454c5af41c', 'ライムジュース', '01937d91-e325-7112-b732-2d1a02c13f2b', NOW(), NOW());
INSERT INTO m_material (id, name, category_id, create_at, update_at)VALUES ('01937da3-8865-7b44-be32-cfc120a5c1ed', 'グレープフルーツジュース', '01937d91-e325-7112-b732-2d1a02c13f2b', NOW(), NOW());
INSERT INTO m_material (id, name, category_id, create_at, update_at)VALUES ('01937da3-c7fc-7ed7-ae5b-6e4a554ff220', 'ソーダ', '01937d92-20ca-7592-b42f-2dd722b35ac8', NOW(), NOW());
INSERT INTO m_material (id, name, category_id, create_at, update_at)VALUES ('01937da4-298f-71e8-8fcf-40d0e0fa6be1', 'トニックウォーター', '01937d92-20ca-7592-b42f-2dd722b35ac8', NOW(), NOW());
INSERT INTO m_material (id, name, category_id, create_at, update_at)VALUES ('01937da8-1289-7069-8d84-ab4612438ff2', 'ジンジャエール', '01937d92-20ca-7592-b42f-2dd722b35ac8', NOW(), NOW());
INSERT INTO m_material (id, name, category_id, create_at, update_at)VALUES ('01937da4-cead-71b6-afeb-754e59deb179', 'コーラ', '01937d92-20ca-7592-b42f-2dd722b35ac8', NOW(), NOW());
INSERT INTO m_material (id, name, category_id, create_at, update_at)VALUES ('01937da5-0834-7a40-9154-cf3a2f197ac2', 'ガムシロップ', '01937d92-53b8-78de-9c39-4a37562a9bdf', NOW(), NOW());
INSERT INTO m_material (id, name, category_id, create_at, update_at)VALUES ('01937da5-3c79-7a58-92c9-b9f856de77e4', 'オリーブ', '01937d92-8546-7275-a8f4-9f2fad244e00', NOW(), NOW());
INSERT INTO m_material (id, name, category_id, create_at, update_at)VALUES ('01937da5-8d5a-70ed-a84f-5f216350f92b', 'ミント', '01937d92-8546-7275-a8f4-9f2fad244e00', NOW(), NOW());
INSERT INTO m_material (id, name, category_id, create_at, update_at)VALUES ('01937da5-dc23-7e2f-b737-72adf1363c87','ミルク', '01937d92-8546-7275-a8f4-9f2fad244e00', NOW(), NOW());

-- insert m_cocktail deta.
INSERT INTO m_cocktail (id, name, remarks, image, create_at, update_at) VALUES ('01937dad-7ec3-790b-8e81-0925d9eab571', 'ジントニック', null, null, NOW(), NOW());
INSERT INTO m_cocktail (id, name, remarks, image, create_at, update_at) VALUES ('01937dae-c2ca-7217-b28f-a3b717521170', 'マティーニ', null, null, NOW(), NOW());
INSERT INTO m_cocktail (id, name, remarks, image, create_at, update_at) VALUES ('01937db0-7e5e-70b4-a735-4254f1020caf', 'スクリュードライバー', null, null, NOW(), NOW());
INSERT INTO m_cocktail (id, name, remarks, image, create_at, update_at) VALUES ('01937db1-06c4-73cf-b541-641a5ddb4117', 'モスコミュール', null, null, NOW(), NOW());
INSERT INTO m_cocktail (id, name, remarks, image, create_at, update_at) VALUES ('01937db1-b16a-7207-a94e-67b34ae6f511', 'カシスソーダ', null, null, NOW(), NOW());
INSERT INTO m_cocktail (id, name, remarks, image, create_at, update_at) VALUES ('01937db4-f27b-77fb-9cf0-d97db2631fcd', 'カシスオレンジ', null, null, NOW(), NOW());
INSERT INTO m_cocktail (id, name, remarks, image, create_at, update_at) VALUES ('01937db5-4c28-72ec-90f7-f3d7b76f6612', 'ファジーネーブル', null, null, NOW(), NOW());
INSERT INTO m_cocktail (id, name, remarks, image, create_at, update_at) VALUES ('01937db5-95b0-7f3a-b7d4-239ea2781372', 'カルーアミルク', null, null, NOW(), NOW());
INSERT INTO m_cocktail (id, name, remarks, image, create_at, update_at) VALUES ('01937db5-e021-7bec-bee3-05e31d14ede2', 'カーディナル', null, null, NOW(), NOW());
INSERT INTO m_cocktail (id, name, remarks, image, create_at, update_at) VALUES ('01937db6-721a-7df7-91e8-8a2013e9ea51', 'キール', null, null, NOW(), NOW());
INSERT INTO m_cocktail (id, name, remarks, image, create_at, update_at) VALUES ('01937db6-bb1c-7cde-ba96-de9d069795ea', 'スプリッツァー', null, null, NOW(), NOW());

-- insert m_cocktail_material deta.
INSERT INTO m_cocktail_material (cocktail_id, material_id, quantity, create_at, update_at) VALUES ('01937dad-7ec3-790b-8e81-0925d9eab571', '01937d9b-f9f5-7b9f-94fb-964117388598', 40, NOW(), NOW());
INSERT INTO m_cocktail_material (cocktail_id, material_id, quantity, create_at, update_at) VALUES ('01937dad-7ec3-790b-8e81-0925d9eab571', '01937da4-298f-71e8-8fcf-40d0e0fa6be1', 120, NOW(), NOW());
INSERT INTO m_cocktail_material (cocktail_id, material_id, quantity, create_at, update_at) VALUES ('01937dae-c2ca-7217-b28f-a3b717521170', '01937d9b-f9f5-7b9f-94fb-964117388598', 45, NOW(), NOW());
INSERT INTO m_cocktail_material (cocktail_id, material_id, quantity, create_at, update_at) VALUES ('01937dae-c2ca-7217-b28f-a3b717521170', '01937da1-51ca-7736-83f6-eac01bacb0fd', 15, NOW(), NOW());
INSERT INTO m_cocktail_material (cocktail_id, material_id, quantity, create_at, update_at) VALUES ('01937dae-c2ca-7217-b28f-a3b717521170', '01937da5-3c79-7a58-92c9-b9f856de77e4', 1, NOW(), NOW());
INSERT INTO m_cocktail_material (cocktail_id, material_id, quantity, create_at, update_at) VALUES ('01937db0-7e5e-70b4-a735-4254f1020caf', '01937d9c-8b09-754a-96d8-62e07f416e49', 40, NOW(), NOW());
INSERT INTO m_cocktail_material (cocktail_id, material_id, quantity, create_at, update_at) VALUES ('01937db0-7e5e-70b4-a735-4254f1020caf', '01937da2-2692-7939-843d-afc16e1d7431', 100, NOW(), NOW());
INSERT INTO m_cocktail_material (cocktail_id, material_id, quantity, create_at, update_at) VALUES ('01937db1-06c4-73cf-b541-641a5ddb4117', '01937d9c-8b09-754a-96d8-62e07f416e49', 45, NOW(), NOW());
INSERT INTO m_cocktail_material (cocktail_id, material_id, quantity, create_at, update_at) VALUES ('01937db1-06c4-73cf-b541-641a5ddb4117', '01937da3-3055-7ee6-9657-d4454c5af41c', 10, NOW(), NOW());
INSERT INTO m_cocktail_material (cocktail_id, material_id, quantity, create_at, update_at) VALUES ('01937db1-06c4-73cf-b541-641a5ddb4117', '01937da8-1289-7069-8d84-ab4612438ff2', 120, NOW(), NOW());
INSERT INTO m_cocktail_material (cocktail_id, material_id, quantity, create_at, update_at) VALUES ('01937db1-b16a-7207-a94e-67b34ae6f511', '01937d9d-cfc8-7563-a239-9c0d76a06c0f', 40, NOW(), NOW());
INSERT INTO m_cocktail_material (cocktail_id, material_id, quantity, create_at, update_at) VALUES ('01937db1-b16a-7207-a94e-67b34ae6f511', '01937da3-c7fc-7ed7-ae5b-6e4a554ff220', 120, NOW(), NOW());
INSERT INTO m_cocktail_material (cocktail_id, material_id, quantity, create_at, update_at) VALUES ('01937db4-f27b-77fb-9cf0-d97db2631fcd', '01937d9d-cfc8-7563-a239-9c0d76a06c0f', 40, NOW(), NOW());
INSERT INTO m_cocktail_material (cocktail_id, material_id, quantity, create_at, update_at) VALUES ('01937db4-f27b-77fb-9cf0-d97db2631fcd', '01937da2-2692-7939-843d-afc16e1d7431', 120, NOW(), NOW());
INSERT INTO m_cocktail_material (cocktail_id, material_id, quantity, create_at, update_at) VALUES ('01937db5-4c28-72ec-90f7-f3d7b76f6612', '01937d9e-5fe0-738b-8409-4514900761af', 30, NOW(), NOW());
INSERT INTO m_cocktail_material (cocktail_id, material_id, quantity, create_at, update_at) VALUES ('01937db5-4c28-72ec-90f7-f3d7b76f6612', '01937da2-2692-7939-843d-afc16e1d7431', 30, NOW(), NOW());
INSERT INTO m_cocktail_material (cocktail_id, material_id, quantity, create_at, update_at) VALUES ('01937db5-95b0-7f3a-b7d4-239ea2781372', '01937d9e-fe57-7ad9-b5e8-c4333dc79cff', 30, NOW(), NOW());
INSERT INTO m_cocktail_material (cocktail_id, material_id, quantity, create_at, update_at) VALUES ('01937db5-95b0-7f3a-b7d4-239ea2781372', '01937da5-dc23-7e2f-b737-72adf1363c87', 90, NOW(), NOW());
INSERT INTO m_cocktail_material (cocktail_id, material_id, quantity, create_at, update_at) VALUES ('01937db5-e021-7bec-bee3-05e31d14ede2', '01937d9f-7311-77aa-bf07-e04061ce739a', 15, NOW(), NOW());
INSERT INTO m_cocktail_material (cocktail_id, material_id, quantity, create_at, update_at) VALUES ('01937db5-e021-7bec-bee3-05e31d14ede2', '01937d9d-cfc8-7563-a239-9c0d76a06c0f', 45, NOW(), NOW());
INSERT INTO m_cocktail_material (cocktail_id, material_id, quantity, create_at, update_at) VALUES ('01937db6-721a-7df7-91e8-8a2013e9ea51', '01937d9f-bf92-7ace-85e1-22d1df5c4ce4', 15, NOW(), NOW());
INSERT INTO m_cocktail_material (cocktail_id, material_id, quantity, create_at, update_at) VALUES ('01937db6-721a-7df7-91e8-8a2013e9ea51', '01937d9d-cfc8-7563-a239-9c0d76a06c0f', 45, NOW(), NOW());
INSERT INTO m_cocktail_material (cocktail_id, material_id, quantity, create_at, update_at) VALUES ('01937db6-bb1c-7cde-ba96-de9d069795ea', '01937d9f-bf92-7ace-85e1-22d1df5c4ce4', 30, NOW(), NOW());
INSERT INTO m_cocktail_material (cocktail_id, material_id, quantity, create_at, update_at) VALUES ('01937db6-bb1c-7cde-ba96-de9d069795ea', '01937da3-c7fc-7ed7-ae5b-6e4a554ff220', 20, NOW(), NOW());
