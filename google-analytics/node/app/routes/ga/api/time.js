import gaRequest from './request';

/*
* GA time dimensions & metrics
* @link https://developers.google.com/analytics/devguides/reporting/core/dimsmets#view=detail&group=time
*/
export const timeDimensions = [
  // 'ga:date',
  // 'ga:year',
  // 'ga:month',
  // 'ga:week',
  // 'ga:day',
  // 'ga:hour',
  // 'ga:minute',
  // 'ga:nthMonth',
  // 'ga:nthWeek',
  // 'ga:nthDay',
  // 'ga:nthMinute',
  // 'ga:dayOfWeek',
  // 'ga:dayOfWeekName',
  // 'ga:dateHour',
  'ga:dateHourMinute',
  // 'ga:yearMonth',
  // 'ga:yearWeek',
  // 'ga:isoWeek',
  // 'ga:isoYear',
  // 'ga:isoYearIsoWeek',
  // 'ga:nthHour',
];

/**
 * Get GA time related data. Is queried using sessions.
 * @param {Object} analyticsReporting
 * @param {String} viewId
 * @param {String} startDate
 * @param {String} endDate
 * @param {Array} usersIds
 */
const getData = (analyticsReporting, viewId, startDate, endDate, usersIds = []) => {
  const dimensions = ['ga:dimension1', 'ga:dimension2'].concat(timeDimensions);
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
