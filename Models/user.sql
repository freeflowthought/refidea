/* first drop test tables from previous session so we have a clean database */
/* DROP SCHEMA public cascade; https://stackoverflow.com/a/13823560/1148249 */
CREATE SCHEMA IF NOT EXISTS public;
/* DROP DATABASE IF EXISTS test; */
/* CREATE DATABASE test; */
/* create the people table */
CREATE TABLE IF NOT EXISTS public.User (
  id SERIAL PRIMARY KEY,
  email VARCHAR(254) UNIQUE NOT NULL,
  password VARCHAR(60) NOT NULL
)