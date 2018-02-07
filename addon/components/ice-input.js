import Component from '@ember/component';
import computed from '@ember/object/computed';

export default Component.extend({
  tagName: 'input',
  attributeBindings: ['value', 'placeholder', 'disabled', 'readonly'],
  classNameBindings: ['inputClass', 'isError', 'isWarning', 'className'],
  className: 'ice-input',

  placeholder: null,
  value: null,
  disabled: null,
  readonly: null,

  /**
   * If true, this component will auto focus itself after insertion into the dom
   * @type {boolean}
  */
  shouldFocus: false,

  isWarning: false,
  isError: false,
  inputClass: null,
  inputSize: 'medium',

  didInsertElement() {
    this._super(...arguments);

    if (this.get('shouldFocus')) {
      this.$().focus();
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
  }
});
