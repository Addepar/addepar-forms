import Component from '@ember/component';
import { guidFor } from '@ember/object/internals';
import layout from '../templates/components/ice-form-element';

export default Component.extend({
  layout,
  classNames: ['ice-form-element'],
  legend: null,
  inputId: null,

  init() {
    this._super(...arguments);
    this.set('inputId', `ice-form-element-${guidFor(this)}`);
  }
});
