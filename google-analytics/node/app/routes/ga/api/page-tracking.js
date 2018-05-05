import gaRequest from './request';

/*
* GA goal conversions dimensions & metrics
* @link https://developers.google.com/analytics/devguides/reporting/core/dimsmets#view=detail&group=goal_conversions
*/
export const pageTrackingDimensions = [
  'ga:hostname',
  'ga:pagePath',
  // 'ga:pagePathLevel1',
  // 'ga:pagePathLevel2',
  // 'ga:pagePathLevel3',
  // 'ga:pagePathLevel4',
  // 'ga:pageTitle',
  'ga:landingPagePath',
  'ga:secondPagePath',
  'ga:exitPagePath',
  'ga:previousPagePath',
  // 'ga:pageDepth',
];
export const pageTrackingMetrics = [
  'ga:pageValue',
  'ga:entrances',
  // 'ga:entranceRate',
  'ga:pageviews',
  // 'ga:pageviewsPerSession',
  'ga:uniquePageviews',
  'ga:timeOnPage',
  // 'ga:avgTimeOnPage',
  'ga:exits',
  // 'ga:exitRate',
];

export const siteSpeedMetrics = [
  'ga:pageLoadTime',
  'ga:pageLoadSample',
  // 'ga:avgPageLoadTime', // calculated metric
  'ga:domainLookupTime',
  // 'ga:avgDomainLookupTime', // calculated metric
  'ga:pageDownloadTime',
  // 'ga:avgPageDownloadTime', // calculated metric
  'ga:redirectionTime',
  // 'ga:avgRedirectionTime', // calculated metric
  'ga:serverConnectionTime',
  // 'ga:avgServerConnectionTime', // calculated metric
  'ga:serverResponseTime',
  // 'ga:avgServerResponseTime', // calculated metric
  // 'ga:speedMetricsSample',
  'ga:domInteractiveTime',
  // 'ga:avgDomInteractiveTime', // calculated metric
  'ga:domContentLoadedTime',
  // 'ga:avgDomContentLoadedTime', // calculated metric
  // 'ga:domLatencyMetricsSample',
];

/**
 * Get GA goal conversions related data. Is queried using sessions.
 * @param {Object} analyticsReporting
 * @param {String} viewId
 * @param {String} startDate
 * @param {String} endDate
 * @param {Array} usersIds
 */
const getPageTracking = (analyticsReporting, viewId, startDate, endDate, usersIds = []) => {
  const dimensions = ['ga:dimension1', 'ga:dimension2', 'ga:dimension3'].concat(pageTrackingDimensions);
  const metrics = ['ga:sessions'].concat(pageTrackingMetrics);
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
const getSiteSpeed = (analyticsReporting, viewId, startDate, endDate, usersIds = []) => {
  const dimensions = ['ga:dimension1', 'ga:dimension2', 'ga:dimension3'].concat(pageTrackingDimensions);
  const metrics = ['ga:sessions'].concat(siteSpeedMetrics);
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

const getData = (analyticsReporting, viewId, startDate, endDate, usersIds = []) => Promise.all([
  getPageTracking(analyticsReporting, viewId, startDate, endDate, usersIds),
  getSiteSpeed(analyticsReporting, viewId, startDate, endDate, usersIds),
]);

export default getData;
