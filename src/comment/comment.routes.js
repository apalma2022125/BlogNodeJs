import { Router } from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../middlwares/validar-campos.js';

import {
    commentPost,
    commentsGet,
    commentPut,
    commentDelete
} from './comment.controller.js';

const router = Router();

router.post(
    '/create/:idPublication',
    [
        check('idPublication', 'This is not a valid id').isMongoId(),
        check("autorName", "The autor is required").not().isEmpty(),
        check("date", "The date is required").not().isEmpty(),
        check("commentText", "The comment is required").not().isEmpty(),
        validarCampos
    ], commentPost);

router.get(
    '/:publiId',
    [
        check('publiId', 'This is not a valid id').isMongoId(),
        validarCampos
    ], commentsGet);

router.put(
    '/:idPublication',
    [
        check('idPublication', 'This is not a valid id').isMongoId(),
        validarCampos
    ], commentPut);

router.delete(
    '/:idPublication',
    [
        check('idPublication', 'This is not a valid id').isMongoId(),
        validarCampos
    ], commentDelete);

export default router;
