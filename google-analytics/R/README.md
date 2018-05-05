## Google Analytics - R Connector

This script calls [Google Analytics API v4](https://developers.google.com/analytics/devguides/reporting/core/v4/) in order to retrieve data based on the **User Explorer** report (see your Google Analytics console for a peek at this report).

To run this script, you'll first need to:

- [**Set up custom clients ids**](https://github.com/Morphl-Project/MorphL-Tracking-Settings), so the Google API can retrieve data at the user level.
- Create **service account credentials** and place them in the **/credentials/service-account.json** file (see [Step 2](https://github.com/Morphl-Project/MorphL-Tracking-Settings/tree/master/google-analytics) for details on creating API credentials).
- Retrieve your **View ID** from the Google Analytics console.
- Modify the script to add your view id, start date and end date.
- From R Studio, select "**Session > Set Working Directory > To Source File Location**" from the main menu.

After completing the steps above, you should be good to go! The retrieved data will be written to a csv file in the **data** folder.

The script also supports batched requests, in case there are more than 10000 entries returned by a single request.

This script is based on the [googleAuthR](http://code.markedmondson.me/googleAuthR/) and [googleAnalyticsR](http://code.markedmondson.me/googleAnalyticsR/) libraries, if you to modify it please see their documentation for more details.

