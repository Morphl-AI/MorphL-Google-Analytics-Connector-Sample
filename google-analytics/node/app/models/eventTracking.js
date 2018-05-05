export default (sequelize, DataTypes) => {
  const EventTracking = sequelize.define(
    'eventTracking',
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
      'ga:eventCategory': {
        type: DataTypes.STRING,
      },
      'ga:eventAction': {
        type: DataTypes.STRING,
      },
      'ga:eventLabel': {
        type: DataTypes.STRING,
      },
      'ga:sessions': {
        type: DataTypes.STRING,
      },
      'ga:totalEvents': {
        type: DataTypes.STRING,
      },
      'ga:uniqueEvents': {
        type: DataTypes.STRING,
      },
      'ga:eventValue': {
        type: DataTypes.STRING,
      },
      'ga:sessionsWithEvent': {
        type: DataTypes.STRING,
      },
    },
  );
  return EventTracking;
};
