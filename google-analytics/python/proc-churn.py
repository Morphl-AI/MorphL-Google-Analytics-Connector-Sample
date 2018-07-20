"""
Data pre-processing for the churn training set
"""

import pandas as pd
from pandas.io.json import json_normalize
import numpy as np
import re
import time
from procbase import ProcessingBase


class ProcessingChurn(ProcessingBase):

    def get_users_data(self):

        month1_data = pd.read_csv(
            'data/raw/Table_April.csv', low_memory=False)
        month2_data = pd.read_csv(
            'data/raw/Table_May.csv', low_memory=False)
        month3_data = pd.read_csv(
            'data/raw/Table_June.csv', low_memory=False)

        # concatenate user data into a single csv file (last to first)
        data = month3_data.append(month2_data)
        data = data.append(month1_data)

        data = self.eliminate_invalid_client_ids(data)

        data = self.convert_columns_to_numbers(
            data, 'time', ['Session Duration', 'Time on Page'])

        data = self.convert_columns_to_numbers(
            data,
            'string',
            [
                'Days Since Last Session',
                'Count of Sessions',
                'Entrances',
                'Pageviews',
                'Unique Pageviews',
                'Exits',
                'Screen Views',
                'Bounces',
                'Page Load Time (ms)',
                'Sessions'
            ]
        )

        # order sessions data, newest sessions should appear first
        data = data.sort_values(by=['Count of Sessions'], ascending=False)

        # sum up / aggregate columns
        data_agg = data.groupby('Client ID', as_index=False).agg(
            {
                'Days Since Last Session': 'mean',
                'Count of Sessions': 'max',
                'Session Duration': 'sum',
                'Entrances': 'sum',
                'Pageviews': 'sum',
                'Unique Pageviews': 'sum',
                'Exits': 'sum',
                'Screen Views': 'sum',
                'Bounces': 'sum',
                'Time on Page': 'sum',
                'Page Load Time (ms)': 'sum',
                'Sessions': 'sum',
            }
        ).rename(columns={'Days Since Last Session': 'Avg. Days Since Last Session'})

        # delete the columns that were already aggregated
        data = data.drop(
            [
                'Count of Sessions',
                'Session Duration',
                'Entrances',
                'Pageviews',
                'Unique Pageviews',
                'Exits',
                'Screen Views',
                'Bounces',
                'Time on Page',
                'Page Load Time (ms)',
                'Sessions'
            ],
            axis=1
        )

        # handle device category column
        data = self.split_device_category(data)

        # merge aggregated and regular user data
        all_users = pd.merge(data, data_agg, on=['Client ID'], left_index=True)

        # eliminate duplicate clients ids (returning users)
        all_users = all_users.drop_duplicates(subset='Client ID')

        all_users.to_csv('data/churn.csv')

    def run(self):
        self.get_users_data()


def main():
    data_processing = ProcessingChurn()
    data_processing.run()


if __name__ == '__main__':
    main()
