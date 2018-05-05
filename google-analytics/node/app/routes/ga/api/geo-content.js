import gaRequest from './request';

/*
* GA geo network dimensions & metrics
* @link https://developers.google.com/analytics/devguides/reporting/core/dimsmets#view=detail&group=geo_network
*/
const geoNetworkDimensions = [
  'ga:continent',
  // 'ga:subContinent',
  'ga:country',
  'ga:region',
  // 'ga:metro',
  'ga:city',
  'ga:latitude',
  'ga:longitude',
  // 'ga:networkDomain',
  // 'ga:networkLocation',
  // 'ga:cityId',
  // 'ga:continentId',
  // 'ga:countryIsoCode',
  // 'ga:metroId',
  // 'ga:regionId',
  'ga:regionIsoCode',
  // 'ga:subContinentCode',
];

/**
 * Get GA geo network related data. Is queried using sessions.
 * @param {Object} analyticsReporting
 * @param {String} viewId
 * @param {String} startDate
 * @param {String} endDate
 * @param {Array} usersIds
 */
const getData = (analyticsReporting, viewId, startDate, endDate, usersIds = []) => {
  const dimensions = ['ga:dimension1', 'ga:dimension2'].concat(geoNetworkDimensions);
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
