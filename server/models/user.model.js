const userModel = (Interface, Sequelize) => {
  const User = Interface.define('user', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    tenantId: {
      type: Sequelize.UUID,
      references: {
        model: 'tenants',
        key: 'id'
      }
    },
    roleId: {
      type: Sequelize.UUID,
      references: {
        model: 'roles',
        key: 'id'
    }
  },
    password: {
      type: Sequelize.STRING,
    },
    name: {
      type: Sequelize.STRING,
    },
    emailid: {
      type: Sequelize.STRING,
      unique: true,
    },
    mobileno: {
      type: Sequelize.STRING,
      unique: true,
    },
    property: {
      type: Sequelize.JSON,
    },
    status: {
      type: Sequelize.STRING,
      defaultValue: 'active',
    }
  });

  User.associate = function (models) {
    User.belongsTo(models.Tenant, {
      foreignKey: 'tenantId',
      as: 'tenant',
      onDelete: 'CASCADE',
    });
  }
  User.associate = function(models){
    User.belongsTo(models.Role, { 
      foreignKey: 'roleId',
      as: 'role',
      onDelete: 'CASCADE',
    });

    User.belongsTo(models.Tenant, { 
      foreignKey: 'tenantId',
      as: 'tenant',
      onDelete: 'CASCADE',
    });
  }


  return User;
};

export default userModel;
