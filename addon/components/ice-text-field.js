import Component from '@ember/component';
import layout from '../templates/components/ice-text-field';
import { guidFor } from '@ember/object/internals';

export default Component.extend({
  tagName: '',
  layout,
  inputId: null,

  init() {
    this._super(...arguments);
    this.set('inputId', `ice-checkbox-${guidFor(this)}`);
  }
});
