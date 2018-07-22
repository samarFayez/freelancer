BEGIN;

DROP TABLE IF EXISTS users,posts,comments,courses,courses_videos,courses_exams,
users_courses , post_files,post_skills CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  phone_number INTEGER NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  photo VARCHAR(100) default '/images/personal.jpg',
  description text
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users (id),
    title text NOT NULL,
    details text NOT NULL,
    duration text NOT NULL,
    price VARCHAR(250) NOT NULL,
    datePost VARCHAR(250) NOT NULL
);
CREATE TABLE post_files (
  id SERIAL PRIMARY KEY,
  post_id INTEGER REFERENCES posts (id),
  file  VARCHAR(250) NOT NULL,
  fileName  VARCHAR(250) NOT NULL
);
CREATE TABLE post_skills (
  id SERIAL PRIMARY KEY,
  post_id INTEGER REFERENCES posts (id),
  skill  VARCHAR(250) NOT NULL
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
