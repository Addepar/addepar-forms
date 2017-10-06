import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('input');
  this.route('checkbox');
  this.route('radio');
  this.route('textarea');
});

export default Router;
