import Component from '@ember/component';

import { action } from '@ember-decorators/object';

import { attribute, classNames, tagName } from '@ember-decorators/component';

import { argument } from '@ember-decorators/argument';

import layout from '../templates/components/adde-color-picker-radio-cell';

@tagName('label')
@classNames('adde-color-picker-radio')
export default class ColorPickerRadioCellComponent extends Component {
  layout = layout;

  // ----- Arguments ------

  /**
   * Display color of the cell
   * @type('string')
   */
  @argument color = '';

  /**
   * Selected color of the dropdown,
   * aka color used to check whether this radio cell is active
   * @type('string')
   */
  @argument selectedColor = '';

  /**
   * Close dropdown function passed from main color picker component.
   * @type ('function')
   */
  @argument closeDropdown = null;

  /**
   * Function from color picker component to set the selected color
   * @type {'function'}
   */
  @argument selectColor = null;

  /**
   * Choosing a color should close the dropdown.
   * This only applies for click.
   */
  @attribute('data-close') close = true;

  /**
   * Capture keyup event so we can close the dropdown on enter.
   */
  keyUp(event) {
    let keyCode = event.key;
    if (keyCode === 'Enter') {
      this.closeDropdown();
    }
  }

  /**
   * Send the select color action up to the main color picker component.
   */
  @action
  sendChange() {
    this.sendAction('selectColor', this.get('color'));
  }
}
