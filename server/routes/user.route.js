import express from 'express';
import asyncHandler from 'express-async-handler';
import userCtrl from '../controllers/user.controller.js';
import tenantCtrl from '../controllers/tenant.controller.js';
const userRoutes = express.Router();
export default userRoutes;

userRoutes.route('/')
    .post(asyncHandler(tenantCtrl.insert), asyncHandler(userCtrl.insert))

userRoutes.route('/:Id')
    .get(asyncHandler(userCtrl.findbyId))
    .patch(asyncHandler(userCtrl.patch))
    .delete(asyncHandler(userCtrl.remove))

userRoutes.route('/filter')
    .post(asyncHandler(userCtrl.filter))
