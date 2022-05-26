module.exports = (sequelize, _DataTypes) => {
  const PostCategorie = sequelize.define('PostCategorie',
    {},
    { timestamps: false },
  );

  PostCategorie.associate = (models) => {
    models.Category.belongsToMany(models.User, {
      as: 'users',
      through: PostCategorie,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
    models.User.belongsToMany(models.Category, {
      as: 'categories',
      through: PostCategorie,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };

  return PostCategorie;
};
