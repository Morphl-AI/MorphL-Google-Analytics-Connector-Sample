import gaRequest from './request';

/*
* GA events dimensions & metrics
* @link https://developers.google.com/analytics/devguides/reporting/core/dimsmets#view=detail&group=event_tracking
*/
export const eventTrackingDimensions = ['ga:eventCategory', 'ga:eventAction', 'ga:eventLabel'];

export const eventTrackingMetrics = [
  'ga:totalEvents',
  'ga:uniqueEvents',
  'ga:eventValue',
  // 'ga:avgEventValue',
  'ga:sessionsWithEvent',
  // 'ga:eventsPerSessionWithEvent',
];

/**
 * Get GA events related data. Is queried using sessions.
 * @param {Object} analyticsReporting
 * @param {String} viewId
 * @param {String} startDate
 * @param {String} endDate
 * @param {Array} usersIds
 */
const getData = (analyticsReporting, viewId, startDate, endDate, usersIds = []) => {
  const dimensions = ['ga:dimension1', 'ga:dimension2'].concat(eventTrackingDimensions);
  const metrics = ['ga:sessions'].concat(eventTrackingMetrics);
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
