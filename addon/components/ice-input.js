import Ember from 'ember';

const { computed, guidFor, Component, TextField } = Ember;

export default TextField.extend({
  classNameBindings: ['inputClass', 'error:is-error', 'warning:is-warning', 'className'],
  className: '',
  inputSize: '',
  error: false,

  /**
   * If true, this component will auto focus itself after insertion into the dom
   * @type {boolean}
  */
  shouldFocus: false,

  warning: false,
  inputClass: computed('inputSize', function() {
    let cls = 'ice-input';
    const size = this.get('inputSize');

    if (size === 'small') {
      cls = `${cls}-sm`;
    }

    return cls;
  }),

  didReceiveAttrs() {
    this._super(...arguments);

    if(this.get('disabled')) {
      this.set('placeholder', '');
    }
  },

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
  },
});