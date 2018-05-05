export default (sequelize, DataTypes) => {
  const TrafficSources = sequelize.define(
    'trafficSources',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      'ga:dimension2': {
        type: DataTypes.STRING,
      },
      'ga:referralPath': {
        type: DataTypes.STRING,
      },
      'ga:fullReferrer': {
        type: DataTypes.STRING,
      },
      'ga:source': {
        type: DataTypes.STRING,
      },
      'ga:medium': {
        type: DataTypes.STRING,
      },
      'ga:keyword': {
        type: DataTypes.STRING,
      },
      'ga:socialNetwork': {
        type: DataTypes.STRING,
      },
      'ga:adContent': {
        type: DataTypes.STRING,
      },
      'ga:hasSocialSourceReferral': {
        type: DataTypes.STRING,
      },
      'ga:users': {
        type: DataTypes.STRING,
      },
      'ga:organicSearches': {
        type: DataTypes.STRING,
      },
    },
  );
  return TrafficSources;
};
