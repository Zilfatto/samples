-- For task
SELECT title, year FROM movies WHERE title LIKE "Harry Potter%" ORDER BY year;

-- All the movies where actor of Harry Potter starred
-- SELECT title, year FROM movies WHERE id IN (SELECT movie_id FROM stars WHERE person_id = (SELECT id FROM people WHERE name = "Daniel Radcliffe")) ORDER BY year;