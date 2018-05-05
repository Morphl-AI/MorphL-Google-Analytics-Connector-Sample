export default (sequelize, DataTypes) => {
  const PageTracking = sequelize.define(
    'pageTracking',
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
      'ga:dimension3': {
        type: DataTypes.STRING,
      },
      'ga:hostname': {
        type: DataTypes.STRING,
      },
      'ga:pagePath': {
        type: DataTypes.STRING,
      },
      'ga:landingPagePath': {
        type: DataTypes.STRING,
      },
      'ga:secondPagePath': {
        type: DataTypes.STRING,
      },
      'ga:exitPagePath': {
        type: DataTypes.STRING,
      },
      'ga:previousPagePath': {
        type: DataTypes.STRING,
      },
      'ga:sessions': {
        type: DataTypes.STRING,
      },
      'ga:pageValue': {
        type: DataTypes.STRING,
      },
      'ga:entrances': {
        type: DataTypes.STRING,
      },
      'ga:pageviews': {
        type: DataTypes.STRING,
      },
      'ga:uniquePageviews': {
        type: DataTypes.STRING,
      },
      'ga:timeOnPage': {
        type: DataTypes.STRING,
      },
      'ga:exits': {
        type: DataTypes.STRING,
      },
      'ga:pageLoadTime': {
        type: DataTypes.STRING,
      },
      'ga:pageLoadSample': {
        type: DataTypes.STRING,
      },
      'ga:domainLookupTime': {
        type: DataTypes.STRING,
      },
      'ga:pageDownloadTime': {
        type: DataTypes.STRING,
      },
      'ga:redirectionTime': {
        type: DataTypes.STRING,
      },
      'ga:serverConnectionTime': {
        type: DataTypes.STRING,
      },
      'ga:serverResponseTime': {
        type: DataTypes.STRING,
      },
      'ga:domInteractiveTime': {
        type: DataTypes.STRING,
      },
      'ga:domContentLoadedTime': {
        type: DataTypes.STRING,
      },
    },
  );
  return PageTracking;
};
