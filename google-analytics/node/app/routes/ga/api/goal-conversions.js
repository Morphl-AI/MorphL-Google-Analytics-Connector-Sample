import gaRequest from './request';

/*
* GA goal conversions dimensions & metrics
* @link https://developers.google.com/analytics/devguides/reporting/core/dimsmets#view=detail&group=goal_conversions
*/
export const goalConversionsDimensions = ['ga:goalCompletionLocation', 'ga:goalPreviousStep1', 'ga:goalPreviousStep2', 'ga:goalPreviousStep3'];

// @todo How to get these metrics? Get all goals first
export const goalConversionsMetrics = [
  'ga:goalXXStarts',
  'ga:goalStartsAll',
  'ga:goalXXCompletions',
  'ga:goalCompletionsAll',
  'ga:goalXXValue',
  'ga:goalValueAll',
  // 'ga:goalValuePerSession',
  // 'ga:goalXXConversionRate',
  // 'ga:goalConversionRateAll',
  // 'ga:goalXXAbandons',
  // 'ga:goalAbandonsAll',
  // 'ga:goalXXAbandonRate',
  // 'ga:goalAbandonRateAll',
];

/**
 * Get GA goal conversions related data. Is queried using sessions.
 * @param {Object} analyticsReporting
 * @param {String} viewId
 * @param {String} startDate
 * @param {String} endDate
 * @param {Array} usersIds
 */
const getData = (analyticsReporting, viewId, startDate, endDate, usersIds = []) => {
  const dimensions = ['ga:dimension1', 'ga:dimension2'].concat(goalConversionsDimensions);
  const metrics = ['ga:sessions', 'ga:goal1Completions'];
  const dimensionFilterClauses = usersIds.length > 0 ? [
    {
      filters: {
        dimensionName: 'ga:dimension2',
        operator: 'IN_LIST',
        expressions: usersIds,
      },
    },
  ] : [];

  return gaRequest(analyticsReporting, viewId, startDate, endDate, dimensions, metrics, dimensionFilterClauses);
};

export default getData;
