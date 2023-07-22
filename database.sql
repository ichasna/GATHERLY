CREATE DATABASE gatherly;

//users
CREATE TABLE users (
    username VARCHAR(100) PRIMARY KEY,
    password VARCHAR(100)
);

//events
CREATE TABLE events (
    eventName VARCHAR(100) PRIMARY KEY,
    eventDesc VARCHAR(500),
    username VARCHAR(100),
    FOREIGN KEY (username) REFERENCES users(username) ON UPDATE CASCADE ON DELETE CASCADE
);