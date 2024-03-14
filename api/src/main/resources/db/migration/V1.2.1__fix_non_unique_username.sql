ALTER TABLE utilisateur
ADD CONSTRAINT utilisateur_username_unique UNIQUE (username);