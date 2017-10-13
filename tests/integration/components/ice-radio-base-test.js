import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ice-radio-base', 'Integration | Component | ice radio base', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{ice-radio-base}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#ice-radio-base}}
      template block text
    {{/ice-radio-base}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
