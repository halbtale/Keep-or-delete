import Router from 'express-promise-router';
import { getImage, saveImage, deleteImage } from './controller';

const router = Router();

router.route('/images').get(getImage).put(saveImage).delete(deleteImage)

export default router;
