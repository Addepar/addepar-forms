import Component from '@ember/component';
import { htmlSafe } from '@ember/string';

import { computed } from '@ember-decorators/object';

import { attribute, className, classNames, tagName } from '@ember-decorators/component';
import { argument } from '@ember-decorators/argument';

import layout from '../templates/components/adde-color-picker-cell';

@tagName('span')
@classNames('color-cell')
export default class ColorPickerCellComponent extends Component {
  layout = layout;

  // ----- Arguments ------

  /**
   * Display color of the cell
   * @type('string')
   */
  @argument color = '';

  // ----- Private Variables -----

  /**
   * Forms the background color CSS
   * @type('string')
   */
  @attribute('style')
  @computed('color')
  get _style() {
    return htmlSafe(`background-color: ${this.get('color')};`);
  }

  /**
   * Whether the cell is transparent
   * @type('boolean')
   */
  @className('is-transparent')
  @computed('color')
  get _isTransparent() {
    return this.get('color').toLowerCase() === 'transparent';
  }

  /**
   * Whether the cell is empty
   * @type('boolean')
   */
  @className('is-empty')
  @computed('color')
  get _isEmpty() {
    return this.get('color') === '';
  }
}
