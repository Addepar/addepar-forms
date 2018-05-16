import PageObject, {
  clickable,
  collection,
  fillable,
  hasClass,
  triggerable,
  value,
} from 'ember-classy-page-object';

import AddeColorPickerCellPage from '@addepar/forms/test-support/pages/adde-color-picker-cell';
import AddeColorPickerRadioCellPage from '@addepar/forms/test-support/pages/adde-color-picker-radio-cell';
import AddeDropdownPage from '@addepar/pop-menu/test-support/pages/adde-dropdown';

export default PageObject.extend({
  target: {
    scope: '[data-popover-trigger]',
    cell: AddeColorPickerCellPage.scope('[data-test-color-cell]'),
  },
  dropdown: AddeDropdownPage.extend({
    scope: '[data-test-color-picker-dropdown]',
    content: {
      cells: collection(AddeColorPickerRadioCellPage.scope('[data-test-radio-cell]')),
      activeRadioValue: value('input:checked'),
      transparentOption: {
        scope: '[data-test-color-cell].is-transparent',
        click: clickable(),
      },
      customColorButton: {
        scope: '[data-test-custom-color-button]',
        value: value(),
        isActive: hasClass('is-active', '[data-test-color-cell]'),
        click: clickable(),
      },
      customColorInput: {
        scope: '[data-test-custom-color-input]',
        value: value(),
        isInvalid: hasClass('is-invalid'),
        enter: triggerable('keyup', null, { eventProperties: { keyCode: 13 } }),
        fillIn: fillable(),
      },
      removeColorButton: {
        scope: '[data-test-remove-color]',
        click: clickable(),
      },
      // TODO: Ember 1.13, remove and use input enter instead
      submitInputForm: triggerable('submit', '[data-test-input-form]'),
    },
  }),
});
