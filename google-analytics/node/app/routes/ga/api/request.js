import { isNil } from 'lodash';
import mapDataToHeaders from '../utilities/map-data-headers';

/**
 * Make request to the GA reporting API, parse and return result.
 *
 * @param {Object} analyticsReporting
 * @param {String} viewId
 * @param {String} startDate
 * @param {String} endDate
 * @param {Array} dimensions
 * @param {Array} metrics
 * @param {Object} dimensionFilterClauses
 * @param {Object} hash
 *
 * @return {Object} Promise
 */
export default (
  analyticsReporting,
  viewId,
  startDate,
  endDate,
  dimensions = [],
  metrics = [],
  dimensionFilterClauses = [],
  hash = {},
) => {
  const queryParams = {
    resource: {
      reportRequests: [
        {
          viewId,
          dateRanges: [{ startDate, endDate }],
          pageSize: 10000,
        },
      ],
    },
  };

  if (dimensions.length > 0) {
    queryParams.resource.reportRequests[0].dimensions = [dimensions.map(name => ({ name }))];
  }

  if (metrics.length > 0) {
    queryParams.resource.reportRequests[0].metrics = [metrics.map(name => ({ expression: name }))];
  }

  if (dimensionFilterClauses.length > 0) {
    queryParams.resource.reportRequests[0].dimensionFilterClauses = dimensionFilterClauses;
  }

  return new Promise((resolve, reject) => {
    analyticsReporting.reports.batchGet(queryParams, (err, result) => {
      if (err || isNil(result.data.reports[0])) {
        return reject(err);
      }

      return resolve(mapDataToHeaders(result.data.reports[0], hash));
    });
  });
};
