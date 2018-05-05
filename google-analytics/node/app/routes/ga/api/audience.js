import gaRequest from './request';

/*
* GA audience dimensions & metrics
* @link https://developers.google.com/analytics/devguides/reporting/core/dimsmets#view=detail&group=audience
*/
export const audienceDimensions = [
  'ga:userAgeBracket',
  'ga:userGender',
  'ga:interestOtherCategory',
  'ga:interestAffinityCategory',
  'ga:interestInMarketCategory',
];

/**
 * Get GA audience related data. Is queried using sessions.
 * @param {Object} analyticsReporting
 * @param {String} viewId
 * @param {String} startDate
 * @param {String} endDate
 * @param {Array} usersIds
 */
const getData = (analyticsReporting, viewId, startDate, endDate, usersIds = []) => {
  const dimensions = ['ga:dimension1'].concat(['ga:userAgeBracket', 'ga:userGender']);
  const metrics = [];
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
