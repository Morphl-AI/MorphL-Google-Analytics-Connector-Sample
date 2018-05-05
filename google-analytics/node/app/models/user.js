export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'user',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      'ga:dimension1': {
        type: DataTypes.STRING,
      },
      'ga:userType': {
        type: DataTypes.STRING,
      },
      'ga:sessionCount': {
        type: DataTypes.STRING,
      },
      'ga:daysSinceLastSession': {
        type: DataTypes.STRING,
      },
      'ga:users': {
        type: DataTypes.STRING,
      },
    },
  );
  return User;
};
