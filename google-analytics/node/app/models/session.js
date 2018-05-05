export default (sequelize, DataTypes) => {
  const Session = sequelize.define(
    'session',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      'ga:dimension1': {
        type: DataTypes.STRING,
      },
      'ga:dimension2': {
        type: DataTypes.STRING,
      },
      'ga:sessionDurationBucket': {
        type: DataTypes.STRING,
      },
      'ga:pageViews': {
        type: DataTypes.STRING,
      },
    },
  );
  return Session;
};
