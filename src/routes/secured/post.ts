import { Router } from 'express';
import PostController from '../../controllers/postController';

const router: Router = Router();

router.post('/uploadPic', PostController.uploadPic);

export default router