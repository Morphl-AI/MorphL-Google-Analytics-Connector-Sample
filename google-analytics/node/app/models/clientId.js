export default (sequelize, DataTypes) => {
  const ClientId = sequelize.define(
    'clientId',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      'ga:dimension1': {
        type: DataTypes.STRING,
      },
    },
  );

  return ClientId;
};
