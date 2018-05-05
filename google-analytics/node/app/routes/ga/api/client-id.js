/**
 * Get all users that have the defined custom dimension.
 * @param {Object} analyticsReporting
 * @param {String} viewId
 * @param {String} startDate
 * @param {String} endDate
 *
 * @todo Add pagination using nextPageToken returned in the response.
 */
export default (analyticsReporting, viewId, startDate, endDate) => {
  const queryParams = {
    resource: {
      reportRequests: [
        {
          viewId,
          metrics: [{ expression: 'ga:users' }],
          dimensions: [{ name: 'ga:dimension1' }, { name: 'ga:adwordsCustomerID' }],
          dateRanges: [{ startDate, endDate }],
          pageSize: 10000,
        },
      ],
    },
  };

  return new Promise((resolve, reject) => {
    analyticsReporting.reports.batchGet(queryParams, (err, result) => {
      if (err) {
        return reject(err);
      }

      const usersData = result.data.reports[0].data.rows;
      const usersIds = usersData.map(user => user.dimensions[0]);
      return resolve(usersIds);
    });
  });
};
