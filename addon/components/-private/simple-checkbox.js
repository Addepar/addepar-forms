import Input from '../ice-input';
// import computed from '@ember/object/computed';

export default Input.extend({
  attributeBindings: ['type', 'checked', 'disabled', 'indeterminate'],
  type: 'checkbox',
  value: null,
  checked: false,
  disabled: false,
  indeterminate: false
});
