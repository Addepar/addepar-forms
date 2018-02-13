import Controller from '@ember/controller';

export default Controller.extend({
  // for demo purpose
  options: [
    {
      label: 'Display only the start date',
      value: 'start_date',
      helpText: 'Only the start date would show "Since 8/30/2012"'
    },
    {
      label: 'Display only the end date',
      value: 'end_date',
      helpText: 'Only the end date would show "As of 12/31/2013"'
    },
    {
      label: 'Display both dates',
      value: 'both_dates',
      helpText: 'Both would show "From 8/30/2012 to 12/31/2013"'
    }
  ]
});
