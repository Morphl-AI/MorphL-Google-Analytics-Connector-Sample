"""
Data pre-processing for the next action training set
"""
import argparse
import pandas as pd

from procbase import ProcessingBase

# These can be used to restrict which Actions and/or labels are to be hot encoded
# However, this is a lot of 'custom manual work', I will attempt to train a model using all the event data
ACCEPTED_EVENT_ACTIONS = ['Click', 'Close video' 'Dismiss mobile banner', 'Entered viewport', 'Infinite loading fetch',
                          'Menu Interaction', 'Open preview', 'Percentage', 'Play video', 'Subscribed',
                          'Top articles time interval selection', 'User Engage']
ACCEPTED_EVENT_LABELS = ['Banner at article end',
                         'Homepage banner',
                         'Homepage infinite articles list scroll down button']  # many more can be added here


class ProcessingNextAction(ProcessingBase):
    def __init__(self, infile, outfile):
        self.df = pd.read_csv(infile, low_memory=False)
        self.outfile = outfile

    def preprocess(self):
        """
        Preprocesses the data as a whole (not taking relationships into account)
        """
        self.df = self.eliminate_invalid_client_ids(self.df)
        # User type can be either 0 = New Visitor or 1 = Returning Visitor
        self.df, generated_mapping = ProcessingBase.discretize_col(self.df, 'User Type')
        # One-hot encode the actions an the labels; this will add lots of columns
        self.df = ProcessingBase.one_hot_encode_col(self.df, 'Event Action')
        self.df = ProcessingBase.one_hot_encode_col(self.df, 'Event Label')

    def gen_group_sorted_df(self):
        print(self.df.head(10))
        client_grouped_df = self.df.groupby('Client ID', axis=0, sort=False)
        for client_id, client_group in client_grouped_df:
            print('Client ID:', client_id)
            session_grouped_df = client_group.groupby('SessionID', axis=0, sort=False)
            for session_id, group in session_grouped_df:
                print('SessionID', session_id)

                sorted_session_data = group.sort_values('Date Hour and Minute', ascending=True)
                print(sorted_session_data)

    def run(self):
        self.preprocess()
        # group_sorted_df = self.gen_group_sorted_df()
        # self.output(group_sorted_df)

    def output(self, df):
        df.to_csv(self.outfile)


def main():
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
