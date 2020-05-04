import user from './user';
import post from './post';
import { Router } from 'express';

const routes: Router = Router();

routes.use('/user', user);
routes.use('/post', post)

export default routes;
