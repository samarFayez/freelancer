BEGIN;

DROP TABLE IF EXISTS users,posts,comments,courses,courses_videos,courses_exams,
users_courses CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  phone_number INTEGER NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  photo VARCHAR(100) NOT NULL,
  description text NOT NULL
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    description text NOT NULL,
    user_id INTEGER REFERENCES users (id)
);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users (id),
  post_id INTEGER REFERENCES posts (id),
  description text NOT NULL
);

CREATE TABLE courses (
  id SERIAL PRIMARY KEY,
  photo VARCHAR(250) NOT NULL,
  description text NOT NULL
);

CREATE TABLE courses_videos (
  id SERIAL PRIMARY KEY,
  courses_id INTEGER REFERENCES courses (id),
  url VARCHAR(250) NOT NULL
);

CREATE TABLE courses_exams (
  id SERIAL PRIMARY KEY,
  courses_id INTEGER REFERENCES courses (id),
  solutions VARCHAR(250) NOT NULL
);

CREATE TABLE users_courses (
  id SERIAL PRIMARY KEY,
  courses_id INTEGER REFERENCES courses (id),
  user_id INTEGER REFERENCES users (id),
  score VARCHAR(250) NOT NULL
);
COMMIT;
