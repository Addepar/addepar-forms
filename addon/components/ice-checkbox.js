import Component from '@ember/component';
// import computed from '@ember/object/computed';
import { guidFor } from '@ember/object/internals';

import layout from '../templates/components/ice-checkbox';

export default Component.extend({
  layout,
  tagName: '',
  value: null,
  checked: false,
  disabled: false,
  indeterminate: false,

  inputId: null,

  init() {
    this._super(...arguments);
    this.set('inputId', `ice-checkbox-${guidFor(this)}`);
  }
});
