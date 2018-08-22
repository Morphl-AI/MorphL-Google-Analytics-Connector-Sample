"""
Data pre-processing for the next action training set
"""
import argparse
import pandas as pd

from procbase import ProcessingBase


class ProcessingNextAction(ProcessingBase):
    def __init__(self, infile, outfile):
        self.df = pd.read_csv(infile, low_memory=False)
        self.outfile = outfile

    def preprocess(self):
        self.df = self.eliminate_invalid_client_ids(self.df)
        # User type can be either 0 = New Visitor or 1 = Returning Visitor
        self.df, generated_mapping = ProcessingBase.discretize_col(self.df, 'User Type')
        # One-hot encode the actions an the labels; this will add lots of columns
        self.df = ProcessingBase.one_hot_encode_col(self.df, 'Event Action')
        self.df = ProcessingBase.one_hot_encode_col(self.df, 'Event Label')

    def sort_df(self):
        """
        Does the aggregations and calculations for client & session groups
        """
        # sort by session id and timestamp to have the data in chronological order in session groups
        sorted_sess_time_asc_df = self.df.sort_values(['SessionID', 'Date Hour and Minute'])
        self.df = sorted_sess_time_asc_df

    def postprocess(self):
        # self.df = ProcessingBase.one_hot_encode_col(self.df, 'Client ID')
        pass

    def run(self):
        self.preprocess()
        self.sort_df()
        self.postprocess()
        self.output()

    def output(self):
        self.df.to_csv(self.outfile)


def main():
    # Configure pandas console output to be able to see more columns
    pd.set_option('display.max_rows', 200)
    pd.set_option('display.max_columns', 10)
    pd.set_option('display.width', 1000)

    arg_parser = argparse.ArgumentParser()
    arg_parser.add_argument('--infile', type=str, required=True,
                            help='This should be an interactions CSV\n'
                                 'Required cols: Client ID, SessionID, Date Hour and Minute, '
                                 'User Type, Event Action, Event Label')
    arg_parser.add_argument('--outfile', type=str, required=True)

    args = arg_parser.parse_args()

    data_processing = ProcessingNextAction(args.infile, args.outfile)
    data_processing.run()


if __name__ == '__main__':
    main()
