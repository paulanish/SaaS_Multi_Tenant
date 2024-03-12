import express from 'express';
import asyncHandler from 'express-async-handler';
import roleCtrl from '../controllers/role.controller.js'
const roleRoutes = express.Router();
export default roleRoutes;


roleRoutes.route('/')
    .post(asyncHandler(roleCtrl.insert))

roleRoutes.route('/:Id')
    .get(asyncHandler(roleCtrl.findbyId))
    .patch(asyncHandler(roleCtrl.patch))
    .delete(asyncHandler(roleCtrl.remove))

roleRoutes.route('/filter')
    .post(asyncHandler(roleCtrl.filter))
