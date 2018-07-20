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
