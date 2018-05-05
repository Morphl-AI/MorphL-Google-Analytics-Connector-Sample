import { Router } from 'express';
import { google } from 'googleapis';
import _ from 'lodash';
import fs from 'fs';
import json2csv from 'json2csv';
import tableify from 'tableify';
import gapi from './api/';
import models from '../../models';

const router = Router();
const key = require('../../config/service-account-credentials.json');

/**
 * GET User data from Google Analytics Reporting API (v4) and save it to a SQL database.
 */
router.get('/', (req, res) => {
  const jwtClient = new google.auth.JWT(
    key.client_email,
    null,
    key.private_key,
    ['https://www.googleapis.com/auth/analytics'], // an array of auth scopes
    null,
  );

  jwtClient.authorize((authErr, tokens) => {
    if (authErr || !tokens || _.isNil(tokens.access_token)) {
      console.log(authErr);
      res.send('Error obtaining auth tokens');
      return;
    }
    // Make an authorized request to get analytics data
    const analyticsReporting = google.analyticsreporting({ version: 'v4', auth: jwtClient });

    // @todo Replace start and end date with actual values
    const startDate = 'YYYY-MM-DD';
    const endDate = 'YYYY-MM-DD';
    const result = {};
    const otherResult = [];
    const ids = {};
    gapi.clientId(analyticsReporting, key.view_id, startDate, endDate)
      .then((usersIds) => {
        models.ClientId.bulkCreate(usersIds.map(id => ({ 'ga:dimension1': id })));
        ids.usersIds = usersIds;
        _.each(usersIds, (user) => {
          result[user] = { sessions: {}, devices: {} };
        });
        return gapi.user(analyticsReporting, key.view_id, startDate, endDate, ids.usersIds);
      })
      .then((userData) => {
        models.User.bulkCreate(userData);
        _.each(userData, (user) => {
          Object.assign(result[user['ga:dimension1']], user);
        });
        return gapi.platformDevice(analyticsReporting, key.view_id, startDate, endDate, ids.usersIds);
      })
      .then((devices) => {
        models.PlatformDevice.bulkCreate(devices);
        _.each(devices, (device) => {
          result[device['ga:dimension1']].devices = device;
        });
        return gapi.system(analyticsReporting, key.view_id, startDate, endDate, ids.usersIds);
      })
      .then((systems) => {
        models.System.bulkCreate(systems);
        _.each(systems, (system) => {
          result[system['ga:dimension1']].systems = system;
        });
        return gapi.session(analyticsReporting, key.view_id, startDate, endDate, ids.usersIds);
      })
      .then((sessionsData) => {
        models.Session.bulkCreate(sessionsData);
        const sessionsIds = sessionsData.map((session) => {
          result[session['ga:dimension1']].sessions[session['ga:dimension2']] = JSON.parse(JSON.stringify(session));
          return session['ga:dimension2'];
        });
        ids.sessionsIds = sessionsIds;
        return gapi.goalConversions(analyticsReporting, key.view_id, startDate, endDate, sessionsIds);
      })
      .then((conversionData) => {
        models.GoalConversions.bulkCreate(conversionData);
        _.each(conversionData, (conversion) => {
          result[conversion['ga:dimension1']].sessions[conversion['ga:dimension2']].goals = conversion;
        });
        return gapi.eventTracking(analyticsReporting, key.view_id, startDate, endDate, ids.sessionsIds);
      })
      .then((eventTrackingData) => {
        models.EventTracking.bulkCreate(eventTrackingData);
        _.each(eventTrackingData, (event) => {
          if (result[event['ga:dimension1']].sessions[event['ga:dimension2']].events === undefined) {
            result[event['ga:dimension1']].sessions[event['ga:dimension2']].events = [];
          }
          result[event['ga:dimension1']].sessions[event['ga:dimension2']].events.push(event);
        });
        return gapi.pageTracking(analyticsReporting, key.view_id, startDate, endDate, ids.sessionsIds);
      })
      .then((pageTrackingData) => {
        _.each(pageTrackingData[0], (value) => {
          if (result[value['ga:dimension1']].sessions[value['ga:dimension2']].pageViews === undefined) {
            result[value['ga:dimension1']].sessions[value['ga:dimension2']].pageViews = {};
          }
          if (result[value['ga:dimension1']].sessions[value['ga:dimension2']].pageViews[value['ga:pagePath']] === undefined) {
            result[value['ga:dimension1']].sessions[value['ga:dimension2']].pageViews[value['ga:pagePath']] = {};
          }
          otherResult.push(value);
          result[value['ga:dimension1']].sessions[value['ga:dimension2']].pageViews[value['ga:pagePath']][value['ga:dimension3']] = value;
        });
        _.each(pageTrackingData[1], (value, index) => {
          Object.assign(pageTrackingData[0][index], pageTrackingData[1][index]);
          Object.assign(result[value['ga:dimension1']].sessions[value['ga:dimension2']].pageViews[value['ga:pagePath']][value['ga:dimension3']], value);
        });
        models.PageTracking.bulkCreate(pageTrackingData[0]);
        return gapi.trafficSources(analyticsReporting, key.view_id, startDate, endDate, ids.sessionsIds);
      })
      .then((trafficSources) => {
        models.TrafficSources.bulkCreate(trafficSources);
        _.each(trafficSources, (source) => {
          if (result[source['ga:dimension1']].sessions[source['ga:dimension2']].trafficSources === undefined) {
            result[source['ga:dimension1']].sessions[source['ga:dimension2']].trafficSources = {};
          }
          if (result[source['ga:dimension1']].sessions[source['ga:dimension2']].trafficSources[source['ga:source']] === undefined) {
            result[source['ga:dimension1']].sessions[source['ga:dimension2']].trafficSources[source['ga:source']] = [];
          }
          result[source['ga:dimension1']].sessions[source['ga:dimension2']].trafficSources[source['ga:source']].push(source);
        });
        return gapi.geoContent(analyticsReporting, key.view_id, startDate, endDate, ids.sessionsIds);
      })
      .then((geoData) => {
        models.GeoContent.bulkCreate(geoData);
        _.each(geoData, (geoInforamtion) => {
          result[geoInforamtion['ga:dimension1']].sessions[geoInforamtion['ga:dimension2']].geoContent = geoInforamtion;
        });
        return gapi.time(analyticsReporting, key.view_id, startDate, endDate, ids.sessionsIds);
      })
      .then((timeData) => {
        models.Time.bulkCreate(timeData);
        _.each(timeData, (time) => {
          Object.assign(result[time['ga:dimension1']].sessions[time['ga:dimension2']], time);
        });
        return new Promise(resolve => resolve(result));
      })
      .then((data) => {
        res.send(tableify(data));
      })
      .catch((err) => {
        console.log(err);
        res.send('There was an error');
      });
  });
});

const uglyQuery = 'SELECT * FROM pageTrackings ' +
  'LEFT JOIN `sessions` ON `sessions`.`ga:dimension2` = `pageTrackings`.`ga:dimension2` ' +
  'LEFT JOIN `clientIds` ON `clientIds`.`ga:dimension1` = `pageTrackings`.`ga:dimension1` ' +
  'LEFT JOIN `geoContents` ON `geoContents`.`ga:dimension1` = `pageTrackings`.`ga:dimension1` ' +
  'LEFT JOIN `goalConversions` ON `goalConversions`.`ga:dimension2` = `pageTrackings`.`ga:dimension2` ' +
  'LEFT JOIN `platformDevices` ON `platformDevices`.`ga:dimension1` = `pageTrackings`.`ga:dimension1` ' +
  'LEFT JOIN `systems` ON `systems`.`ga:dimension1` = `pageTrackings`.`ga:dimension1` ' +
  'LEFT JOIN `times` ON `times`.`ga:dimension2` = `pageTrackings`.`ga:dimension2` ' +
  'LEFT JOIN `trafficSources` ON `trafficSources`.`ga:dimension2` = `sessions`.`ga:dimension2` ' +
  'LEFT JOIN `users` ON `users`.`ga:dimension1` = `pageTrackings`.`ga:dimension1`';

/**
 * Create CSV report from the data that was saved in the database.
 */
router.get('/sample', async (req, res) => {
  models.sequelize.query(uglyQuery, { type: models.sequelize.QueryTypes.SELECT }).then((data) => {
    fs.writeFileSync('test-output.csv', json2csv.parse(data));
    res.send('');
  });
});

export default router;
