export default (sequelize, DataTypes) => {
  const GoalConversions = sequelize.define(
    'goalConversions',
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
      'ga:goalCompletionLocation': {
        type: DataTypes.STRING,
      },
      'ga:goalPreviousStep1': {
        type: DataTypes.STRING,
      },
      'ga:goalPreviousStep2': {
        type: DataTypes.STRING,
      },
      'ga:goalPreviousStep3': {
        type: DataTypes.STRING,
      },
      'ga:sessions': {
        type: DataTypes.STRING,
      },
      'ga:goal1Completions': {
        type: DataTypes.STRING,
      },
    },
  );

  return GoalConversions;
};
