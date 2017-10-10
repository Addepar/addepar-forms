// https://github.com/firefly-ui/ff-checkbox/blob/master/addon/components/ff-checkbox-base.js

import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'input',
  value: null,
  type: 'checkbox',
  name: null,

  attributeBindings: ['type', 'checked', 'disabled', 'indeterminate', 'value'],

  change() {
    const checked = this.element.checked;
    const indeterminate = this.element.indeterminate;
    const value = this.get('value');

    this.element.checked = this.get('checked');
    this.element.indeterminate = this.get('indeterminate');

    this.sendAction('on-change', checked, { value, indeterminate });
  },
});
