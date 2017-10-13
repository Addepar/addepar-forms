import Ember from 'ember';
import layout from '../templates/components/ice-checkbox';

export default Ember.Component.extend({
  layout: layout,
  value: null,
  classNames: ['ice-checkbox'],

  actions: {
    sendChecked(checked, value) {
      this.sendAction('on-change', checked, value);
    }
  }
});