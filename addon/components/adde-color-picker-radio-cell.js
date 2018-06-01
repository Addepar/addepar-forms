import Component from '@ember/component';

import { action, computed } from '@ember-decorators/object';

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
   * Choosing a color should close the dropdown
   */
  @attribute('data-close') close = true;

  /**
   * Function from color picker component to set the selected color
   * @type {'function'}
   */
  @attribute selectColor = null;

  /**
   * Whether the current radio should be selected
   * @type('boolean')
   */
  @computed('selectedColor', 'color')
  @attribute('data-focus')
  get isSelected() {
    return this.get('selectedColor') === this.get('color');
  }

  /**
   * Assuming won't need this once we have our radio button component
   */
  @action
  sendChange() {
    this.sendAction('selectColor', this.get('color'));
  }
}
