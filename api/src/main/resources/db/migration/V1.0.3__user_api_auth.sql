CREATE TABLE IF NOT EXISTS utilisateur
(
    id_utilisateur SERIAL PRIMARY KEY,
    username       VARCHAR(50)  NOT NULL,
    password       VARCHAR(255) NOT NULL,
    role           VARCHAR(50)  NOT NULL
)