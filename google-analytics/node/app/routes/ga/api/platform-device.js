import gaRequest from './request';

/*
* GA platform & device dimensions
* @link https://developers.google.com/analytics/devguides/reporting/core/dimsmets#view=detail&group=platform_or_device
*/
export const platformDeviceDimensions = [
  'ga:browser',
  'ga:browserVersion',
  'ga:operatingSystem',
  'ga:operatingSystemVersion',
  'ga:mobileDeviceBranding',
  'ga:mobileDeviceModel',
  'ga:mobileInputSelector',
  'ga:mobileDeviceInfo',
  // 'ga:mobileDeviceMarketingName',
  // 'ga:deviceCategory',
  // 'ga:browserSize',
  // 'ga:dataSource',
];

/**
 * Hash for string values that can be easily converted to numbers
 */
export const platformDeviceHash = {
  'ga:browser': {
    Chrome: 1,
    Safari: 2,
    Firefox: 3,
    Opera: 4,
    Edge: 5,
    'Safari (in-app)': 6,
    'Internet Explorer': 7,
  },
  'ga:operatingSystem': {
    Windows: 1,
    Macintosh: 2,
    Linux: 3,
    Android: 4,
    iOS: 5,
    'Chrome OS': 6,
    '(not set)': 7,
  },
  'ga:mobileInputSelector': {
    touchscreen: 1,
    web: 2,
    '(not set)': 3,
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
  const dimensions = ['ga:dimension1'].concat(platformDeviceDimensions);
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

  return gaRequest(analyticsReporting, viewId, startDate, endDate, dimensions, metrics, dimensionFilterClauses, platformDeviceHash);
};

export default getData;
