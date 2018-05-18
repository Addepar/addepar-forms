import Component from '@ember/component';
import { A } from '@ember/array';

import { action, computed } from '@ember-decorators/object';
import { classNames, className } from '@ember-decorators/component';
import { argument } from '@ember-decorators/argument';

import layout from '../templates/components/adde-color-picker';

@classNames('adde-color-picker')
export default class AddeColorPickerComponent extends Component {
  layout = layout;

  // ----- Arguments ------

  /**
   * Current selected color
   * @type('string')
   */
  @argument selectedColor = '';

  /**
   * Whether the color picker should include a transparent option
   * False by default
   * TODO - future feature: Also derive transparency from provided colors,
   * so dev doesn't have to set the flag if they pass in a transparent color.
   * @type('boolean')
   */
  @argument isTransparencyEnabled = false;

  /**
   * Whether the color can be removed/cleared from wherever it is being applied
   * to the UI, and should have a remove button.
   * False by default
   * @type('boolean')
   */
  @argument canRemoveColor = false;

  /**
   * Used to determine the placement of the popover
   * Can choose between auto, top, right, bottom, left
   * Can also add -start or -end modifier
   * @type('string')
   */
  @argument placement = 'bottom-start';

  /**
   * Whether the color picker is disabled
   * @type('boolean')
   */
  @argument disabled = false;

  /**
   * Dropdown class
   * TODO: When needed, make into an argument and merge this with user optional class?
   * @type('string')
   */
  dropdownClass = 'adde-color-picker-dropdown';

  /**
   * Default color palette
   * Purposefully split the items by row to force
   * the colors to line up how the dev wants -
   * Rather than one long list and having to use CSS grid to define where it
   * wraps, or edit the dropdown width, etc.
   * @type(arrayOf(arrayOf('string')))
   */
  @argument
  colorPalette = A([
    A(['#ffffff', '#e9e9e9', '#d5d5d5', '#bdbdbd', '#929292', '#676767', '#3b3b3b', '#000000']),
    A(['#f9dddd', '#ffd8c7', '#ffeab7', '#d1ece1', '#adedff', '#a8aff3', '#ecccfc', '#e7ebf0']),
    A(['#ff9898', '#fc9d74', '#ffdd8d', '#78d9af', '#7cdffb', '#8992e8', '#d484fb', '#b9c3d1']),
    A(['#e15554', '#fe824c', '#fcd067', '#4ec192', '#00c0f2', '#5864dc', '#c751ff', '#8a9baf']),
    A(['#c92f2f', '#e25113', '#e0b140', '#2ea76e', '#0082a7', '#313fc5', '#ac1fee', '#5b738a']),
    A(['#9f1515', '#903300', '#bc8e1e', '#0f7746', '#005168', '#0b1891', '#7d01b7', '#2d4b63']),
  ]);

  // ----- Private Variables -----

  /**
   * Adjusted color palette
   * Switches out a color cell for transparent if its enabled.
   * @type(arrayOf(arrayOf('string')))
   */
  @computed('isTransparencyEnabled')
  get _colorPaletteAdjusted() {
    let colorPaletteAdjusted = this.get('colorPalette');
    if (this.get('isTransparencyEnabled')) {
      // Remove an unneeded color (design decision for now is 1st row, 3rd cell)
      // and add transparent option to the beginning.
      // TODO: This is ok for now, but not very customizable friendly.
      // If we ever want to derive transparency, this will need to be updated.
      colorPaletteAdjusted[0].splice(2, 1);
      colorPaletteAdjusted[0].unshift('transparent');
    }

    return colorPaletteAdjusted;
  }

  /**
   * Custom color entered by the optional custom color input
   * We track it separately since it has extra conditions
   * @type('string')
   */
  @computed('selectedColor')
  get _customColor() {
    // Custom color is initially selectedColor
    return this.get('selectedColor');
  }
  set _customColor(color) {
    // Auto format the custom input with hex
    return this._formatColor(color);
  }

  /**
   * Black is the same default color as the native browser color picker.
   * We need to use this whenever there is no specific selectedColor given.
   * TODO: future feature - allow dev to decide default color? Or use 1st cell by default?
   * @type('string')
   */
  _defaultColor = '#000000';

  /**
   * Whether the current selected color is empty/blank
   * @type('boolean')
   */
  @computed('selectedColor')
  get _isEmpty() {
    return this.get('selectedColor') === '';
  }

  /**
   * Class binding to indicate whether the selected color is invalid.
   * We theoretically shouldn't be able to set an invalid color with the picker,
   * so this is more of a safety check if the dev tries to pass in
   * an invalid color.
   * @type('boolean')
   */
  @className('is-invalid')
  @computed('selectedColor')
  get _isInvalid() {
    return !this._validateColor(this.get('selectedColor'));
  }

  /**
   * Whether the custom color is invalid
   * @type('boolean')
   */
  @computed('_customColor')
  get _isCustomColorInvalid() {
    return !this._validateColor(this.get('_customColor'));
  }

  /**
   * Tests whether the hex code is valid, 3 or 6 digits, with hex.
   * Has exceptions for when transparency or empty option are allowed.
   */
  _validateColor(color) {
    if (
      (color === 'transparent' && this.get('isTransparencyEnabled')) ||
      (color === '' && this.get('canRemoveColor'))
    ) {
      return true;
    } else {
      return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color);
    }
  }

  /**
   * Formats the inputted color to always have a hash so its a legal hex color.
   * Ignores if transparent or empty.
   */
  _formatColor(color) {
    // We don't want to format anything if the user is
    // intentionally clearing the color or using transparent
    if (color === '' || color === 'transparent') {
      return color;
    }
    // Add hash if not there while base color is valid
    let formattedColor = color.trim();
    if (
      /(^[0-9A-F]{6}$)|(^[0-9A-F]{3}$)/i.test(formattedColor) &&
      formattedColor.charAt(0) !== '#'
    ) {
      formattedColor = `#${formattedColor}`;
    }
    return formattedColor;
  }

  constructor() {
    super();

    // Prevents picker from starting out in an error state due to being empty
    // TODO: should we still trigger userSelected?
    if (this.get('_isEmpty') && !this.get('canRemoveColor')) {
      this.set('selectedColor', this.get('_defaultColor'));
    }
  }

  // ---------- Actions ----------

  // @action
  // userSelected(selection) {
  //   console.log(`user selected: ${selection}`);
  //   this.sendAction('userSelected', '#f00');
  // }

  @action
  selectColor(color) {
    this.set('selectedColor', color);
    // this.userSelected(color);
    // console.log(`user selected: ${color}`);
    this.sendAction('userSelected', '#f00');
  }

  /**
   * Action for custom color input/button.
   */
  @action
  setCustomColor() {
    // Set selected color if valid.
    let color = this.get('_customColor');
    if (this._validateColor(color)) {
      this.selectColor(color);
    }
  }

  /**
   * Clear the color.
   * close - close action yielded from dropdown.
   */
  @action
  removeColor(close) {
    // Set the selected color to empty
    this.selectColor('');
    // Clear the custom input
    this.set('_customColor', '');
    // Close dropdown
    close();
  }

  /**
   * Close the dropdown on enter, but validate first.
   * Used for custom input enter event. We don't want it to close on enter
   * if the input is invalid bc it sends the user a false signal that it
   * submitted anyway.
   * @param {function} close - close action from dropdown.
   */
  @action
  closeDropdown(close) {
    if (!this.get('_isCustomColorInvalid')) {
      close();
    }
  }

  /**
   * Do some custom color input setup whenever the dropdown is opened.
   * If the previously typed (last time picker was opened/closed) custom color
   * was not valid, by design it would not have updated the selectedColor.
   * If you close and reopen the dropdown, it will still be in invalid state,
   * so here we revert the input to the current selectedColor.
   *
   * This is called whenever the color picker trigger is clicked,
   * so it sets up the state before the dropdown is rendered.
   * TODO Ember 1.13: We can do this better if we can harness the close action
   * from dropdown instead.
   */
  @action
  cleanDropdownState() {
    this.set('_customColor', this.get('selectedColor'));
  }
}
