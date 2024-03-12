import express from 'express';
import asyncHandler from 'express-async-handler';
import tenantCtrl from '../controllers/tenant.controller.js'
const tenantRoutes = express.Router();
export default tenantRoutes;


tenantRoutes.route('/')
    .post(asyncHandler(tenantCtrl.insert))

tenantRoutes.route('/:Id')
    .get(asyncHandler(tenantCtrl.findbyId))
    .patch(asyncHandler(tenantCtrl.patch))
    .delete(asyncHandler(tenantCtrl.remove))

tenantRoutes.route('/filter')
    .post(asyncHandler(tenantCtrl.filter))
