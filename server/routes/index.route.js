import express from 'express';
const indexRoutes = express.Router();

import tenantRoutes from './tenant.route.js';
import userRoutes from './user.route.js';
import roleRoutes from './role.route.js';
import authRoutes from './auth.route.js';

import commonHelper from '../helpers/common.helper.js';

indexRoutes.use(async function (req, res, next) {

    let url = req.originalUrl.toString().trim();
    let method = req.method.toString().trim();
    console.log('-----------------------------------------');
    console.log("METHOD - URL:", method, "--", url); // API show in Command Prompt

    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Cache-Control', `max-age=86400, no-cache, no-store`);
    res.header('Access-Control-Allow-Credentials', true);

    // if (url.startsWith("/api/auth")) {
    //     next();
    // } else {
    //     let authorization = req.headers && req.headers.authorization ? req.headers.authorization : null;

    //     if (authorization) {
    //         let responseVerifyToken = await commonHelper.verifyToken(authorization);

    //         if (responseVerifyToken) {
    //             next();
    //         } else {
    //             return res.status(403).json({ message: 'You are not authorized.', code: 403, status: 'Permission Denied' });
    //         }


    //     } else {
    //         return res.status(403).json({ message: 'You are not authorized.', code: 403, status: 'Permission Denied' });
    //     }

    // }

next();

});

indexRoutes.use('/tenants', tenantRoutes);
indexRoutes.use('/users', userRoutes);
indexRoutes.use('/roles', roleRoutes);
indexRoutes.use('/auth', authRoutes);

export default indexRoutes;
