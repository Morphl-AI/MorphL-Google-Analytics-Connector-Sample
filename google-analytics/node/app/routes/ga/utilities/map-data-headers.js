import { isNil } from 'lodash';

/**
 * Convert numeric and hashed values to numbers.
 *
 * @param {String} name = Dimension / metric name
 * @param {String} value = Dimension / metric value
 * @param {Object} hash = Object with hashed values.
 */
const convertValues = (name, value, hash) => {
  if (value.match(/^-?\d*(\.\d+)?$/)) {
    return Number(value);
  }

  if (!isNil(hash[name])) {
    if (!isNil(hash[name][value])) {
      return Number(hash[name][value]);
    }

    return 0;
  }

  return String(value);
};

/**
 * Parse GA reports and return an array with objects (ex. {ga metric / dimension: value}).
 *
 * @param {Object} report = The GA report
 * @param {Object} hash = Dimensions / metrics hash map, used for converting finite options to numbers
 *
 * @link https://developers.google.com/analytics/devguides/reporting/core/v4/rest/v4/reports/batchGet#report
 */
const mapDataToHeaders = (report, hash) => {
  const { columnHeader: { dimensions, metricHeader: { metricHeaderEntries } } } = report;

  if (isNil(dimensions) || isNil(metricHeaderEntries) || isNil(report.data) || isNil(report.data.rows)) {
    return [];
  }

  return report.data.rows.map((row) => {
    let dims = {};
    let metrics = {};

    if (!isNil(dimensions)) {
      dims = dimensions.reduce((obj, k, i) => ({
        ...obj,
        [k]: convertValues(k, row.dimensions[i], hash),
      }), {});
    }

    if (!isNil(metricHeaderEntries)) {
      metrics = metricHeaderEntries.reduce((obj, k, i) => ({
        ...obj,
        [k.name]: convertValues(k.name, row.metrics[0].values[i], hash),
      }), {});
    }

    return { ...dims, ...metrics };
  });
};

export default mapDataToHeaders;
