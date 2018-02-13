import Component from '@ember/component';
// import computed from '@ember/object/computed';
import { guidFor } from '@ember/object/internals';

import layout from '../templates/components/ice-radio';

export default Component.extend({
  layout,
  tagName: 'span',
  classNames: ['ice-radio'],
  value: null,
  checked: false,
  disabled: false,
  name: null,

  inputId: null,

  init() {
    this._super(...arguments);
    this.set('inputId', `ice-radio-${guidFor(this)}`);
  }
});
