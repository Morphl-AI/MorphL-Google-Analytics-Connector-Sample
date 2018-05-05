import gaRequest from './request';

/*
* GA session dimensions
* @link https://developers.google.com/analytics/devguides/reporting/core/dimsmets#view=detail&group=session
*/
export const sessionDimensions = ['ga:sessionDurationBucket'];

// export const sessionMetrics = [
//   'ga:sessions',
//   'ga:bounces',
//   'ga:bounceRate',
//   'ga:sessionDuration',
//   'ga:avgSessionDuration',
//   'ga:uniqueDimensionCombinations',
//   'ga:hits',
// ];

/**
 * Get GA session related data
 * @param {Object} analyticsReporting
 * @param {String} viewId
 * @param {String} startDate
 * @param {String} endDate
 * @param {Array} usersIds
 *
 */
const getData = (analyticsReporting, viewId, startDate, endDate, usersIds = []) => {
  const dimensions = ['ga:dimension1', 'ga:dimension2'].concat(sessionDimensions);
  const metrics = ['ga:pageViews'];
  const dimensionFilterClauses = usersIds.length > 0 ? [
    {
      filters: {
        dimensionName: 'ga:dimension1',
        operator: 'IN_LIST',
        expressions: usersIds,
      },
    },
  ] : [];

  return gaRequest(analyticsReporting, viewId, startDate, endDate, dimensions, metrics, dimensionFilterClauses);
};

export default getData;
