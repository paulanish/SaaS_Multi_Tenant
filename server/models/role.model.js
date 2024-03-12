const roleModel = (Interface, Sequelize) => {
  const Role = Interface.define('role', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    title: {
      type: Sequelize.STRING
    },
    permissions: {
      type: Sequelize.JSONB,
    },
    property: {
      type: Sequelize.JSON
    },
    status: {
      type: Sequelize.STRING,
      defaultValue: 'active'
    }
  });
   // Define associations
   Role.associate = function(models) {
    Role.hasMany(models.User, {
      foreignKey: 'roleId',
      as: 'users', 
      onDelete: 'CASCADE',
    });
  };

  return Role;
};

export default roleModel;