export default (sequelize, DataTypes) => {
  const GeoContent = sequelize.define(
    'geoContent',
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
      'ga:continent': {
        type: DataTypes.STRING,
      },
      'ga:country': {
        type: DataTypes.STRING,
      },
      'ga:region': {
        type: DataTypes.STRING,
      },
      'ga:city': {
        type: DataTypes.STRING,
      },
      'ga:latitude': {
        type: DataTypes.STRING,
      },
      'ga:longitude': {
        type: DataTypes.STRING,
      },
      'ga:regionIsoCode': {
        type: DataTypes.STRING,
      },
      'ga:sessions': {
        type: DataTypes.STRING,
      },
    },
  );
  return GeoContent;
};
