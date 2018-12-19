DROP DATABASE gofeedme;
CREATE DATABASE gofeedme;

use gofeedme;

CREATE TABLE users
(
    id integer AUTO_INCREMENT NOT NULL,
    name varchar(255) NOT NULL,
    password text NOT NULL,
    user_type text NOT NULL,
    PRIMARY KEY(id),
    UNIQUE KEY(name) 
);

CREATE TABLE inventory
(
    id integer AUTO_INCREMENT NOT NULL,
    name text,
    description text,
    quantity numeric,
    user_id integer,
    deleted integer DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id),
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