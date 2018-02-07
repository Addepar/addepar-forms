import Component from '@ember/component';

import layout from '../templates/components/ice-form';

export default Component.extend({
  tagName: 'form',
  layout,
  classNameBindings: ['className', 'isHorizontal', 'isVertical'],
  className: 'ice-form',
  isHorizontal: true,
  isVertical: false,
  formHeading: null
});
