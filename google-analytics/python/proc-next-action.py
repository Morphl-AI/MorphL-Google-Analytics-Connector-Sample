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
        """
        Does the aggregations and calculations for client & session groups

        Returns: the output dataframe
        """
        result = pd.DataFrame()

        # sort by timestamp to have the data in chronological order, then discard the timestamp
        sorted_time_asc_df = self.df.sort_values('Date Hour and Minute')
        discarded_date_df = sorted_time_asc_df.drop('Date Hour and Minute', axis=1)
        # group by client id
        client_grouped_df = discarded_date_df.groupby('Client ID', axis=0, sort=False)

        no_groups = len(client_grouped_df)
        curr_group = 0
        for client_id, client_group in client_grouped_df:
            # print some statistics now and then to get a sense of how far we've got
            if curr_group % 50 == 0:
                print('Processing client group %i of %i' % (curr_group, no_groups))

            # group by session
            session_grouped_df = client_group.groupby('SessionID', axis=0, sort=False)

            available_columns = list(client_group.columns.values)
            # don't sum over certain cols, since it does not make sense
            cols_to_sum_over = [col for col in available_columns if col not in ['SessionID', 'Client ID', 'User Type']]
            session_summed_df = session_grouped_df[cols_to_sum_over].sum()

            # client id & user type need not be summed
            # just take the first value in the group, since all of them are the same
            client_user_type_df = session_grouped_df[['Client ID', 'User Type']].nth(0)

            # the concat between the two previous df's is what we need for one client
            summed_df = pd.concat([client_user_type_df, session_summed_df], axis=1, sort=False)
            result.append(summed_df)
            curr_group += 1

        return result

    def run(self):
        self.preprocess()
        group_sorted_df = self.gen_group_sorted_df()
        self.output(group_sorted_df)

    def output(self, df):
        df.to_csv(self.outfile)


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
