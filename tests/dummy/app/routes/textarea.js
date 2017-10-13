import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  actions: {
    eventHanlders(e) {
     console.log(e.type);
    }
  }
});
