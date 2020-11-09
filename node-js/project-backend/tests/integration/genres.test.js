const request = require('supertest');
const { Genre } = require('../../models/genre');
const { User } = require('../../models/user');
const mongoose = require('mongoose');

let server;

describe('/api/genres', () => {
  beforeEach(() => { server = require('../../index'); });
  afterEach(async () => {
    await Genre.remove({});
    server.close();
  });

  describe('GET /', () => {
    it('should return all genres', async () => {
      await Genre.collection.insertMany([
        { name: 'genreOne' },
        { name: 'genreTwo' }
      ]);

      const res = await request(server).get('/api/genres');

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some(g => g.name === 'genreOne')).toBeTruthy();
      expect(res.body.some(g => g.name === 'genreTwo')).toBeTruthy();
    });
  });

  describe('GET /:id', () => {
    it('should return a genre if a valid id is passed', async () => {
      const genre = new Genre({ name: 'genreOne' });
      await genre.save();

      const res = await request(server).get(`/api/genres/${genre._id}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('name', genre.name);
    });

    it('should return 400 if an invalid id is passed', async () => {
      const res = await request(server).get('/api/genres/1');

      expect(res.status).toBe(400);
    });

    it('should return 404 if no genre with the given id exists', async () => {
      const id = mongoose.Types.ObjectId();
      const res = await request(server).get(`/api/genres/${id}`);

      expect(res.status).toBe(404);
    });
  });

  describe('POST /', () => {
    let token;
    let name;

    const exec = () => {
      return request(server)
        .post('/api/genres')
        .set('x-auth-token', token)
        .send({ name });
    };

    beforeEach(() => {
      token = new User().generateAuthToken();
      name = 'genreOne';
    });

    it('should return 401 if a client is not logged in', async () => {
      token = '';

      const res = await exec();

      expect(res.status).toBe(401);
    });

    it('should return 400 if a genre name has digits', async () => {
      name = 'genre34';

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should return 400 if a genre is more than 50 characters', async () => {
      name = new Array(65).join('a');

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should save a genre if it is valid', async () => {
      await exec();

      const genre = await Genre.find({ name: 'genreOne' });

      expect(genre).not.toBeNull();
    });

    it('should return a genre if it is valid', async () => {
      const res = await exec();

      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('name', 'GenreOne');
    });
  });

  describe('PUT /:id', () => {
    let token;
    let genre;
    let id;
    let newName;

    const exec = () => {
      return request(server)
        .put(`/api/genres/${id}`)
        .set('x-auth-token', token)
        .send({ name: newName });
    };

    beforeEach(async () => {
      genre = new Genre({ name: 'genreOne' });
      await genre.save();
      id = genre._id;

      token = new User().generateAuthToken();
      newName = 'newGenre';
    });
    afterEach(async () => {
      await Genre.remove({});
    });

    it('should return 401 if client is not logged in', async () => {
      token = '';

      const res = await exec();

      expect(res.status).toBe(401);
    });

    it('should return 400 if genre name has digits', async () => {
      newName = 'newGenre111';

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should return 400 if genre is more than 63 characters', async () => {
      newName = new Array(65).join('a');

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should return 400 if id is invalid', async () => {
      id = 1;

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should return 404 if there is no genre with the given id', async () => {
      id = mongoose.Types.ObjectId();

      const res = await exec();

      expect(res.status).toBe(404);
    });

    it('should update a genre in the database', async () => {
      await exec();

      const updatedGenre = await Genre.findById(id);

      expect(updatedGenre.name).toBe(newName[0].toUpperCase() + newName.slice(1));
    });

    it('should return an updated genre object if it is valid', async () => {
      const res = await exec();

      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('name', newName[0].toUpperCase() + newName.slice(1));
    });
  });

  describe('DELETE /:id', () => {
    let token;
    let genre;
    let id;

    const exec = () => {
      return request(server)
        .delete(`/api/genres/${id}`)
        .set('x-auth-token', token)
        .send();
    };

    beforeEach(async () => {
      genre = new Genre({ name: 'genreOne' });
      await genre.save();
      id = genre._id;

      token = new User({ isAdmin: true }).generateAuthToken();
    });
    afterEach(async () => {
      await Genre.remove({});
    });

    it('should return 401 if client is not logged in', async () => {
      token = '';

      const res = await exec();

      expect(res.status).toBe(401);
    });

    it('should return 403 if the user is not an admin', async () => {
      token = new User({ isAdmin: false }).generateAuthToken();

      const res = await exec();

      expect(res.status).toBe(403);
    });

    it('should return 400 if id is invalid', async () => {
      id = 1;

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should return 404 if there is no genre with the given id', async () => {
      id = mongoose.Types.ObjectId().toHexString();

      const res = await exec();

      expect(res.status).toBe(404);
    });

    it('should return a removed genre from the database', async () => {
      await exec();

      const result = await Genre.findById(id);

      expect(result).toBeNull();
    });

    it('should return a deleted genre object', async () => {
      const res = await exec();

      expect(res.body).toMatchObject({ _id: id.toHexString(), name: genre.name });
    });
  });
});