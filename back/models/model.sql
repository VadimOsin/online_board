create TABLE person
(
    id_person SERIAL PRIMARY KEY,
    login     VARCHAR(40) unique,
    password  VARCHAR(40),
    role      VARCHAR(10) NOT NULL CHECK (role IN ('ADMIN', 'USER')) DEFAULT 'USER'
);

create TABLE person_meta
(
    id_person_meta SERIAL PRIMARY KEY,
    email          VARCHAR(40),
    telephone      VARCHAR(40),
    name           VARCHAR(40),
    surName        VARCHAR(40),
    lastName       VARCHAR(40),
    id_person      INTEGER,
    FOREIGN KEY (id_person) REFERENCES person (id_person)
);

create TABLE ads
(
    id_ads           SERIAL PRIMARY KEY,
    title            VARCHAR(50),
    text             VARCHAR(300),
    url      VARCHAR(50),
    date_created     DATE,
    date_end         DATE,
    date_updated     DATE,
    likes            FLOAT,
    dislike          FLOAT,
    id_person        INTEGER,
    FOREIGN KEY (id_person) REFERENCES person (id_person)
);
create table comments
(
    id_comments  SERIAL PRIMARY KEY,
    title        VARCHAR(50),
    text         VARCHAR(300),
    date_created DATE,
    id_person    INTEGER,
    FOREIGN KEY (id_person) REFERENCES person (id_person),
    id_ads       INTEGER,
    FOREIGN KEY (id_ads) REFERENCES ads (id_ads)
);
create table archive
(
    id_archive SERIAL PRIMARY KEY,
    id_ads     INTEGER,
    FOREIGN KEY (id_ads) REFERENCES ads (id_ads)
);

create table board
(
    id_board SERIAL PRIMARY KEY,
    id_ads   INTEGER,
    FOREIGN KEY (id_ads) REFERENCES ads (id_ads)
);


