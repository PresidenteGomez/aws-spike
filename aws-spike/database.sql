CREATE TABLE users (
id SERIAL PRIMARY KEY,
username varchar(55),
password varchar(60)
);

CREATE TABLE users_image (
id SERIAL PRIMARY KEY,
users int not null references users(id),
url text not null
);

CREATE TABLE users_image_2 (
id SERIAL PRIMARY KEY,
users int not null references users(id),
hex_data bytea not null
);

INSERT INTO users_image_2 (users, hex_data) VALUES (1, 'ab');
INSERT INTO users (username, password) VALUES (1', 'ab');
