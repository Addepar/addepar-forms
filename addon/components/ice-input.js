import Ember from 'ember';
import layout from '../templates/components/ice-input';

export default Ember.Component.extend({
  classNames: ['ice-input'],
  layout,
  label: null,
  helpText: null,

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
});
