import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';
import compression from 'compression';
import MODELS, { PGDB } from './server/config/db.config.js';
import indexRoutes from './server/routes/index.route.js'


const { PORT, NODE_ENV, PQSQLDATABASE } = process.env;

const app = express();
const _dirname = path.resolve();

app.use(compression());
app.use(bodyParser.json({ limit: '11mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '11mb' }));
app.use(cors());

app.use('/api/', indexRoutes);

app.listen(PORT, () => {
    console.info(`Server listening on port ${PORT} - (${NODE_ENV})`);

    PGDB.sync().then(() => {
        console.log(`'${PQSQLDATABASE}' Database Connection has been established successfully.`);    
    }).catch((error) => {
        console.log('Unable to connect to the database: ', error);
    })

});

