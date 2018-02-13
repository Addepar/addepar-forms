import Component from '@ember/component';
import layout from '../templates/components/ice-radio-group';

export default Component.extend({
  layout,
  tagName: 'fieldset',
  classNames: ['ice-radio-group'],

  name: null,
  options: null
});
