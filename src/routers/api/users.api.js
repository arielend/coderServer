import { Router } from 'express'
import usersManager from '../../data/fs/UsersManager.js'

const usersRouter = Router();

usersRouter.get('/', read)
usersRouter.get('/:id', readOne)
usersRouter.post('/', create)
usersRouter.put('/:id', update)
usersRouter.delete('/:id', destroy)

async function create(req, res, next) {
    try {
      const data = req.body;
      const users = await notesManager.create(data);
      return res.json({
        statusCode: 201,
        message: "CREATED USER: " + users.id,
      });
    } catch (error) {
      return next(error);
    }
  }
  
  async function read(req, res, next) {
    try {
      const { roll } = req.query;
      const all = await usersManager.read(roll);
      if (all.length > 0) {
        return res.json({
          statusCode: 200,
          response: all,
        });
      } else {
        const error = new Error("Not found");
        error.statusCode = 404;
        throw error;
      }
    } catch (error) {
      return next(error);
    }
  }
  
  async function readOne(req, res, next) {
    try {
      const { id } = req.params;
      const foundUser = await usersManager.readOne(id);
      if (foundUser) {
        return res.json({
          statusCode: 200,
          response: foundUser,
        });
      } else {
        const error = new Error("Not found!");
        error.statusCode = 404;
        throw error;
      }
    } catch (error) {
      return next(error);
    }
  }
  
  async function update(req, res, next) {
    try {
      const { id } = req.params;
      const data = req.body;
      const updateUser = await usersManager.update(id, data);
      return res.json({
        statusCode: 200,
        response: updateUser,
      });
    } catch (error) {
      return next(error);
    }
  }
  
  async function destroy(req, res, next) {
    try {
      const { id } = req.params;
      const deleteUser = await usersManager.destroy(id);
      return res.json({
        statusCode: 200,
        response: deleteUser,
      });
    } catch (error) {
      return next(error);
    }
  }
  

export default usersRouter