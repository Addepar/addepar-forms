import Ember from 'ember';
import layout from '../templates/components/ice-radio';

export default Ember.Component.extend({
  layout: layout,
  value: null,
  classNames: ['ice-radio'],

  actions: {
    sendChange(value) {
      this.sendAction('on-change', value);
    }
  }
});
