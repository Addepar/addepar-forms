import Ember from 'ember';
import layout from '../templates/components/ice-input';

export default Ember.Component.extend({
  classNames: ['ice-input'],
  layout,
  label: null,
  helpText: null
});
