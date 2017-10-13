import Ember from 'ember';
import layout from '../templates/components/ice-input';

const { computed } = Ember;

export default Ember.Component.extend({
  layout,
  classNameBindings: ['label:ice-form-control'],
  label: null,
  helpText: null,
  inputClass: 'ice-input',

  /**
   * If true, this component will auto focus itself after insertion into the dom
   * @type {boolean}
  */
  shouldFocus: false,

  didInsertElement() {
    this._super(...arguments);

    if (this.get('shouldFocus')) {
      this.$("input").focus();
    }
  },

  change(e) {
    this.sendAction('onChange', e);
  },

  focusIn(e) {
    this.sendAction('onFocusIn', e);
  },

  //onBlur?
  focusOut(e) {
    this.sendAction('onFocusOut', e);
  },

  keyDown(e) {
    this.sendAction('onKeyDown', e);
  },

  keyPress(e) {
    // rn I assume we only cares about the case when enter is pressed
    if(e.keyCode === 13) {
      this.sendAction('onKeyPress', e);
    }
  },

  keyUp(e) {
    this.sendAction('onKeyUp', e);
  },
});
