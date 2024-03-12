import { Sequelize } from "sequelize";

const { PQSQLDATABASE, PQSQLUSER, PQSQLPASSWORD, PQSQLHOST, PQSQLPORT, PQSQLDIALECT } = process.env;

import tenantModel from "../models/tenant.model.js";
import userModel from "../models/user.model.js";
import roleModel from "../models/role.model.js";

const PGDB = new Sequelize(
  PQSQLDATABASE,
  PQSQLUSER,
  PQSQLPASSWORD,
  {
    host: PQSQLHOST,
    port: PQSQLPORT,
    dialect: PQSQLDIALECT,
    operatorsAliases: 0,
    timezone: 'utc',
    logging: false,
  }
);

const MODELS = {
  Tenant: tenantModel(PGDB, Sequelize),
  User: userModel(PGDB, Sequelize),
  Role: roleModel(PGDB, Sequelize),
};

Object.keys(MODELS).forEach((key) => {
  if ('associate' in MODELS[key]) {
    MODELS[key].associate(MODELS);
  }
});

export { PGDB };

export default MODELS;