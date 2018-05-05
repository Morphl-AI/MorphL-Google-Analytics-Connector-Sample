import gaRequest from './request';

/*
* GA traffic sources dimensions
* @link https://developers.google.com/analytics/devguides/reporting/core/dimsmets#view=detail&group=traffic_sources
*/
export const trafficSourcesDimensions = [
  'ga:referralPath',
  'ga:fullReferrer',
  // 'ga:campaign',
  'ga:source',
  'ga:medium',
  // 'ga:sourceMedium', // combined value of source and medium
  'ga:keyword',
  // 'ga:adContent',
  'ga:socialNetwork',
  'ga:hasSocialSourceReferral',
  // 'ga:campaignCode', // breaks when adding this
];

export const trafficSourcesMetrics = ['ga:organicSearches'];

/**
 * Get GA traffic sources related data
 * @param {Object} analyticsReporting
 * @param {String} viewId
 * @param {String} startDate
 * @param {String} endDate
 * @param {Array} usersIds
 *
 * @todo Should we query by ga:sessions instead of ga:users?
 */
const getData = (analyticsReporting, viewId, startDate, endDate, usersIds = []) => {
  const dimensions = ['ga:dimension1', 'ga:dimension2'].concat(trafficSourcesDimensions);
  const metrics = ['ga:users'];
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
