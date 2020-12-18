import {Router} from 'express'
import MoviesController from './Controllers/BooksController';

const routes = Router();

routes.post("/mongo/create", MoviesController.create)
routes.get("/mongo/show", MoviesController.index)
routes.put("/mongoedit/:id", MoviesController.update)
routes.delete("/mongodel/:id", MoviesController.delete)

export default routes;