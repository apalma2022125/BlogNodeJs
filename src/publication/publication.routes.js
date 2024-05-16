import { Router } from 'express';
import { check } from 'express-validator';

import { validarCampos } from '../middlwares/validar-campos.js';

import { 
    publicationPost,
    publicationsGet,
    publicationPut,
    publicationDelete,
    publicationById
} from './publication.controller.js';

const router = Router();

router.post(
    '/',
    [
        check("title", "The title is required").not().isEmpty(),
        check("descript", "The description of the post is required").not().isEmpty(),
        check("text", "The text of the post text is required").not().isEmpty(),
        check("imagen", "The image is required").not().isEmpty(),
        validarCampos
    ], publicationPost);

router.get('/', publicationsGet);

router.get(
    '/one/:id',
    [
        check('id', 'This is not a valid id').isMongoId(),
        validarCampos
    ],
    publicationById);

router.put(
    "/:id",
    [
        check('id', 'This is not a valid id').isMongoId(),
        validarCampos
    ],
    publicationPut
);

router.delete(
    "/:id",
    [
        check('id', 'This is not a valid id').isMongoId(),
        validarCampos
    ],
    publicationDelete
);

export default router;