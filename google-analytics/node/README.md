## Google Analytics - NodeJS / JavaScript Connector

**WARNING** - This project is a proof-of-concept for interogating the Google Analytics API v4. We don't recommend using it in production, please take a look at the R or Python connectors for more advanced use cases.

This project calls [Google Analytics API v4](https://developers.google.com/analytics/devguides/reporting/core/v4/) in order to retrieve data based on the **User Explorer** report (see your Google Analytics console for a peek at this report).

To run this project, you'll need to:

- [**Set up custom clients ids**](https://github.com/Morphl-Project/MorphL-Tracking-Settings), so the Google API can retrieve data at the user level.
- Create **service account credentials** and place them in the **app/config/service-account-credentials.json** file (see [Step 2](https://github.com/Morphl-Project/MorphL-Tracking-Settings/tree/master/google-analytics) for details on creating API credentials).
- Retrieve your **View ID** from the Google Analytics console.
- Modify the **service-account-credentials.json** file to add your view id with the **view_id** key.
- Modify the **routes/ga/users.js** file to add your start and end date.
- Create an **.env** file with your SQL database credentials. See **.env.example** to check the environment variables names.
- Run **npm install** to install the required packages.
- Run **npm start** to start the ExpressJS server.
- In the browser, navigate to **localhost:{your_port_number}/users**. The data will be saved in the database.
- In the browser, navigate to **localhost:{your_port_number}/users/sample**. This route will retrieve the data from the database and generate a report in a **test-output.csv** file.

**WARNING** - This project does not support batched requests, in case there are more than 10000 entries returned by a single request only the first 10000 will be retrieved.

