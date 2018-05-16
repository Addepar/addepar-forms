import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import PageObject, { collection } from 'ember-classy-page-object';
import AddeColorPickerRadioCellPage from '@addepar/forms/test-support/pages/adde-color-picker-radio-cell';

const radioCellHelper = AddeColorPickerRadioCellPage.scope('[data-test-radio-cell]');

moduleForComponent('color-picker-radio-cell', 'Integration | Component | color picker radio cell', {
  integration: true,
});

test('Cell correctly reflects provided color', async function(assert) {
  assert.expect(2);

  this.render(hbs`
    {{color-picker-radio-cell
      color="#bada55"
      data-test-radio-cell=true}}
  `);

  let radioCell = radioCellHelper.create();

  assert.equal(radioCell.color, '#bada55', 'Radio color value is correct.');
  assert.ok(radioCell.cell.isColor('#bada55'), 'Cell color bg is correct.');
});

test('Cells correctly reflect current active color', async function(assert) {
  assert.expect(4);

  this.render(hbs`
    {{color-picker-radio-cell
      color="#c0ffee"
      selectedColor="#bada55"
      data-test-radio-cell=true}}
    {{color-picker-radio-cell
      color="#bada55"
      selectedColor="#bada55"
      data-test-radio-cell=true}}
  `);

  let page = PageObject.extend({
    cells: collection(radioCellHelper),
  }).create();

  assert.ok(
    page.cells.eq(1).radioChecked,
    'Radio with current selected color should be initially checked.'
  );
  assert.ok(!page.cells.eq(0).radioChecked, 'Other radio without current color is not checked.');

  await page.cells.eq(0).click();

  assert.ok(page.cells.eq(0).radioChecked, 'Selected radio should be checked.');
  assert.ok(
    !page.cells.eq(1).radioChecked,
    'Previously selected radio should no longer be checked'
  );
});

test('Cell correctly reflects empty color', async function(assert) {
  assert.expect(1);

  this.render(hbs`
    {{color-picker-radio-cell
      color=""
      data-test-radio-cell=true}}
  `);

  let radioCell = radioCellHelper.create();

  assert.ok(radioCell.cell.isEmpty, 'Radio with empty color should have empty color cell.');
});

test('Cell correctly reflects transparent color', async function(assert) {
  assert.expect(1);

  this.render(hbs`
    {{color-picker-radio-cell
      color="transparent"
      data-test-radio-cell=true}}
  `);

  let radioCell = radioCellHelper.create();

  assert.ok(
    radioCell.cell.isTransparent,
    'Radio with transparent color should have transparent color cell.'
  );
});
