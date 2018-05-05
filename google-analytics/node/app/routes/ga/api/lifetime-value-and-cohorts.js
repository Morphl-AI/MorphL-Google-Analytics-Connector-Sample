import gaRequest from './request';

/*
* GA lifetime value and cohorts dimensions & metrics
* @link https://developers.google.com/analytics/devguides/reporting/core/dimsmets#view=detail&group=lifetime_value_and_cohorts
*/
export const lifetimeValueAndCohortsDimensions = [
  'ga:acquisitionCampaign',
  'ga:acquisitionMedium',
  'ga:acquisitionSource',
  // 'ga:acquisitionSourceMedium', // calculated metric
  'ga:acquisitionTrafficChannel',
  'ga:cohort',
  'ga:cohortNthDay',
  'ga:cohortNthMonth',
  'ga:cohortNthWeek',
];

/**
 * Get GA lifetime value and cohorts related data. Is queried using sessions.
 * @param {Object} analyticsReporting
 * @param {String} viewId
 * @param {String} startDate
 * @param {String} endDate
 * @param {Array} usersIds
 */
const getData = (analyticsReporting, viewId, startDate, endDate, usersIds = []) => {
  const dimensions = ['ga:dimension1', 'ga:dimension2'].concat(lifetimeValueAndCohortsDimensions);
  const metrics = ['ga:sessions'];
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
