import PageObject, { attribute, hasClass } from 'ember-classy-page-object';

export default PageObject.extend({
  style: attribute('style'),
  isTransparent: hasClass('is-transparent'),
  isEmpty: hasClass('is-empty'),
  isColor(c) {
    return this.style === `background-color: ${c};`;
  },
});
