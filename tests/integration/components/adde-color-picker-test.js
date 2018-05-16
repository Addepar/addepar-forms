import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import AddeColorPickerPage from '@addepar/forms/test-support/pages/adde-color-picker';

const ColorPickerHelper = AddeColorPickerPage.scope('[data-test-color-picker]');

moduleForComponent('adde-color-picker', 'Integration | Component | adde color picker', {
  integration: true,
});

test('Color picker defaults are correct', async function(assert) {
  assert.expect(3);

  this.render(hbs`
    {{adde-color-picker
      data-test-color-picker=true}}
  `);

  let colorPicker = ColorPickerHelper.create();

  assert.ok(
    colorPicker.target.cell.isColor('#000000'),
    'Color picker button defaults to black when no color is provided.'
  );

  assert.ok(
    !colorPicker.dropdown.content.removeColorButton.isPresent,
    'Remove color button is not present'
  );

  assert.ok(
    !colorPicker.dropdown.content.transparentOption.isPresent,
    'Transparent color option is not present'
  );
});

test('Color picker correctly reflects selected color', async function(assert) {
  assert.expect(10);

  let color = '#ffffff';
  // TODO: why doesn't color var work in here
  this.render(hbs`
    {{adde-color-picker
      selectedColor="#ffffff"
      data-test-color-picker=true}}
  `);

  let colorPicker = ColorPickerHelper.create();

  assert.ok(
    colorPicker.target.cell.isColor(color),
    'Color picker button correctly reflects provided color.'
  );

  await colorPicker.dropdown.open();

  // This specifically relies on the given test color being in the grid
  assert.equal(
    colorPicker.dropdown.content.activeRadioValue,
    color,
    'Existing color in grid is selected'
  );

  assert.equal(
    colorPicker.dropdown.content.customColorButton.value,
    color,
    'Color is reflected in color preview button'
  );

  assert.ok(
    colorPicker.dropdown.content.customColorButton.isActive,
    'Color preview button is active'
  );

  assert.equal(
    colorPicker.dropdown.content.customColorInput.value,
    color,
    'Color is reflected in custom input'
  );

  let newCellColor = colorPicker.dropdown.content.cells.eq(5).color;

  await colorPicker.dropdown.content.cells.eq(5).click();

  assert.ok(
    colorPicker.target.cell.isColor(newCellColor),
    'Color picker button correctly reflects new selected color.'
  );

  await colorPicker.dropdown.open();

  assert.equal(
    colorPicker.dropdown.content.activeRadioValue,
    newCellColor,
    'New color in grid is selected'
  );

  assert.equal(
    colorPicker.dropdown.content.customColorButton.value,
    newCellColor,
    'New color is reflected in color preview button'
  );

  assert.ok(
    colorPicker.dropdown.content.customColorButton.isActive,
    'Color preview button is active'
  );

  assert.equal(
    colorPicker.dropdown.content.customColorInput.value,
    newCellColor,
    'New color is reflected in custom input'
  );
});

test('Color picker transparent mode works correctly', async function(assert) {
  assert.expect(6);

  this.render(hbs`
    {{adde-color-picker
      isTransparencyEnabled=true
      data-test-color-picker=true}}
  `);

  let colorPicker = ColorPickerHelper.create();

  await colorPicker.dropdown.open();

  assert.ok(
    colorPicker.dropdown.content.transparentOption.isPresent,
    'Transparent color option is present'
  );

  await colorPicker.dropdown.content.transparentOption.click();

  assert.ok(
    colorPicker.target.cell.isColor('transparent'),
    'Color picker button reflects transparent color.'
  );

  await colorPicker.dropdown.open();

  assert.equal(
    colorPicker.dropdown.content.customColorButton.value,
    'transparent',
    'Transparent color is reflected in color preview button'
  );

  assert.ok(
    colorPicker.dropdown.content.customColorButton.isActive,
    'Color preview button is active'
  );

  assert.equal(
    colorPicker.dropdown.content.customColorInput.value,
    'transparent',
    'Transparent color is reflected in custom input'
  );

  assert.ok(
    !colorPicker.dropdown.content.customColorInput.isInvalid,
    'Custom color input is valid when color is transparent in transparent mode'
  );
});

test('Color picker empty color mode works correctly', async function(assert) {
  assert.expect(8);

  this.render(hbs`
    {{adde-color-picker
      canRemoveColor=true
      data-test-color-picker=true}}
  `);

  let colorPicker = ColorPickerHelper.create();

  assert.ok(
    colorPicker.target.contains('+ Color'),
    'Color picker button has the no color text when no color is selected.'
  );

  await colorPicker.dropdown.open();

  assert.ok(
    colorPicker.dropdown.content.removeColorButton.isPresent,
    'Remove color button is present'
  );

  assert.equal(
    colorPicker.dropdown.content.customColorButton.value,
    '',
    'Empty color is reflected in color preview button'
  );

  assert.ok(
    colorPicker.dropdown.content.customColorButton.isActive,
    'Color preview button is active'
  );

  assert.equal(colorPicker.dropdown.content.customColorInput.value, '', 'Custom input is empty');

  assert.ok(
    !colorPicker.dropdown.content.customColorInput.isInvalid,
    'Custom color input is valid when color is blank in empty mode'
  );

  let newCellColor = colorPicker.dropdown.content.cells.eq(5).color;

  await colorPicker.dropdown.content.cells.eq(5).click();

  assert.ok(
    colorPicker.target.cell.isColor(newCellColor),
    'Color picker button correctly reflects new selected color.'
  );

  await colorPicker.dropdown.open();
  await colorPicker.dropdown.content.removeColorButton.click();

  assert.ok(
    colorPicker.target.contains('+ Color'),
    'Color picker button has the no color text after remove color button is clicked.'
  );
});

test('Color picker dropdown opens and closes appropriately', async function(assert) {
  assert.expect(5);

  this.render(hbs`
    {{adde-color-picker
      selectedColor="#bada55"
      canRemoveColor=true
      data-test-color-picker=true}}
  `);

  let colorPicker = ColorPickerHelper.create();

  await colorPicker.dropdown.open();

  assert.ok(
    colorPicker.dropdown.isOpen,
    'Color picker dropdown opened on color picker button click'
  );

  await colorPicker.dropdown.content.cells.eq(5).click();

  assert.ok(!colorPicker.dropdown.isOpen, 'Color picker dropdown closed on grid color selection');

  await colorPicker.dropdown.open();
  await colorPicker.dropdown.content.customColorButton.click();

  assert.ok(!colorPicker.dropdown.isOpen, 'Color picker dropdown closed on preview button click');

  await colorPicker.dropdown.open();

  assert.ok(
    colorPicker.dropdown.isOpen,
    'Color picker dropdown opened on color picker button click'
  );

  await colorPicker.dropdown.content.submitInputForm();

  assert.ok(!colorPicker.dropdown.isOpen, 'Color picker dropdown closed on custom input enter');
});

test('Color picker validation works', async function(assert) {
  assert.expect(10);

  this.render(hbs`
    {{adde-color-picker
      selectedColor="#bada55"
      data-test-color-picker=true}}
  `);

  let colorPicker = ColorPickerHelper.create();

  await colorPicker.dropdown.open();

  assert.ok(
    !colorPicker.dropdown.content.customColorInput.isInvalid,
    'Custom color input is valid when color is valid with 6 digits'
  );

  await colorPicker.dropdown.content.customColorInput.fillIn('foo');

  assert.ok(
    colorPicker.dropdown.content.customColorInput.isInvalid,
    'Custom color input is invalid when color has invalid chars'
  );

  assert.ok(
    !colorPicker.dropdown.content.customColorButton.isActive,
    'Color preview button is not active for invalid color'
  );

  await colorPicker.dropdown.content.customColorInput.fillIn('f888');

  assert.ok(
    colorPicker.dropdown.content.customColorInput.isInvalid,
    'Custom color input is invalid when color has correct chars but incorrect length'
  );

  await colorPicker.dropdown.content.customColorInput.fillIn('transparent');

  assert.ok(
    colorPicker.dropdown.content.customColorInput.isInvalid,
    'Custom color input is invalid when color is transparent in default mode'
  );

  await colorPicker.dropdown.content.customColorInput.fillIn('');

  assert.ok(
    colorPicker.dropdown.content.customColorInput.isInvalid,
    'Custom color input is invalid when color is blank in default mode'
  );

  await colorPicker.dropdown.content.submitInputForm();

  assert.ok(
    colorPicker.dropdown.isOpen,
    'Color picker dropdown did not close when pressing enter on invalid color'
  );

  await colorPicker.dropdown.content.customColorButton.click();

  assert.ok(
    colorPicker.dropdown.isOpen,
    'Color picker dropdown did not close when clicking preview button'
  );

  await colorPicker.dropdown.content.customColorInput.fillIn('f00');

  assert.ok(
    !colorPicker.dropdown.content.customColorInput.isInvalid,
    'Custom color input is valid when color is valid 3 digit code'
  );

  assert.equal(
    colorPicker.dropdown.content.customColorInput.value,
    '#f00',
    'Input automatically adds a hash if none is provided'
  );
});
