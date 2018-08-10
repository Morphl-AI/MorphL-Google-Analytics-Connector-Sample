"""
Data pre-processing helper functions
"""

import pandas as pd
from pandas.io.json import json_normalize
import numpy as np
import re
import time


class ProcessingBase:

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

    # Linear bijective transformation of a column according to the mapping dict
    # If no mapping dict is passed, then int values starting with 0 will be assigned to distinct values
    # Normally used to transform textual cols in numeric ones
    # E.g. ['Yes', 'No', 'No', 'Yes'] can become [1, 0, 0, 1] if mapping = {'Yes': 1, 'No': 0}
    #
    # Args:
    # df = pandas dataframe
    # col = name of the column to be transformed
    # mapping (optional) = dict mapping from current value to transformed value
    #
    # Return:
    # df = the dataframe with the "discretized" column
    # mapping = the mapping used (redundant if you pass in the mapping)
    @staticmethod
    def discretize_col(df, col, mapping=None):
        if mapping is None:
            unique_vals = df[col].unique()
            mapping = dict(zip(unique_vals, range(len(unique_vals))))
        df[col] = df[col].map(mapping)
        return df, mapping

    # Appends one hot encoding columns to the dataframe for a certain col
    # Args:
    # df = pandas dataframe
    # col = name of the column to be hot encoded
    #
    # Return:
    # df = the dataframe with the hot encoded cols and _without_ the original col
    @staticmethod
    def one_hot_encode_col(df, col):
        one_hot_encoded_cols = pd.get_dummies(df[col], prefix=col, prefix_sep=' ')
        df_without_original_col = df.drop(col, axis=1)
        return pd.concat([df_without_original_col, one_hot_encoded_cols], axis=1, sort=False)

    # Convert a HH:MM:SS time string into seconds
    def get_sec(self, time_str):
        h, m, s = time_str.split(':')
        return int(h) * 3600 + int(m) * 60 + int(s)

    def get_number(self, x):
        if isinstance(x, int):
            return x

        return int(x.replace(',', ''))

    # Convert HH:MM:SS columns into seconds
    def convert_columns_to_numbers(self, data, columns_format, columns=[]):

        for column in columns:
            if columns_format == 'time':
                data[column] = data[column].map(self.get_sec)
            else:
                data[column] = data[column].map(self.get_number)

        return data
