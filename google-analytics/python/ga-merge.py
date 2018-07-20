import pandas as pd
from pandas.io.json import json_normalize
import numpy as np
import re
import time


class GoogleAnalyticsMerger:

    # Filter clients ids that don't match the GAxxxxxx.xxxxxxx format
    def eliminate_invalid_client_ids(self, data):
        pattern = re.compile(r'^GA[0-9]+\.[0-9]+$')
        filter_data = data['Client ID'].str.contains(pattern)

        return data[filter_data]

    # Transform Device Category values into boolean columns
    def split_device_category(self, data):

        # split the device category column into multiple columns
        # multiple by 1 to convert the values to int
        data['Is Desktop'] = (data['Device Category'] == 'desktop') * 1
        data['Is Mobile'] = (data['Device Category'] == 'mobile') * 1
        data['Is Tablet'] = (data['Device Category'] == 'tablet') * 1

        # eliminate the Device Category column
        return data.drop(['Device Category'], axis=1)

    # Convert a HH:MM:SS time string into seconds
    def get_sec(self, time_str):
        h, m, s = time_str.split(':')
        return int(h) * 3600 + int(m) * 60 + int(s)

    # Convert HH:MM:SS columns into seconds
    def convert_time_columns(self, data):

        data['Session Duration'] = data['Session Duration'].map(
            self.get_sec)

        data['Time on Page'] = data['Time on Page'].map(
            self.get_sec)

        return data

    def get_number(self, x):
        if isinstance(x, int):
            return x

        return int(x.replace(',', ''))

    def convert_numeric_columns(self, data):
        data['Entrances'] = data['Entrances'].map(self.get_number)
        data['Pageviews'] = data['Pageviews'].map(self.get_number)
        data['Unique Pageviews'] = data['Unique Pageviews'].map(
            self.get_number)
        data['Exits'] = data['Exits'].map(self.get_number)
        data['Screen Views'] = data['Screen Views'].map(self.get_number)
        data['Bounces'] = data['Bounces'].map(self.get_number)

        data['Page Load Time (ms)'] = data['Page Load Time (ms)'].map(
            self.get_number)

        return data

    # Get all users, eliminating duplicate Client IDs
    def get_users_data(self):

        month1_data = pd.read_csv(
            'data/raw/Features_April_1.csv', low_memory=False)
        month2_data = pd.read_csv(
            'data/raw/Features_May_1.csv', low_memory=False)
        month3_data = pd.read_csv(
            'data/raw/Features_June_1.csv', low_memory=False)

        # concatenate user data into a single csv file
        user_data = month3_data.append(month2_data)
        user_data = user_data.append(month1_data)

        user_data = self.eliminate_invalid_client_ids(user_data)

        # @todo ! Avg. Page Load Time is always null, eliminate from export
        user_data = self.convert_time_columns(user_data)
        user_data = self.convert_numeric_columns(user_data)

        # sum up columns
        user_agg_data = user_data.groupby('Client ID', as_index=False).agg(
            {
                'Session Duration': 'sum',
                'Entrances': 'sum',
                'Pageviews': 'sum',
                'Unique Pageviews': 'sum',
                # 'Page Value': 'sum',
                'Exits': 'sum',
                'Screen Views': 'sum',
                'Bounces': 'sum',
                'Time on Page': 'sum',
                'Page Load Time (ms)': 'sum'
            }
        )

        # delete the columns that were already aggregated
        user_data = user_data.drop(
            [
                'Session Duration',
                'Entrances',
                'Pageviews',
                'Unique Pageviews',
                # 'Page Value',
                'Exits',
                'Screen Views',
                'Bounces',
                'Time on Page',
                'Page Load Time (ms)'
            ],
            axis=1
        )

        # handle device category column
        user_data = self.split_device_category(user_data)

        # merge aggregated and regular user data
        all_users = pd.merge(user_data, user_agg_data, on=[
            'Client ID'], left_index=True)

        # eliminate duplicate clients ids (returning users)
        all_users = all_users.drop_duplicates(subset='Client ID')

        all_users.to_csv('data/user_data.csv')

        return all_users

    # Aggregate sessions data at the user level
    def get_sessions_data(self):

        month1_data = pd.read_csv('data/raw/Features_April_2.csv')
        month2_data = pd.read_csv('data/raw/Features_May_2.csv')
        month3_data = pd.read_csv('data/raw/Features_June_2.csv')

        # concatenate session data
        session_data = month3_data.append(month2_data)
        session_data = session_data.append(month1_data)

        session_data = self.eliminate_invalid_client_ids(session_data)

        # order sessions, newest sessions should appear first
        session_data = session_data.sort_values(
            by=['Count of Sessions'], ascending=False)

        # separate sessions data that needs to be aggregated
        # sum up hits and sessions, get the last count of sessions value
        session_agg_data = session_data.groupby('Client ID', as_index=False).agg(
            {'Count of Sessions': 'max', 'Sessions': 'sum', 'Hits': 'sum'})

        # keep only a single row for each client id
        session_data = session_data.drop_duplicates(subset='Client ID')

        # delete the columns that were already aggregated (keep only DaysSinceLastSession)
        session_data = session_data.drop(
            ['Sessions', 'Count of Sessions', 'Hits'], axis=1)

        all_sessions = pd.merge(session_data, session_agg_data, on=[
            'Client ID'], left_index=True)
        all_sessions.to_csv('data/all_sessions.csv')

        return all_sessions

    def calculate_metrics(self, data):

        data['Avg. Session Duration'] = data['Session Duration'] / data['Sessions']
        data['Entrances / Pageviews'] = data['Entrances'] / data['Pageviews']
        data['Pages / Session'] = data['Pageviews'] / data['Sessions']
        data['% Exit'] = data['Exits'] / \
            (data['Pageviews'] + data['Screen Views'])
        data['Avg. Time on Page'] = data['Time on Page'] / \
            (data['Pageviews'] - data['Exits'])
        data['Bounce Rate'] = data['Bounces'] / data['Sessions']

        return data

    def run(self):

        all_users = self.get_users_data()
        all_sessions = self.get_sessions_data()

        all_data = pd.merge(all_users, all_sessions, on=[
                            'Client ID'], how='outer')

        # keep only users with at least 2 sessions
        all_data = all_data.drop(
            all_data[all_data['Count of Sessions'] < 2].index)

        # add back calculated metrics
        # all_data = self.calculate_metrics(all_data)

        all_data.to_csv('data/all_data.csv')


def main():
    google_analytics = GoogleAnalyticsMerger()
    google_analytics.run()


if __name__ == '__main__':
    main()
