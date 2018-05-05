import gaRequest from './request';

/*
* GA system dimensions & metrics
* @link https://developers.google.com/analytics/devguides/reporting/core/dimsmets#view=detail&group=system
*/
export const systemDimensions = [
  // 'ga:flashVersion',
  // 'ga:javaEnabled',
  'ga:language',
  // 'ga:screenColors',
  // 'ga:sourcePropertyDisplayName',
  // 'ga:sourcePropertyTrackingId', // breaks when we add this one
  'ga:screenResolution',
];

/**
 * Get GA system related data. Is queried using sessions.
 * @param {Object} analyticsReporting
 * @param {String} viewId
 * @param {String} startDate
 * @param {String} endDate
 * @param {Array} usersIds
 */
const getData = (analyticsReporting, viewId, startDate, endDate, usersIds = []) => {
  const dimensions = ['ga:dimension1'].concat(systemDimensions);
  const metrics = ['ga:sessions'];
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
