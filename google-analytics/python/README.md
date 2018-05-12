## Google Analytics - Python Connector

This script calls [Google Analytics API v4](https://developers.google.com/analytics/devguides/reporting/core/v4/) in order to retrieve data based on the **User Explorer** report (see your Google Analytics console for a peek at this report).

To run this script, you'll first need to:

- Install python 3 and pip
- Install dependencies

```
pip install --upgrade google-api-python-client
pip install pandas
```

- [**Set up custom clients ids**](https://github.com/Morphl-Project/MorphL-Tracking-Settings), so the Google API can retrieve data at the user level.
- Create **service account credentials** and place them in the **/credentials/service-account.json** file (see [Step 2](https://github.com/Morphl-Project/MorphL-Tracking-Settings/tree/master/google-analytics) for details on creating API credentials).
- Retrieve your **View ID** from the Google Analytics console.
- Modify the script to add your view id, start date and end date.
- Run the script: `python ga.py`

The retrieved data will be written to a csv file in the **data** folder.

