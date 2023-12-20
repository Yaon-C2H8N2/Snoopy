CREATE TABLE client
(
    id_client      SERIAL PRIMARY KEY,
    nom_entreprise VARCHAR NOT NULL,
    adresse        VARCHAR NOT NULL,
    adresse_mail   VARCHAR NOT NULL
);

CREATE TABLE employe
(
    id_employe SERIAL PRIMARY KEY,
    nom        VARCHAR NOT NULL,
    prenom     VARCHAR NOT NULL
);

CREATE TABLE type_prestation
(
    id_type_prestation  SERIAL PRIMARY KEY,
    nom_type_prestation VARCHAR NOT NULL
);

CREATE TABLE prestation
(
    id_prestation      SERIAL PRIMARY KEY,
    id_type_prestation INTEGER REFERENCES type_prestation (id_type_prestation),
    nom_prestation     VARCHAR NOT NULL
);

CREATE TABLE prestation_intervention
(
    id_prestation_intervention SERIAL PRIMARY KEY,
    id_prestation              INTEGER REFERENCES prestation (id_prestation),
    id_client                  INTEGER REFERENCES client (id_client),
    date_prestation            DATE,
    heure_debut                TIME,
    heure_fin                  TIME,
    interieur                  BOOLEAN DEFAULT FALSE,
    exterieur                  BOOLEAN DEFAULT FALSE,
    commentaire                VARCHAR,
    confirmation_signature     BOOLEAN DEFAULT FALSE,
    signature                  VARCHAR
);

CREATE TABLE employe_prestation_intervention
(
    id_employe_prestation_intervention SERIAL PRIMARY KEY,
    id_employe                         INTEGER REFERENCES employe (id_employe),
    id_prestation_intervention         INTEGER REFERENCES prestation_intervention (id_prestation_intervention)
);

INSERT INTO client
    (nom_entreprise, adresse, adresse_mail)
VALUES ('Entreprise 1', 'Adresse 1', 'test1'),
       ('Entreprise 2', 'Adresse 2', 'test2'),
       ('Entreprise 3', 'Adresse 3', 'test3'),
       ('Entreprise 4', 'Adresse 4', 'test4'),
       ('Entreprise 5', 'Adresse 5', 'test5');

INSERT INTO employe
    (nom, prenom)
VALUES ('Nom 1', 'Prenom 1'),
       ('Nom 2', 'Prenom 2'),
       ('Nom 3', 'Prenom 3'),
       ('Nom 4', 'Prenom 4'),
       ('Nom 5', 'Prenom 5');

INSERT INTO type_prestation
    (nom_type_prestation)
VALUES ('Vitrerie'),
       ('Nettoyage'),
       ('Entretien'),
       ('Autre');

INSERT INTO prestation
    (id_type_prestation, nom_prestation)
VALUES (1, 'Nettoyage vitres'),
       (1, 'Décapage vitres'),
       (2, 'Nettoyage sols'),
       (2, 'Nettoyage murs'),
       (3, 'Entretien locaux'),
       (3, 'Entretien bureaux'),
       (4, 'Autre');

INSERT INTO prestation_intervention
    (id_prestation, id_client, date_prestation, heure_debut, heure_fin, interieur, exterieur, commentaire)
VALUES (1, 1, '2023-12-20', '08:00:00', '12:00:00', TRUE, TRUE, 'Test commentaire');

INSERT INTO employe_prestation_intervention
    (id_employe, id_prestation_intervention)
VALUES (1, 1),
       (2, 1),
       (3, 1);