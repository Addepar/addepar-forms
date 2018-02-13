import Input from '../ice-input';
// import computed from '@ember/object/computed';

export default Input.extend({
  attributeBindings: ['type', 'checked', 'disabled', 'name'],
  type: 'radio',
  value: null,
  checked: false,
  disabled: false,
  name: null
});
