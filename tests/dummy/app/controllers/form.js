import Controller from '@ember/controller';

export default Controller.extend({
  // for demo purpose
  options: [
    {
      label: 'Radio value 0',
      value: 0
    },
    {
      label: 'Radio value 1',
      value: 1
    },
    {
      label: 'Radio value 2',
      value: 2
    },
    {
      label: 'Radio value 3',
      value: 3,
      disabled: true
    }
  ]
});
