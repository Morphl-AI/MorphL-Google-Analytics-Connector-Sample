import { Router } from 'express';
import models from '../models';

const router = Router();

/* GET home page. */
router.get('/', async (req, res) => {
  models.ClientId.sync({ force: true }).then(result => console.log(result));
  models.User.sync({ force: true }).then(result => console.log(result));
  models.PlatformDevice.sync({ force: true }).then(result => console.log(result));
  models.System.sync({ force: true }).then(result => console.log(result));
  models.Session.sync({ force: true }).then(result => console.log(result));
  models.GoalConversions.sync({ force: true }).then(result => console.log(result));
  models.EventTracking.sync({ force: true }).then(result => console.log(result));
  models.PageTracking.sync({ force: true }).then(result => console.log(result));
  models.TrafficSources.sync({ force: true }).then(result => console.log(result));
  models.GeoContent.sync({ force: true }).then(result => console.log(result));
  models.Time.sync({ force: true }).then(result => console.log(result));
  res.render('index', { title: 'API' });
});

export default router;
