import Sequelize from 'sequelize';

/**
 * Connect to the database, load credentials from environment variables.
 */

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'mysql',
  define: {
    underscored: true,
  },
  /* disable logging to console */
  logging: false,
  operatorsAliases: false,
});

const models = {
  ClientId: sequelize.import('./clientId'),
  User: sequelize.import('./user'),
  PlatformDevice: sequelize.import('./platformDevice'),
  System: sequelize.import('./system'),
  Session: sequelize.import('./session'),
  GoalConversions: sequelize.import('./goalConversions'),
  EventTracking: sequelize.import('./eventTracking'),
  PageTracking: sequelize.import('./pageTracking'),
  TrafficSources: sequelize.import('./trafficSources'),
  GeoContent: sequelize.import('./geoContent'),
  Time: sequelize.import('./time'),
};

Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
