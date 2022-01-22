CREATE TABLE users (
    user_id serial PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    message TEXT NOT NULL,
    response TEXT NOT NULL,
    created_on TIMESTAMP NOT NULL DEFAULT current_timestamp
);