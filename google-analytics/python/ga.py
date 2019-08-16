"""Google Analytics Reporting API V4 Connector for the Morphl project"""

from time import sleep
from apiclient.discovery import build
from oauth2client.service_account import ServiceAccountCredentials
import pandas as pd
from pandas.io.json import json_normalize


class GoogleAnalytics:

    def __init__(self):
        self.SCOPES = ['https://www.googleapis.com/auth/analytics.readonly']
        self.KEY_FILE_LOCATION = 'credentials/service-account.json'
        self.VIEW_ID = '<YOUR-VIEW-ID-HERE>'

        self.start_date = '2daysAgo'
        self.end_date = 'yesterday'

        self.analytics = None

    # Initializes an Analytics Reporting API V4 service object.
    def authenticate(self):
        credentials = ServiceAccountCredentials.from_json_keyfile_name(
            self.KEY_FILE_LOCATION, self.SCOPES)

        # Build the service object.
        self.analytics = build('analyticsreporting',
                               'v4', credentials=credentials)

    # Make request to the GA reporting API and return result.
    # @todo Add pagination !
    def get_report(self, dimensions, metrics, dimensions_filters=None, metrics_filters=None):
        """Queries the Analytics Reporting API V4.

        Args:
          analytics: An authorized Analytics Reporting API V4 service object.
          dimensions: A list with the GA dimensions
          metrics: A list with the metrics
          dimensions_filters: A list with the GA dimensions filters
          metrics_filters: A list with the GA metrics filters
        Returns:
          The Analytics Reporting API V4 response.
        """
        query_params = {
            'viewId': self.VIEW_ID,
            'dateRanges': [{'startDate': self.start_date, 'endDate': self.end_date}],
            'dimensions': self.format_dimensions(dimensions),
            'metrics': self.format_metrics(metrics),
            'pageSize': 10000,
        }

        if dimensions_filters is not None:
            query_params['dimensionFilterClauses'] = dimensions_filters

        if metrics_filters is not None:
            query_params['metricFilterClauses'] = metrics_filters

        response_list = []
        reports_object = self.analytics.reports()
        page_token = None
        while True:

            # Working around the "Insufficient tokens for quota" error message
            # The permanent solution to this is to increase the request quota in the developer console
            # The default quota is 1K, the maximum is 10K
            sleep(1)

            if page_token:
                query_params['pageToken'] = page_token
            data_chunk = reports_object.batchGet(body={'reportRequests': [query_params]}).execute()
            response_list.extend(data_chunk['reports'])
            page_token = data_chunk['reports'][0].get('nextPageToken', None)
            if not page_token:
                break

        return {'reports': response_list}

    # Transform list of dimensions names into objects with a 'name' property.
    def format_dimensions(self, dims):
        return list(map(lambda dim: {'name': 'ga:' + dim}, dims))

    # Transform list of metrics names into objects with an 'expression' property.
    def format_metrics(self, metrics):
        return list(map(lambda metric: {'expression': 'ga:' + metric}, metrics))

    # Parse the response from the Google Analytics API into a data frame format
    def parse_data(self, response):

        for reports in response.get('reports', []):

            columnHeader = reports['columnHeader']['dimensions']
            metricHeader = reports['columnHeader']['metricHeader']['metricHeaderEntries']

            columns = columnHeader
            for metric in metricHeader:
                columns.append(metric['name'])

            if 'rows' in reports['data']:
                data = json_normalize(reports['data']['rows'])

                data_dimensions = pd.DataFrame(data['dimensions'].tolist())
                data_metrics = pd.DataFrame(data['metrics'].tolist())
                data_metrics = data_metrics.applymap(lambda x: x['values'])
                data_metrics = pd.DataFrame(data_metrics[0].tolist())

                result = pd.concat([data_dimensions, data_metrics],
                                   axis=1, ignore_index=True, keys=columns)
                result.columns = columns

                return result

        return pd.DataFrame([])

    # Get users / unique clients ids
    def get_clients_ids(self):
        response = self.get_report(['dimension1'], ['users'])
        return self.parse_data(response)

    # Get sessions / unique sessions ids
    def get_sessions(self, dimensions_filters):
        dimensions = ['dimension1', 'dimension2', 'sessionDurationBucket']
        metrics = ['pageViews']
        response = self.get_report(dimensions, metrics, dimensions_filters)
        return self.parse_data(response)

    # Get platform device
    def get_platform_device(self, dimensions_filters):

        # Get data for desktop devices
        dimensions = [
            'dimension1',
            'browser',
            'browserVersion',
            'operatingSystem',
            'operatingSystemVersion'
        ]

        response = self.get_report(dimensions, ['users'], dimensions_filters)
        all_platforms = self.parse_data(response)

        # Eliminate users column
        del all_platforms['ga:users']

        # Get data for mobile devices
        dimensions = [
            'dimension1',
            'mobileDeviceBranding',
            'mobileDeviceModel',
            'mobileInputSelector',
            'mobileDeviceInfo'
        ]

        response = self.get_report(dimensions, ['users'], dimensions_filters)
        mobile_platforms = self.parse_data(response)

        # Eliminate users column
        del mobile_platforms['ga:users']

        return pd.merge(all_platforms, mobile_platforms, on='ga:dimension1', how='outer')

    # Get system data
    def get_system_data(self, dimensions_filters):
        dimensions = ['dimension1', 'language', 'screenResolution']
        metrics = ['sessions']
        response = self.get_report(dimensions, metrics, dimensions_filters)

        system_data = self.parse_data(response)
        del system_data['ga:sessions']
        return system_data

    # Get goals conversions
    def get_goals(self, dimensions_filters):
        goals_metrics_filter = [
            {
                'filters': {
                    'metricName': 'ga:goalCompletionsAll',
                    'operator': 'GREATER_THAN',
                    'comparisonValue': "0",
                },
            },
        ]

        dimensions = ['dimension1', 'dimension2']

        goals = []
        # Get goals from 1 to 20 in two requests
        for i in [1, 11]:
            metrics = list(map(lambda i: 'goal' + str(i) +
                               'Completions', range(i, i + 10)))

            response = self.get_report(
                dimensions, metrics, dimensions_filters, goals_metrics_filter)
            goals.append(self.parse_data(response))

        if len(goals[0]) == 0:
            return goals[1]

        if len(goals[1]) == 0:
            return goals[0]

        return pd.merge(goals[0], goals[1], on=['ga:dimension1', 'ga:dimension2'], how='outer')

    # Get events
    def get_events(self, dimensions_filters):
        dimensions = ['dimension1', 'dimension2', 'eventCategory',
                      'eventAction', 'eventLabel', 'pagePath']
        metrics = ['sessions', 'totalEvents',
                   'eventValue', 'sessionsWithEvent']
        response = self.get_report(dimensions, metrics, dimensions_filters)

        events_data = self.parse_data(response)
        del events_data['ga:sessions']
        return events_data

    # Get page tracking
    def get_page_tracking(self, dimensions_filters):
        dimensions = ['dimension1', 'dimension2', 'dimension3',
                      'hostname', 'pagePath', 'landingPagePath', 'secondPagePath', 'exitPagePath', 'previousPagePath']
        metrics = ['sessions', 'pageValue',
                   'entrances', 'pageviews', 'uniquePageviews', 'timeOnPage', 'exits']
        response = self.get_report(dimensions, metrics, dimensions_filters)

        page_tracking_data = self.parse_data(response)
        del page_tracking_data['ga:sessions']
        return page_tracking_data

    # Get site speed
    def get_site_speed(self, dimensions_filters):
        dimensions = ['dimension1', 'dimension2', 'dimension3',
                      'hostname', 'pagePath', 'landingPagePath', 'secondPagePath', 'exitPagePath', 'previousPagePath']

        metrics = ['sessions', 'pageLoadTime',
                   'pageLoadSample', 'domainLookupTime', 'pageDownloadTime', 'redirectionTime',
                   'serverConnectionTime', 'serverResponseTime', 'domInteractiveTime', 'domContentLoadedTime']
        response = self.get_report(dimensions, metrics, dimensions_filters)

        return self.parse_data(response)

    # Get site speed
    def get_geo_content(self, dimensions_filters):
        dimensions = ['dimension1', 'dimension2',
                      'continent', 'country', 'region', 'city', 'latitude', 'longitude', 'regionIsoCode']

        metrics = ['sessions']
        response = self.get_report(dimensions, metrics, dimensions_filters)

        return self.parse_data(response)

    # Get traffic sources
    def get_traffic_sources(self, dimensions_filters):
        dimensions = ['dimension1', 'dimension2',
                      'referralPath', 'fullReferrer', 'source', 'medium', 'keyword', 'socialNetwork', 'hasSocialSourceReferral']

        metrics = ['sessions']
        response = self.get_report(dimensions, metrics, dimensions_filters)

        return self.parse_data(response)

    # Get time
    def get_time(self, dimensions_filters):
        dimensions = ['dimension1', 'dimension2', 'dateHourMinute']

        metrics = ['sessions']
        response = self.get_report(dimensions, metrics, dimensions_filters)

        return self.parse_data(response)

    def run(self):
        self.authenticate()
        clients_ids = self.get_clients_ids()

        # create filter by clients ids
        dim1_filter = [
            {
                'filters': {
                    'dimensionName': 'ga:dimension1',
                    'operator': 'IN_LIST',
                    'expressions': clients_ids['ga:dimension1'].tolist(),
                },
            },
        ]

        sessions = self.get_sessions(dim1_filter)

        # create filter by sessions ids
        dim2_filter = [
            {
                'filters': {
                    'dimensionName': 'ga:dimension2',
                    'operator': 'IN_LIST',
                    'expressions': sessions['ga:dimension2'].tolist(),
                },
            },
        ]

        # get other metrics & dimensions
        platform_device = self.get_platform_device(dim1_filter)
        system_data = self.get_system_data(dim1_filter)
        goals = self.get_goals(dim1_filter)
        events = self.get_events(dim2_filter)
        page_tracking = self.get_page_tracking(dim2_filter)
        geo_content = self.get_geo_content(dim2_filter)
        traffic_sources = self.get_traffic_sources(dim2_filter)
        site_speed = self.get_site_speed(dim2_filter)
        # time = self.get_time(dim2_filter)

        # merge data into a single csv file
        all_data = pd.merge(sessions, page_tracking,
                            on=['ga:dimension1', 'ga:dimension2'], how='outer')
        all_data = pd.merge(all_data, platform_device,
                            on='ga:dimension1', how='outer')
        all_data = pd.merge(all_data, system_data,
                            on='ga:dimension1', how='outer')
        all_data = pd.merge(all_data, geo_content,
                            on=['ga:dimension1', 'ga:dimension2'], how='outer')
        all_data = pd.merge(all_data, traffic_sources,
                            on=['ga:dimension1', 'ga:dimension2'], how='outer')
        all_data = pd.merge(all_data, goals,
                            on=['ga:dimension1', 'ga:dimension2'], how='outer')
        all_data = pd.merge(all_data, site_speed,
                            on=['ga:dimension1', 'ga:dimension2', 'ga:pagePath'], how='outer')
        all_data = pd.merge(all_data, events,
                            on=['ga:dimension1', 'ga:dimension2', 'ga:pagePath'], how='outer')
        all_data.to_csv('data/all_data.csv')


def main():
    google_analytics = GoogleAnalytics()
    google_analytics.run()


if __name__ == '__main__':
    main()
