import PageObject, { clickable, property, value } from 'ember-classy-page-object';

import AddeColorPickerCellPage from '@addepar/forms/test-support/pages/adde-color-picker-cell';

export default PageObject.extend({
  click: clickable(),
  radioChecked: property('checked', 'input[type="radio"]'),
  cell: AddeColorPickerCellPage.extend('[data-test-color-cell]'),
  color: value('input[type="radio"]'),
});
