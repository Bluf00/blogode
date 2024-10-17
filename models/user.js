module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
      username: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
              len: [3, 25] // username must be between 3 and 25 characters
          }
      },
      password: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
              len: [8,15] // password must be at least 8 characters
          }
      }
  });

  User.associate = models => {
      User.hasMany(models.Post, {
          foreignKey: 'userId',
          onDelete: 'CASCADE'
      });
      User.hasMany(models.Comment, {
          foreignKey: 'userId',
          onDelete: 'CASCADE'
      });
  };

  return User;
};
