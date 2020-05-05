import { Router } from 'express';
import PostController from '../../controllers/postController';

const router: Router = Router();

router.post('/uploadPic', PostController.uploadPic);
router.post('/fetchPost', PostController.fetchPost);

export default router