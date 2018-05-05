export default (sequelize, DataTypes) => {
  const System = sequelize.define(
    'system',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      'ga:dimension1': {
        type: DataTypes.STRING,
      },
      'ga:language': {
        type: DataTypes.STRING,
      },
      'ga:screenResolution': {
        type: DataTypes.STRING,
      },
      'ga:sessions': {
        type: DataTypes.STRING,
      },
    },
  );
  return System;
};
