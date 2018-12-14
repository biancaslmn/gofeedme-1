DROP DATABASE gofeedme;
CREATE DATABASE gofeedme;

use gofeedme;

CREATE TABLE users
(
    id integer AUTO_INCREMENT NOT NULL,
    name text,
    password text,
    provider boolean,
    PRIMARY KEY(id)
);

CREATE TABLE inventory
(
    id integer AUTO_INCREMENT NOT NULL,
    name text,
    description text,
    quantity numeric,
    PRIMARY KEY(id)
);

CREATE TABLE restaurants
(
    id integer AUTO_INCREMENT NOT NULL,
    name text,
    address text,
    zipcode text,
    kitchen text,
    user_id integer NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE events
(
    id integer AUTO_INCREMENT NOT NULL,
    name text,
    address text,
    user_id integer,
    PRIMARY KEY(id)
);

CREATE TABLE events_inventory
(
    id integer AUTO_INCREMENT NOT NULL,
    event_id integer,
    inventory_id integer,
    PRIMARY KEY(id)
);