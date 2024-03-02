-- default admin user, password is 'admin', must be replaced after first login
INSERT INTO utilisateur (id_utilisateur, username, password, role)
VALUES (1, 'admin', '$2a$10$GEcx0cJtXJNC1GLYQMll7uA8VvDY5QCUQCqhEbVCHkRGIcPooYmHK', 'ADMIN')
ON CONFLICT DO NOTHING;