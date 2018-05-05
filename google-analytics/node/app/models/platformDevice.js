export default (sequelize, DataTypes) => {
  const PlatformDevice = sequelize.define(
    'platformDevice',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      'ga:dimension1': {
        type: DataTypes.STRING,
      },
      'ga:browser': {
        type: DataTypes.STRING,
      },
      'ga:browserVersion': {
        type: DataTypes.STRING,
      },
      'ga:operatingSystem': {
        type: DataTypes.STRING,
      },
      'ga:operatingSystemVersion': {
        type: DataTypes.STRING,
      },
      'ga:mobileDeviceBranding': {
        type: DataTypes.STRING,
      },
      'ga:mobileDeviceModel': {
        type: DataTypes.STRING,
      },
      'ga:mobileInputSelector': {
        type: DataTypes.STRING,
      },
      'ga:mobileDeviceInfo': {
        type: DataTypes.STRING,
      },
      'ga:users': {
        type: DataTypes.STRING,
      },
    },
  );
  return PlatformDevice;
};
