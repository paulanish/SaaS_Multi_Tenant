
import express from 'express';
import asyncHandler from 'express-async-handler';
import authCtrl from '../controllers/auth.controller.js'
const authRoutes = express.Router();
export default authRoutes;


authRoutes.route('/login')
    .post(asyncHandler(authCtrl.login))


