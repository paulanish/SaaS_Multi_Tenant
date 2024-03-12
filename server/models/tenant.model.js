const tenantModel = (Interface, Sequelize) => {
  const Tenant = Interface.define('tenant', {
      id: {
          type: Sequelize.UUID,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
      },
      title: {
          type: Sequelize.STRING
      },
      property: {
        type: Sequelize.JSON
      },
      status: {
          type: Sequelize.STRING,
          defaultValue: 'active'
      }
  });
  Tenant.associate = function (models) {
    Tenant.hasMany(models.User, {
        as: 'users',
        foreignKey: 'tenantId',
        onDelete: 'CASCADE'
    });
};



  return Tenant;
};

export default tenantModel;