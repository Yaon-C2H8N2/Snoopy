CREATE TABLE IF NOT EXISTS client
(
    id_client      SERIAL PRIMARY KEY,
    nom_entreprise VARCHAR NOT NULL,
    adresse        VARCHAR NOT NULL,
    adresse_mail   VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS employe
(
    id_employe SERIAL PRIMARY KEY,
    nom        VARCHAR NOT NULL,
    prenom     VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS type_prestation
(
    id_type_prestation  SERIAL PRIMARY KEY,
    nom_type_prestation VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS prestation
(
    id_prestation      SERIAL PRIMARY KEY,
    id_type_prestation INTEGER REFERENCES type_prestation (id_type_prestation),
    nom_prestation     VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS prestation_intervention
(
    id_prestation_intervention SERIAL PRIMARY KEY,
    id_prestation              INTEGER REFERENCES prestation (id_prestation) NOT NULL,
    id_client                  INTEGER REFERENCES client (id_client) NOT NULL,
    date_prestation            DATE,
    heure_debut                TIME,
    heure_fin                  TIME,
    interieur                  BOOLEAN DEFAULT FALSE,
    exterieur                  BOOLEAN DEFAULT FALSE,
    commentaire                VARCHAR,
    confirmation_signature     BOOLEAN DEFAULT FALSE,
    signature                  VARCHAR
);

CREATE TABLE IF NOT EXISTS employe_prestation_intervention
(
    id_employe_prestation_intervention SERIAL PRIMARY KEY,
    id_employe                         INTEGER REFERENCES employe (id_employe),
    id_prestation_intervention         INTEGER REFERENCES prestation_intervention (id_prestation_intervention),
    UNIQUE (id_employe, id_prestation_intervention)
);

INSERT INTO client
    (id_client, nom_entreprise, adresse, adresse_mail)
VALUES (1, 'Entreprise 1', 'Adresse 1', 'test1'),
       (2, 'Entreprise 2', 'Adresse 2', 'test2'),
       (3, 'Entreprise 3', 'Adresse 3', 'test3'),
       (4, 'Entreprise 4', 'Adresse 4', 'test4'),
       (5, 'Entreprise 5', 'Adresse 5', 'test5')
ON CONFLICT DO NOTHING;

INSERT INTO employe
    (id_employe, nom, prenom)
VALUES (1, 'Nom 1', 'Prenom 1'),
       (2, 'Nom 2', 'Prenom 2'),
       (3, 'Nom 3', 'Prenom 3'),
       (4, 'Nom 4', 'Prenom 4'),
       (5, 'Nom 5', 'Prenom 5')
ON CONFLICT DO NOTHING;

INSERT INTO type_prestation
    (id_type_prestation, nom_type_prestation)
VALUES (1, 'Vitrerie'),
       (2, 'Nettoyage'),
       (3, 'Entretien'),
       (4, 'Autre')
ON CONFLICT DO NOTHING;

INSERT INTO prestation
    (id_prestation, id_type_prestation, nom_prestation)
VALUES (1, 1, 'Nettoyage vitres'),
       (2, 1, 'Décapage vitres'),
       (3, 2, 'Nettoyage sols'),
       (4, 2, 'Nettoyage murs'),
       (5, 3, 'Entretien locaux'),
       (6, 3, 'Entretien bureaux'),
       (7, 4, 'Autre')
ON CONFLICT DO NOTHING;

INSERT INTO prestation_intervention
    (id_prestation_intervention, id_prestation, id_client, date_prestation, heure_debut, heure_fin, interieur, exterieur, commentaire)
VALUES (1, 1, 1, '2023-12-20', '08:00:00', '12:00:00', TRUE, TRUE, 'Test commentaire')
ON CONFLICT DO NOTHING;

INSERT INTO employe_prestation_intervention
    (id_employe_prestation_intervention, id_employe, id_prestation_intervention)
VALUES (1, 1, 1),
       (2, 2, 1),
       (3, 3, 1)
ON CONFLICT DO NOTHING;