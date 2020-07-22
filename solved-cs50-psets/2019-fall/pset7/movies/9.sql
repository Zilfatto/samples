-- for task
SELECT name FROM people WHERE id IN (SELECT DISTINCT(person_id) FROM stars WHERE movie_id IN (SELECT id FROM movies WHERE year = 2004)) ORDER BY birth;

-- Without 'NULL' date of birth
--  SELECT name, birth FROM people WHERE birth >= 0 AND id IN (SELECT DISTINCT(person_id) FROM stars WHERE movie_id IN (SELECT id FROM movies WHERE year = 2004)) ORDER BY birth;