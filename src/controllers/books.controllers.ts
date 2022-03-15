import { Request, Response, NextFunction } from 'express';
import BookModel from '../models/book.model';
import gr from '../utilities/generateRandom';
const controller = new BookModel();
class Controller {
  index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await controller.index();
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  show = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await controller.show(req.params.id as string);
      if (typeof result === 'undefined') res.json("the book doesn't exist");
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // const book = await controller.create(req.body);
      const result = await controller.create({
        title: gr(false, false, Math.floor(Math.random() * 10 + 5)),
        total_pages: parseInt(
          gr(false, true, Math.floor(Math.random() * 900 + 10))
        ),
        author: gr(false, false, Math.floor(Math.random() * 10 + 5)),
        summary: gr(false, false, Math.floor(Math.random() * 100 + 5)),
      });
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // const result = await controller.update(req.params.id as string, req.body);
      const result = await controller.update(req.params.id as string, {
        title: gr(false, false, Math.floor(Math.random() * 10 + 5)),
        total_pages: parseInt(
          gr(false, true, Math.floor(Math.random() * 900 + 10))
        ),
        author: gr(false, false, Math.floor(Math.random() * 10 + 5)),
        summary: gr(false, false, Math.floor(Math.random() * 100 + 5)),
      });
      if (typeof result === 'undefined') res.json("the book doesn't exist");
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await controller.delete(req.params.id as string);
      if (typeof result === 'undefined') res.json("the book doesn't exist");
      res.json(result);
    } catch (error) {
      next(error);
    }
  };
}

export default Controller;
