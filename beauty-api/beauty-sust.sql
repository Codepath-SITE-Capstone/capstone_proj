\echo 'Delete and recreate beauty_sust db?'
\prompt 'Return for yes or control-C to cancel > ' answer

DROP DATABASE beauty_sust;
CREATE DATABASE beauty_sust;
\connect beauty_sust

\i beauty-sust-schema.sql
-- \i beauty-sust-seed.sql

\echo 'Delete and recreate beauty_sust_test db?'
\prompt 'Return for yes or control-C to cancel > ' answer

DROP DATABASE beauty_sust_test;
CREATE DATABASE beauty_sust_test;
\connect beauty_sust_test


\i beauty-sust-schema.sql
-- \i beauty-sust-seed.sql