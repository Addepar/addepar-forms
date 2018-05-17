import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import AddeColorPickerCellPage from '@addepar/forms/test-support/pages/adde-color-picker-cell';

const ColorPickerCellHelper = AddeColorPickerCellPage.scope('[data-test-color-cell]');

moduleForComponent('adde-color-picker-cell', 'Integration | Component | color picker cell', {
  integration: true,
});

test('Color cell renders with background color', function(assert) {
  assert.expect(1);

  this.render(hbs`{{adde-color-picker-cell color="#000000" data-test-color-cell=true}}`);

  let cell = ColorPickerCellHelper.create();

  assert.ok(cell.isColor('#000000'), 'Background is cell color');
});

test('Color cell correctly identifies as transparent', function(assert) {
  assert.expect(1);

  this.render(hbs`{{adde-color-picker-cell color="transparent" data-test-color-cell=true}}`);

  let cell = ColorPickerCellHelper.create();

  assert.ok(cell.isTransparent, 'Cell identifies as transparent');
});

test('Color cell correctly identifies as empty', function(assert) {
  assert.expect(1);

  this.render(hbs`{{adde-color-picker-cell color="" data-test-color-cell=true}}`);

  let cell = ColorPickerCellHelper.create();

  assert.ok(cell.isEmpty, 'Cell identifies as empty');
});
