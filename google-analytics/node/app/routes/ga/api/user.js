import gaRequest from './request';

/*
* GA user dimensions
* @link https://developers.google.com/analytics/devguides/reporting/core/dimsmets#view=detail&group=user
*/
export const userDimensions = [
  'ga:userType',
  'ga:sessionCount',
  'ga:daysSinceLastSession',
  //  'ga:userDefinedValue',
  // 'ga:userBucket',
];

/**
 * GA user metrics
 * @link https://developers.google.com/analytics/devguides/reporting/core/dimsmets#view=detail&group=user&jump=usermetrics
 */
export const userMetrics = [
  'ga:users',
  // 'ga:newUsers',
  // 'ga:percentNewSessions',
  // 'ga:1dayUsers',
  // 'ga:7dayUsers',
  // 'ga:14dayUsers',
  // 'ga:28dayUsers',
  // 'ga:30dayUsers',
  // 'ga:sessionsPerUser',
];

/**
 * Hash for string values that can be easily converted to numbers
 */
export const userHash = {
  'ga:userType': {
    'New Visitor': 1,
    'Returning Visitor': 2,
  },
};

/**
 * Get GA user related data
 * @param {Object} analyticsReporting
 * @param {String} viewId
 * @param {String} startDate
 * @param {String} endDate
 * @param {Array} usersIds
 */
const getData = (analyticsReporting, viewId, startDate, endDate, usersIds = []) => {
  const dimensions = ['ga:dimension1'].concat(userDimensions);
  const metrics = ['ga:users'];
  const dimensionFilterClauses = usersIds.length > 0 ? [
    {
      filters: {
        dimensionName: 'ga:dimension1',
        operator: 'IN_LIST',
        expressions: usersIds,
      },
    },
  ] : [];

  return gaRequest(analyticsReporting, viewId, startDate, endDate, dimensions, metrics, dimensionFilterClauses, userHash);
};

export default getData;
