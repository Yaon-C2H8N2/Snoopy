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
    interieur                  BOOLEAN,
    exterieur                  BOOLEAN,
    commentaire                VARCHAR
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
